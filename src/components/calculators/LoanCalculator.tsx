import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { EnhancedBarChart, EnhancedLineChart } from '@/components/ui/enhanced-chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, DollarSign, Calendar, TrendingDown, BarChart3, CreditCard } from 'lucide-react';

interface LoanData {
  principal: number;
  interestRate: number;
  loanTerm: number;
  extraPayment: number;
  loanType: string;
}

export function LoanCalculator() {
  const [data, setData] = useState<LoanData>({
    principal: 25000,
    interestRate: 7.5,
    loanTerm: 5,
    extraPayment: 0,
    loanType: 'personal'
  });

  const results = useMemo(() => {
    const monthlyRate = data.interestRate / 100 / 12;
    const totalPayments = data.loanTerm * 12;
    
    // Monthly payment calculation
    const monthlyPayment = data.principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                          (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
    const totalMonthlyPayment = monthlyPayment + data.extraPayment;
    const totalInterest = (monthlyPayment * totalPayments) - data.principal;
    
    // Calculate payoff time with extra payments
    let balance = data.principal;
    let months = 0;
    let totalInterestWithExtra = 0;
    
    while (balance > 0 && months < totalPayments * 2) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = Math.min(totalMonthlyPayment - interestPayment, balance);
      
      totalInterestWithExtra += interestPayment;
      balance -= principalPayment;
      months++;
      
      if (balance <= 0) break;
    }
    
    // Payment schedule
    balance = data.principal;
    const schedule = [];
    
    for (let month = 1; month <= Math.min(totalPayments, 60); month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;
      
      schedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance),
        cumulativeInterest: schedule.reduce((sum, item) => sum + item.interest, 0) + interestPayment
      });
    }

    return {
      monthlyPayment,
      totalMonthlyPayment,
      totalInterest,
      totalCost: monthlyPayment * totalPayments,
      payoffMonths: months,
      interestSaved: totalInterest - totalInterestWithExtra,
      schedule
    };
  }, [data]);

  const chartData = results.schedule.map(item => ({
    month: `Month ${item.month}`,
    Principal: item.principal,
    Interest: item.interest,
    'Remaining Balance': item.balance
  }));

  const loanTypes = {
    personal: { name: 'Personal Loan', description: 'Unsecured personal loan' },
    auto: { name: 'Auto Loan', description: 'Vehicle financing' },
    student: { name: 'Student Loan', description: 'Education financing' },
    business: { name: 'Business Loan', description: 'Commercial financing' }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-financial-success to-financial-success-light rounded-xl">
          <DollarSign className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Loan Calculator</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Calculate loan payments for personal loans, auto loans, and more
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-1">
          <Card className="financial-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Loan Details
              </CardTitle>
              <CardDescription>Enter your loan information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="loanType">Loan Type</Label>
                <Select value={data.loanType} onValueChange={(value) => setData(prev => ({ ...prev, loanType: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(loanTypes).map(([key, type]) => (
                      <SelectItem key={key} value={key}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="principal">Loan Amount</Label>
                <Input
                  id="principal"
                  type="number"
                  value={data.principal}
                  onChange={(e) => setData(prev => ({ ...prev, principal: Number(e.target.value) }))}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interestRate">Interest Rate (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  step="0.01"
                  value={data.interestRate}
                  onChange={(e) => setData(prev => ({ ...prev, interestRate: Number(e.target.value) }))}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="loanTerm">Loan Term (Years)</Label>
                <Select value={data.loanTerm.toString()} onValueChange={(value) => setData(prev => ({ ...prev, loanTerm: Number(value) }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 year</SelectItem>
                    <SelectItem value="2">2 years</SelectItem>
                    <SelectItem value="3">3 years</SelectItem>
                    <SelectItem value="4">4 years</SelectItem>
                    <SelectItem value="5">5 years</SelectItem>
                    <SelectItem value="7">7 years</SelectItem>
                    <SelectItem value="10">10 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="extraPayment">Extra Monthly Payment</Label>
                <Input
                  id="extraPayment"
                  type="number"
                  value={data.extraPayment}
                  onChange={(e) => setData(prev => ({ ...prev, extraPayment: Number(e.target.value) }))}
                  className="text-base"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Metrics */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="financial-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CreditCard className="h-4 w-4" />
                  Monthly Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  ${results.monthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </div>
                {data.extraPayment > 0 && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Total: ${results.totalMonthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="financial-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingDown className="h-4 w-4" />
                  Total Interest
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">
                  ${results.totalInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </div>
                {data.extraPayment > 0 && results.interestSaved > 0 && (
                  <p className="text-sm text-financial-success mt-1">
                    Save: ${results.interestSaved.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="financial-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-4 w-4" />
                  Payoff Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {Math.floor(results.payoffMonths / 12)}y {results.payoffMonths % 12}m
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {results.payoffMonths} months
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Payment Schedule Chart */}
          <Card className="financial-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Payment Breakdown Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EnhancedBarChart
                data={chartData}
                bars={[
                  { dataKey: 'Principal', name: 'Principal', color: 'hsl(var(--financial-success))' },
                  { dataKey: 'Interest', name: 'Interest', color: 'hsl(var(--financial-gold))' }
                ]}
                height={400}
              />
            </CardContent>
          </Card>

          {/* Balance Chart */}
          <Card className="financial-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5" />
                Remaining Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EnhancedLineChart
                data={chartData}
                lines={[
                  { dataKey: 'Remaining Balance', name: 'Remaining Balance', color: 'hsl(var(--financial-success))' }
                ]}
                height={300}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}