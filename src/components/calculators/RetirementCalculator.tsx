import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { EnhancedLineChart, EnhancedPieChart } from '@/components/ui/enhanced-chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Target, DollarSign, Calendar, TrendingUp, PieChart, Wallet } from 'lucide-react';

interface RetirementData {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  employerMatch: number;
  salaryGrowth: number;
  returnRate: number;
  inflationRate: number;
  retirementDuration: number;
}

export function RetirementCalculator() {
  const [data, setData] = useState<RetirementData>({
    currentAge: 30,
    retirementAge: 65,
    currentSavings: 50000,
    monthlyContribution: 1000,
    employerMatch: 50,
    salaryGrowth: 3,
    returnRate: 7,
    inflationRate: 2.5,
    retirementDuration: 25
  });

  const results = useMemo(() => {
    const yearsToRetirement = data.retirementAge - data.currentAge;
    const totalMonthlyContribution = data.monthlyContribution + (data.monthlyContribution * data.employerMatch / 100);
    const monthlyReturn = data.returnRate / 100 / 12;
    const annualSalaryGrowth = data.salaryGrowth / 100;
    const monthlyInflation = data.inflationRate / 100 / 12;
    
    // Future value calculation with growing contributions
    let totalSavings = data.currentSavings;
    let currentContribution = totalMonthlyContribution;
    const projections = [];
    
    for (let year = 1; year <= yearsToRetirement; year++) {
      const age = data.currentAge + year;
      
      // Compound existing savings
      totalSavings *= Math.pow(1 + data.returnRate / 100, 1);
      
      // Add contributions for the year with growth
      for (let month = 1; month <= 12; month++) {
        totalSavings = totalSavings * (1 + monthlyReturn) + currentContribution;
      }
      
      // Increase contribution based on salary growth
      if (year > 1) {
        currentContribution *= (1 + annualSalaryGrowth);
      }
      
      projections.push({
        age,
        year,
        totalSavings,
        yearlyContribution: currentContribution * 12,
        realValue: totalSavings / Math.pow(1 + data.inflationRate / 100, year)
      });
    }
    
    const finalAmount = totalSavings;
    const totalContributions = data.currentSavings + 
      projections.reduce((sum, p) => sum + p.yearlyContribution, 0);
    const totalGrowth = finalAmount - totalContributions;
    
    // Monthly retirement income calculation
    const monthlyWithdrawalRate = 0.04 / 12; // 4% rule
    const monthlyRetirementIncome = finalAmount * monthlyWithdrawalRate;
    const inflationAdjustedIncome = monthlyRetirementIncome / Math.pow(1 + data.inflationRate / 100, yearsToRetirement);
    
    return {
      finalAmount,
      totalContributions,
      totalGrowth,
      monthlyRetirementIncome,
      inflationAdjustedIncome,
      projections: projections.filter((_, index) => index % 5 === 4 || index === projections.length - 1)
    };
  }, [data]);

  const chartData = results.projections.map(item => ({
    age: `Age ${item.age}`,
    'Total Savings': item.totalSavings,
    'Real Value': item.realValue,
    'Contributions': data.currentSavings + 
      results.projections.slice(0, results.projections.indexOf(item) + 1)
        .reduce((sum, p) => sum + p.yearlyContribution, 0)
  }));

  const allocationData = [
    { name: 'Contributions', value: results.totalContributions, color: 'hsl(var(--financial-blue))' },
    { name: 'Investment Growth', value: results.totalGrowth, color: 'hsl(var(--financial-success))' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl">
          <Target className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Retirement Calculator</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Plan for retirement with comprehensive savings and withdrawal analysis
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
                Retirement Planning
              </CardTitle>
              <CardDescription>Enter your retirement details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="currentAge">Current Age</Label>
                  <Input
                    id="currentAge"
                    type="number"
                    value={data.currentAge}
                    onChange={(e) => setData(prev => ({ ...prev, currentAge: Number(e.target.value) }))}
                    className="text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retirementAge">Retirement Age</Label>
                  <Input
                    id="retirementAge"
                    type="number"
                    value={data.retirementAge}
                    onChange={(e) => setData(prev => ({ ...prev, retirementAge: Number(e.target.value) }))}
                    className="text-base"
                  />
                </div>
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
                <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
                <Input
                  id="monthlyContribution"
                  type="number"
                  value={data.monthlyContribution}
                  onChange={(e) => setData(prev => ({ ...prev, monthlyContribution: Number(e.target.value) }))}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employerMatch">Employer Match (%)</Label>
                <Input
                  id="employerMatch"
                  type="number"
                  step="0.1"
                  value={data.employerMatch}
                  onChange={(e) => setData(prev => ({ ...prev, employerMatch: Number(e.target.value) }))}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="returnRate">Expected Return (%)</Label>
                <Input
                  id="returnRate"
                  type="number"
                  step="0.1"
                  value={data.returnRate}
                  onChange={(e) => setData(prev => ({ ...prev, returnRate: Number(e.target.value) }))}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salaryGrowth">Salary Growth (%)</Label>
                <Input
                  id="salaryGrowth"
                  type="number"
                  step="0.1"
                  value={data.salaryGrowth}
                  onChange={(e) => setData(prev => ({ ...prev, salaryGrowth: Number(e.target.value) }))}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="inflationRate">Inflation Rate (%)</Label>
                <Input
                  id="inflationRate"
                  type="number"
                  step="0.1"
                  value={data.inflationRate}
                  onChange={(e) => setData(prev => ({ ...prev, inflationRate: Number(e.target.value) }))}
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
                  <Wallet className="h-4 w-4" />
                  Total at Retirement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  ${results.finalAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  In {data.retirementAge - data.currentAge} years
                </p>
              </CardContent>
            </Card>

            <Card className="financial-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <DollarSign className="h-4 w-4" />
                  Monthly Income
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-financial-success">
                  ${results.monthlyRetirementIncome.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Today's value: ${results.inflationAdjustedIncome.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </p>
              </CardContent>
            </Card>

            <Card className="financial-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-4 w-4" />
                  Investment Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-financial-gold">
                  ${results.totalGrowth.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Return on investment
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Savings Growth Chart */}
          <Card className="financial-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Retirement Savings Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EnhancedLineChart
                data={chartData}
                lines={[
                  { dataKey: 'Total Savings', name: 'Total Savings', color: 'hsl(var(--financial-blue))' },
                  { dataKey: 'Real Value', name: 'Real Value', color: 'hsl(var(--financial-gold))' }
                ]}
                height={400}
              />
            </CardContent>
          </Card>

          {/* Contribution vs Growth */}
          <Card className="financial-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Contributions vs Investment Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EnhancedPieChart
                data={allocationData}
                height={300}
                showLabels={true}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}