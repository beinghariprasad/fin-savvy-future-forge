import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { EnhancedPieChart, EnhancedBarChart } from '@/components/ui/enhanced-chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Home, DollarSign, Calendar, TrendingDown, PieChart } from 'lucide-react';

interface MortgageData {
  loanAmount: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  propertyTax: number;
  insurance: number;
  pmi: number;
}

export function MortgageCalculator() {
  const [data, setData] = useState<MortgageData>({
    loanAmount: 400000,
    downPayment: 80000,
    interestRate: 6.5,
    loanTerm: 30,
    propertyTax: 1.2,
    insurance: 1200,
    pmi: 0.5
  });

  const results = useMemo(() => {
    const principal = data.loanAmount - data.downPayment;
    const monthlyRate = data.interestRate / 100 / 12;
    const totalPayments = data.loanTerm * 12;
    
    // Monthly payment calculation
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                          (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
    // Additional monthly costs
    const monthlyPropertyTax = (data.loanAmount * data.propertyTax / 100) / 12;
    const monthlyInsurance = data.insurance / 12;
    const monthlyPMI = principal < data.loanAmount * 0.8 ? (principal * data.pmi / 100) / 12 : 0;
    
    const totalMonthlyPayment = monthlyPayment + monthlyPropertyTax + monthlyInsurance + monthlyPMI;
    const totalInterest = (monthlyPayment * totalPayments) - principal;
    
    // Amortization schedule
    let balance = principal;
    const schedule = [];
    
    for (let month = 1; month <= Math.min(totalPayments, 360); month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;
      
      if (month <= 12 || month % 12 === 0) {
        schedule.push({
          year: Math.ceil(month / 12),
          payment: monthlyPayment,
          principal: principalPayment,
          interest: interestPayment,
          balance: Math.max(0, balance),
          totalPaid: monthlyPayment * month
        });
      }
    }

    return {
      principal,
      monthlyPayment,
      totalMonthlyPayment,
      monthlyPropertyTax,
      monthlyInsurance,
      monthlyPMI,
      totalInterest,
      totalCost: monthlyPayment * totalPayments,
      schedule
    };
  }, [data]);

  const chartData = results.schedule.map(item => ({
    year: `Year ${item.year}`,
    Principal: item.principal,
    Interest: item.interest,
    'Remaining Balance': item.balance
  }));

  const pieData = [
    { name: 'Principal & Interest', value: results.monthlyPayment, color: 'hsl(var(--financial-blue))' },
    { name: 'Property Tax', value: results.monthlyPropertyTax, color: 'hsl(var(--financial-gold))' },
    { name: 'Insurance', value: results.monthlyInsurance, color: 'hsl(var(--financial-success))' },
    { name: 'PMI', value: results.monthlyPMI, color: 'hsl(var(--chart-4))' }
  ].filter(item => item.value > 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-financial-blue to-financial-blue-light rounded-xl">
          <Home className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Mortgage Calculator</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Calculate monthly payments, total interest, and amortization schedules for home loans
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
              <CardDescription>Enter your mortgage information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="homePrice">Home Price</Label>
                <Input
                  id="homePrice"
                  type="number"
                  value={data.loanAmount}
                  onChange={(e) => setData(prev => ({ ...prev, loanAmount: Number(e.target.value) }))}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="downPayment">Down Payment</Label>
                <Input
                  id="downPayment"
                  type="number"
                  value={data.downPayment}
                  onChange={(e) => setData(prev => ({ ...prev, downPayment: Number(e.target.value) }))}
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
                <Label htmlFor="loanTerm">Loan Term</Label>
                <Select value={data.loanTerm.toString()} onValueChange={(value) => setData(prev => ({ ...prev, loanTerm: Number(value) }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 years</SelectItem>
                    <SelectItem value="20">20 years</SelectItem>
                    <SelectItem value="25">25 years</SelectItem>
                    <SelectItem value="30">30 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertyTax">Property Tax Rate (%)</Label>
                <Input
                  id="propertyTax"
                  type="number"
                  step="0.01"
                  value={data.propertyTax}
                  onChange={(e) => setData(prev => ({ ...prev, propertyTax: Number(e.target.value) }))}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="insurance">Home Insurance (Annual)</Label>
                <Input
                  id="insurance"
                  type="number"
                  value={data.insurance}
                  onChange={(e) => setData(prev => ({ ...prev, insurance: Number(e.target.value) }))}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pmi">PMI Rate (%)</Label>
                <Input
                  id="pmi"
                  type="number"
                  step="0.01"
                  value={data.pmi}
                  onChange={(e) => setData(prev => ({ ...prev, pmi: Number(e.target.value) }))}
                  className="text-base"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Metrics */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="financial-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <DollarSign className="h-4 w-4" />
                  Monthly Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  ${results.totalMonthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Principal & Interest: ${results.monthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </p>
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
                <p className="text-sm text-muted-foreground mt-1">
                  Over {data.loanTerm} years
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Payment Breakdown Chart */}
          <Card className="financial-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Monthly Payment Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EnhancedPieChart
                data={pieData}
                height={300}
                showLabels={true}
              />
            </CardContent>
          </Card>

          {/* Amortization Chart */}
          <Card className="financial-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Payment Schedule Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EnhancedBarChart
                data={chartData}
                bars={[
                  { dataKey: 'Principal', name: 'Principal', color: 'hsl(var(--financial-blue))' },
                  { dataKey: 'Interest', name: 'Interest', color: 'hsl(var(--financial-gold))' }
                ]}
                height={400}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}