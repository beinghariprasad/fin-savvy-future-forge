import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Calculator, TrendingUp, DollarSign, Calendar, Percent } from 'lucide-react';
import { InContentAd } from '@/components/ads/AdSenseUnit';

interface CalculationResult {
  totalAmount: number;
  totalContributions: number;
  totalInterest: number;
  yearlyData: Array<{
    year: number;
    principal: number;
    interest: number;
    total: number;
  }>;
}

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
];

const compoundingFrequencies = [
  { value: 1, label: 'Annually' },
  { value: 2, label: 'Semi-annually' },
  { value: 4, label: 'Quarterly' },
  { value: 12, label: 'Monthly' },
  { value: 365, label: 'Daily' },
];

const contributionFrequencies = [
  { value: 1, label: 'Annually' },
  { value: 12, label: 'Monthly' },
  { value: 52, label: 'Weekly' },
];

export const CompoundInterestCalculator = () => {
  const [currency, setCurrency] = useState('USD');
  const [principal, setPrincipal] = useState('10000');
  const [contributionAmount, setContributionAmount] = useState('500');
  const [contributionFrequency, setContributionFrequency] = useState(12);
  const [annualRate, setAnnualRate] = useState('7');
  const [compoundingFrequency, setCompoundingFrequency] = useState(12);
  const [years, setYears] = useState('10');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const selectedCurrency = currencies.find(c => c.code === currency);

  const calculateCompoundInterest = () => {
    const P = parseFloat(principal) || 0;
    const PMT = parseFloat(contributionAmount) || 0;
    const r = (parseFloat(annualRate) || 0) / 100;
    const n = compoundingFrequency;
    const t = parseFloat(years) || 0;
    const contributionsPerYear = contributionFrequency;

    if (P <= 0 || r < 0 || t <= 0) return;

    const yearlyData: CalculationResult['yearlyData'] = [];
    let currentPrincipal = P;
    let totalContributions = P;

    for (let year = 1; year <= t; year++) {
      // Add annual contributions
      const annualContribution = PMT * contributionsPerYear;
      
      // Calculate compound interest for the year
      const yearStartBalance = currentPrincipal;
      
      // For monthly contributions, we need to compound each month
      let yearEndBalance = yearStartBalance;
      for (let month = 1; month <= 12; month++) {
        // Add monthly contribution if applicable
        if (contributionsPerYear === 12 && month <= 12) {
          yearEndBalance += PMT;
        } else if (contributionsPerYear === 1 && month === 12) {
          yearEndBalance += PMT;
        } else if (contributionsPerYear === 52 && month <= 12) {
          yearEndBalance += PMT * (52/12);
        }
        
        // Apply monthly compounding
        yearEndBalance *= (1 + r/n);
      }

      // If annual contribution, add at year end
      if (contributionsPerYear === 1) {
        yearEndBalance += PMT;
      }

      totalContributions += annualContribution;
      currentPrincipal = yearEndBalance;
      
      const totalInterest = currentPrincipal - totalContributions;

      yearlyData.push({
        year,
        principal: totalContributions,
        interest: totalInterest,
        total: currentPrincipal,
      });
    }

    const finalResult: CalculationResult = {
      totalAmount: currentPrincipal,
      totalContributions,
      totalInterest: currentPrincipal - totalContributions,
      yearlyData,
    };

    setResult(finalResult);
  };

  useEffect(() => {
    calculateCompoundInterest();
  }, [principal, contributionAmount, contributionFrequency, annualRate, compoundingFrequency, years]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{`Year ${label}`}</p>
          <p className="text-financial-blue">
            {`Principal: ${formatCurrency(data.principal)}`}
          </p>
          <p className="text-financial-success">
            {`Interest: ${formatCurrency(data.interest)}`}
          </p>
          <p className="text-foreground font-medium">
            {`Total: ${formatCurrency(data.total)}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Compound Interest Calculator
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          See how your investments grow over time with our advanced calculator and interactive charts.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calculator Form */}
        <div className="lg:col-span-1">
          <Card className="financial-card sticky top-20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="h-4 w-4 text-primary" />
                Investment Calculator
              </CardTitle>
              <CardDescription className="text-sm">
                Enter your details to see projected growth
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Currency Selection */}
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((curr) => (
                      <SelectItem key={curr.code} value={curr.code}>
                        {curr.symbol} {curr.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Initial Principal */}
              <div className="space-y-2">
                <Label htmlFor="principal">Initial Investment</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {selectedCurrency?.symbol}
                  </span>
                  <Input
                    id="principal"
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    className="pl-8"
                    placeholder="10000"
                  />
                </div>
              </div>

              {/* Regular Contribution */}
              <div className="space-y-2">
                <Label htmlFor="contribution">Regular Contribution</Label>
                <div className="space-y-3">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {selectedCurrency?.symbol}
                    </span>
                    <Input
                      id="contribution"
                      type="number"
                      value={contributionAmount}
                      onChange={(e) => setContributionAmount(e.target.value)}
                      className="pl-8"
                      placeholder="500"
                    />
                  </div>
                  <Select 
                    value={contributionFrequency.toString()} 
                    onValueChange={(value) => setContributionFrequency(parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {contributionFrequencies.map((freq) => (
                        <SelectItem key={freq.value} value={freq.value.toString()}>
                          {freq.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Annual Interest Rate */}
              <div className="space-y-2">
                <Label htmlFor="rate">Annual Interest Rate</Label>
                <div className="relative">
                  <Input
                    id="rate"
                    type="number"
                    step="0.1"
                    value={annualRate}
                    onChange={(e) => setAnnualRate(e.target.value)}
                    className="pr-8"
                    placeholder="7"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    %
                  </span>
                </div>
              </div>

              {/* Compounding Frequency */}
              <div className="space-y-2">
                <Label>Compounding Frequency</Label>
                <Select 
                  value={compoundingFrequency.toString()} 
                  onValueChange={(value) => setCompoundingFrequency(parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {compoundingFrequencies.map((freq) => (
                      <SelectItem key={freq.value} value={freq.value.toString()}>
                        {freq.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Investment Term */}
              <div className="space-y-2">
                <Label htmlFor="years">Investment Term (Years)</Label>
                <Input
                  id="years"
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  placeholder="10"
                />
              </div>

              <Button 
                onClick={calculateCompoundInterest}
                className="w-full gradient-primary text-white hover:opacity-90 transition-opacity"
                size="sm"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Calculate Growth
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          {result && (
            <>
              {/* Summary Cards */}
              <div className="grid md:grid-cols-3 gap-3">
                <Card className="financial-card">
                  <CardContent className="p-4 text-center">
                    <DollarSign className="h-6 w-6 text-financial-blue mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Final Amount</p>
                    <p className="text-xl font-bold text-financial-blue">
                      {formatCurrency(result.totalAmount)}
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="financial-card">
                  <CardContent className="p-4 text-center">
                    <Calendar className="h-6 w-6 text-financial-gold mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Total Invested</p>
                    <p className="text-xl font-bold text-financial-gold">
                      {formatCurrency(result.totalContributions)}
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="financial-card">
                  <CardContent className="p-4 text-center">
                    <Percent className="h-6 w-6 text-financial-success mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Interest Earned</p>
                    <p className="text-xl font-bold text-financial-success">
                      {formatCurrency(result.totalInterest)}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <Tabs defaultValue="growth" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="growth">Growth Chart</TabsTrigger>
                  <TabsTrigger value="breakdown">Breakdown Chart</TabsTrigger>
                </TabsList>
                
                <TabsContent value="growth">
                  <Card className="financial-card">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Investment Growth Over Time</CardTitle>
                      <CardDescription className="text-sm">
                        See how your investment grows with compound interest
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={result.yearlyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis 
                              dataKey="year" 
                              stroke="hsl(var(--muted-foreground))"
                            />
                            <YAxis 
                              stroke="hsl(var(--muted-foreground))"
                              tickFormatter={(value) => formatCurrency(value)}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Line 
                              type="monotone" 
                              dataKey="total" 
                              stroke="hsl(var(--financial-blue))" 
                              strokeWidth={2}
                              dot={{ fill: 'hsl(var(--financial-blue))', strokeWidth: 1, r: 3 }}
                              activeDot={{ r: 4, stroke: 'hsl(var(--financial-blue))', strokeWidth: 1 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="breakdown">
                  <Card className="financial-card">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Principal vs Interest Breakdown</CardTitle>
                      <CardDescription className="text-sm">
                        Visualize the contribution of principal and compound interest
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={result.yearlyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis 
                              dataKey="year" 
                              stroke="hsl(var(--muted-foreground))"
                            />
                            <YAxis 
                              stroke="hsl(var(--muted-foreground))"
                              tickFormatter={(value) => formatCurrency(value)}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                              type="monotone"
                              dataKey="principal"
                              stackId="1"
                              stroke="hsl(var(--financial-gold))"
                              fill="hsl(var(--financial-gold))"
                              fillOpacity={0.6}
                            />
                            <Area
                              type="monotone"
                              dataKey="interest"
                              stackId="1"
                              stroke="hsl(var(--financial-success))"
                              fill="hsl(var(--financial-success))"
                              fillOpacity={0.6}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </div>
    </div>
  );
};