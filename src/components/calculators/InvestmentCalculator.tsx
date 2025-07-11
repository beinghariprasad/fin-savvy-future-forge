import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { EnhancedAreaChart, EnhancedBarChart } from '@/components/ui/enhanced-chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, PiggyBank, DollarSign, Calendar, TrendingUp, BarChart3, Target } from 'lucide-react';

interface InvestmentData {
  initialInvestment: number;
  monthlyContribution: number;
  timeHorizon: number;
  expectedReturn: number;
  riskLevel: string;
  inflationRate: number;
  taxRate: number;
}

export function InvestmentCalculator() {
  const [data, setData] = useState<InvestmentData>({
    initialInvestment: 10000,
    monthlyContribution: 500,
    timeHorizon: 20,
    expectedReturn: 8,
    riskLevel: 'moderate',
    inflationRate: 2.5,
    taxRate: 20
  });

  const results = useMemo(() => {
    const monthlyReturn = data.expectedReturn / 100 / 12;
    const monthlyInflation = data.inflationRate / 100 / 12;
    const totalMonths = data.timeHorizon * 12;
    
    // Future value with regular contributions
    const futureValue = data.initialInvestment * Math.pow(1 + monthlyReturn, totalMonths) +
      data.monthlyContribution * ((Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn);
    
    const totalContributions = data.initialInvestment + (data.monthlyContribution * totalMonths);
    const totalGains = futureValue - totalContributions;
    const taxOnGains = totalGains * (data.taxRate / 100);
    const afterTaxValue = futureValue - taxOnGains;
    
    // Real value (inflation adjusted)
    const realValue = afterTaxValue / Math.pow(1 + data.inflationRate / 100, data.timeHorizon);
    
    // Year by year projections
    const projections = [];
    let currentValue = data.initialInvestment;
    let totalContributed = data.initialInvestment;
    
    for (let year = 1; year <= data.timeHorizon; year++) {
      // Add monthly contributions and growth for the year
      for (let month = 1; month <= 12; month++) {
        currentValue = currentValue * (1 + monthlyReturn) + data.monthlyContribution;
        totalContributed += data.monthlyContribution;
      }
      
      const yearlyGains = currentValue - totalContributed;
      const realVal = currentValue / Math.pow(1 + data.inflationRate / 100, year);
      
      projections.push({
        year,
        totalValue: currentValue,
        contributions: totalContributed,
        gains: yearlyGains,
        realValue: realVal
      });
    }

    // Risk scenarios
    const scenarios = {
      conservative: data.expectedReturn - 2,
      moderate: data.expectedReturn,
      aggressive: data.expectedReturn + 2
    };

    const riskProjections = Object.entries(scenarios).map(([risk, returnRate]) => {
      const monthlyRet = returnRate / 100 / 12;
      const futVal = data.initialInvestment * Math.pow(1 + monthlyRet, totalMonths) +
        data.monthlyContribution * ((Math.pow(1 + monthlyRet, totalMonths) - 1) / monthlyRet);
      
      return {
        scenario: risk,
        finalValue: futVal,
        gains: futVal - totalContributions
      };
    });

    return {
      futureValue,
      afterTaxValue,
      realValue,
      totalContributions,
      totalGains,
      taxOnGains,
      projections,
      riskProjections
    };
  }, [data]);

  const chartData = results.projections.map(item => ({
    year: `Year ${item.year}`,
    'Total Value': item.totalValue,
    'Contributions': item.contributions,
    'Investment Gains': item.gains,
    'Real Value': item.realValue
  }));

  const riskData = results.riskProjections.map(item => ({
    scenario: item.scenario.charAt(0).toUpperCase() + item.scenario.slice(1),
    'Final Value': item.finalValue,
    'Gains': item.gains
  }));

  const riskLevels = {
    conservative: { name: 'Conservative', description: 'Lower risk, stable returns' },
    moderate: { name: 'Moderate', description: 'Balanced risk and return' },
    aggressive: { name: 'Aggressive', description: 'Higher risk, potential for higher returns' }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
          <PiggyBank className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Investment Calculator</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Analyze investment returns with different scenarios and timeframes
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
                Investment Details
              </CardTitle>
              <CardDescription>Configure your investment parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="initialInvestment">Initial Investment</Label>
                <Input
                  id="initialInvestment"
                  type="number"
                  value={data.initialInvestment}
                  onChange={(e) => setData(prev => ({ ...prev, initialInvestment: Number(e.target.value) }))}
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
                <Label htmlFor="timeHorizon">Time Horizon (Years)</Label>
                <Select value={data.timeHorizon.toString()} onValueChange={(value) => setData(prev => ({ ...prev, timeHorizon: Number(value) }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 years</SelectItem>
                    <SelectItem value="10">10 years</SelectItem>
                    <SelectItem value="15">15 years</SelectItem>
                    <SelectItem value="20">20 years</SelectItem>
                    <SelectItem value="25">25 years</SelectItem>
                    <SelectItem value="30">30 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
                <Input
                  id="expectedReturn"
                  type="number"
                  step="0.1"
                  value={data.expectedReturn}
                  onChange={(e) => setData(prev => ({ ...prev, expectedReturn: Number(e.target.value) }))}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="riskLevel">Risk Level</Label>
                <Select value={data.riskLevel} onValueChange={(value) => setData(prev => ({ ...prev, riskLevel: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(riskLevels).map(([key, level]) => (
                      <SelectItem key={key} value={key}>
                        {level.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

              <div className="space-y-2">
                <Label htmlFor="taxRate">Tax Rate on Gains (%)</Label>
                <Input
                  id="taxRate"
                  type="number"
                  step="0.1"
                  value={data.taxRate}
                  onChange={(e) => setData(prev => ({ ...prev, taxRate: Number(e.target.value) }))}
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
                  <Target className="h-4 w-4" />
                  Final Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  ${results.afterTaxValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  After taxes
                </p>
              </CardContent>
            </Card>

            <Card className="financial-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-4 w-4" />
                  Total Gains
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-financial-success">
                  ${results.totalGains.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Before taxes
                </p>
              </CardContent>
            </Card>

            <Card className="financial-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <DollarSign className="h-4 w-4" />
                  Real Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-financial-gold">
                  ${results.realValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Inflation adjusted
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Investment Growth Chart */}
          <Card className="financial-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Investment Growth Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EnhancedAreaChart
                data={chartData}
                areas={[
                  { dataKey: 'Total Value', name: 'Total Value', color: 'hsl(var(--financial-blue))' },
                  { dataKey: 'Contributions', name: 'Contributions', color: 'hsl(var(--financial-success))' },
                  { dataKey: 'Investment Gains', name: 'Investment Gains', color: 'hsl(var(--financial-gold))' }
                ]}
                height={400}
              />
            </CardContent>
          </Card>

          {/* Risk Scenario Analysis */}
          <Card className="financial-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Risk Scenario Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EnhancedBarChart
                data={riskData}
                bars={[
                  { dataKey: 'Final Value', name: 'Final Value', color: 'hsl(var(--financial-blue))' }
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