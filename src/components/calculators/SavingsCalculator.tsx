import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { EnhancedAreaChart, EnhancedLineChart } from '@/components/ui/enhanced-chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Target, DollarSign, Calendar, TrendingUp, BarChart3, Wallet } from 'lucide-react';

interface SavingsData {
  savingsGoal: number;
  currentSavings: number;
  monthlySavings: number;
  interestRate: number;
  timeFrame: number;
  goalType: string;
}

export function SavingsCalculator() {
  const [data, setData] = useState<SavingsData>({
    savingsGoal: 50000,
    currentSavings: 5000,
    monthlySavings: 500,
    interestRate: 4.5,
    timeFrame: 8,
    goalType: 'emergency'
  });

  const results = useMemo(() => {
    const monthlyRate = data.interestRate / 100 / 12;
    const totalMonths = data.timeFrame * 12;
    
    // Future value with compound interest and regular contributions
    const futureValue = data.currentSavings * Math.pow(1 + monthlyRate, totalMonths) +
      data.monthlySavings * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    
    const totalContributions = data.currentSavings + (data.monthlySavings * totalMonths);
    const totalInterest = futureValue - totalContributions;
    
    // Calculate what monthly savings is needed to reach goal
    const remainingGoal = Math.max(0, data.savingsGoal - data.currentSavings);
    const requiredMonthlyForGoal = remainingGoal / 
      ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    
    // Timeline to reach goal with current savings rate
    const goalDiff = data.savingsGoal - data.currentSavings;
    let monthsToGoal = 0;
    
    if (data.monthlySavings > 0 && goalDiff > 0) {
      // Using formula to solve for time when compound interest is involved
      const pv = data.currentSavings;
      const pmt = data.monthlySavings;
      const fv = data.savingsGoal;
      
      if (monthlyRate > 0) {
        // Complex formula for time calculation with compound interest
        monthsToGoal = Math.log((fv * monthlyRate + pmt) / (pv * monthlyRate + pmt)) / 
                      Math.log(1 + monthlyRate);
      } else {
        // Simple calculation when no interest
        monthsToGoal = goalDiff / pmt;
      }
    }
    
    // Monthly projections
    const projections = [];
    let currentBalance = data.currentSavings;
    
    for (let month = 1; month <= Math.min(totalMonths, 120); month++) {
      currentBalance = currentBalance * (1 + monthlyRate) + data.monthlySavings;
      
      if (month % 6 === 0 || month <= 12) {
        projections.push({
          month,
          balance: currentBalance,
          contributions: data.currentSavings + (data.monthlySavings * month),
          interest: currentBalance - (data.currentSavings + (data.monthlySavings * month)),
          progressToGoal: Math.min(100, (currentBalance / data.savingsGoal) * 100)
        });
      }
    }

    return {
      futureValue,
      totalContributions,
      totalInterest,
      requiredMonthlyForGoal,
      monthsToGoal: Math.max(0, monthsToGoal),
      shortfall: Math.max(0, data.savingsGoal - futureValue),
      surplus: Math.max(0, futureValue - data.savingsGoal),
      projections
    };
  }, [data]);

  const chartData = results.projections.map(item => ({
    month: `Month ${item.month}`,
    'Total Savings': item.balance,
    'Contributions': item.contributions,
    'Interest Earned': item.interest,
    'Goal Progress': item.progressToGoal
  }));

  const goalTypes = {
    emergency: { name: 'Emergency Fund', description: '3-6 months of expenses' },
    vacation: { name: 'Vacation', description: 'Travel and leisure' },
    car: { name: 'Car Purchase', description: 'Vehicle down payment' },
    home: { name: 'Home Down Payment', description: 'Real estate purchase' },
    education: { name: 'Education', description: 'Tuition and fees' },
    other: { name: 'Other Goal', description: 'Custom savings target' }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl">
          <Calculator className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Savings Goal Calculator</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Calculate how much to save monthly to reach your financial goals
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-1">
          <Card className="financial-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Savings Goal
              </CardTitle>
              <CardDescription>Set your savings target and timeline</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goalType">Goal Type</Label>
                <Select value={data.goalType} onValueChange={(value) => setData(prev => ({ ...prev, goalType: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(goalTypes).map(([key, goal]) => (
                      <SelectItem key={key} value={key}>
                        {goal.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="savingsGoal">Savings Goal</Label>
                <Input
                  id="savingsGoal"
                  type="number"
                  value={data.savingsGoal}
                  onChange={(e) => setData(prev => ({ ...prev, savingsGoal: Number(e.target.value) }))}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentSavings">Current Savings</Label>
                <Input
                  id="currentSavings"
                  type="number"
                  value={data.currentSavings}
                  onChange={(e) => setData(prev => ({ ...prev, currentSavings: Number(e.target.value) }))}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlySavings">Monthly Savings</Label>
                <Input
                  id="monthlySavings"
                  type="number"
                  value={data.monthlySavings}
                  onChange={(e) => setData(prev => ({ ...prev, monthlySavings: Number(e.target.value) }))}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interestRate">Interest Rate (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  step="0.1"
                  value={data.interestRate}
                  onChange={(e) => setData(prev => ({ ...prev, interestRate: Number(e.target.value) }))}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeFrame">Time Frame (Years)</Label>
                <Select value={data.timeFrame.toString()} onValueChange={(value) => setData(prev => ({ ...prev, timeFrame: Number(value) }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 year</SelectItem>
                    <SelectItem value="2">2 years</SelectItem>
                    <SelectItem value="3">3 years</SelectItem>
                    <SelectItem value="5">5 years</SelectItem>
                    <SelectItem value="8">8 years</SelectItem>
                    <SelectItem value="10">10 years</SelectItem>
                  </SelectContent>
                </Select>
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
                  <Calendar className="h-4 w-4" />
                  Time to Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {Math.floor(results.monthsToGoal / 12)}y {Math.round(results.monthsToGoal % 12)}m
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {Math.round(results.monthsToGoal)} months
                </p>
              </CardContent>
            </Card>

            <Card className="financial-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <DollarSign className="h-4 w-4" />
                  Required Monthly
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-financial-success">
                  ${results.requiredMonthlyForGoal.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  To reach goal in {data.timeFrame} years
                </p>
              </CardContent>
            </Card>

            <Card className="financial-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Wallet className="h-4 w-4" />
                  Final Amount
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  ${results.futureValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </div>
                {results.surplus > 0 ? (
                  <p className="text-sm text-financial-success mt-1">
                    ${results.surplus.toLocaleString('en-US', { maximumFractionDigits: 0 })} surplus
                  </p>
                ) : results.shortfall > 0 ? (
                  <p className="text-sm text-destructive mt-1">
                    ${results.shortfall.toLocaleString('en-US', { maximumFractionDigits: 0 })} shortfall
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground mt-1">Meets goal exactly</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Savings Progress Chart */}
          <Card className="financial-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Savings Growth Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EnhancedAreaChart
                data={chartData}
                areas={[
                  { dataKey: 'Total Savings', name: 'Total Savings', color: 'hsl(var(--financial-blue))' },
                  { dataKey: 'Contributions', name: 'Contributions', color: 'hsl(var(--financial-success))' },
                  { dataKey: 'Interest Earned', name: 'Interest Earned', color: 'hsl(var(--financial-gold))' }
                ]}
                height={400}
              />
            </CardContent>
          </Card>

          {/* Goal Progress */}
          <Card className="financial-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Goal Achievement Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EnhancedLineChart
                data={chartData}
                lines={[
                  { dataKey: 'Goal Progress', name: 'Goal Progress', color: 'hsl(var(--financial-success))' }
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