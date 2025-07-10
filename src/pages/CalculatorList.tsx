import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, Calculator, Home, DollarSign, TrendingUp, PiggyBank, Target, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { HeaderAd, SidebarAd } from '@/components/ads/AdSenseUnit';

const calculators = [
  {
    id: 'compound-interest',
    title: 'Compound Interest Calculator',
    description: 'Calculate how your investments grow with compound interest over time. See the power of compounding with interactive charts and detailed projections.',
    icon: TrendingUp,
    category: 'Investment',
    difficulty: 'Beginner',
    color: 'from-financial-blue to-financial-blue-light',
    features: ['Interactive charts', 'Multiple currencies', 'Flexible contributions', 'Export results'],
    popular: true,
    href: '/calculators/compound-interest'
  },
  {
    id: 'mortgage',
    title: 'Mortgage Calculator',
    description: 'Calculate monthly payments, total interest, and amortization schedules for home loans. Compare different loan terms and rates.',
    icon: Home,
    category: 'Real Estate',
    difficulty: 'Intermediate',
    color: 'from-financial-gold to-financial-gold-light',
    features: ['Amortization table', 'PMI calculations', 'Extra payments', 'Comparison tools'],
    popular: true,
    href: '/calculators/mortgage'
  },
  {
    id: 'loan',
    title: 'Loan Calculator',
    description: 'Calculate loan payments for personal loans, auto loans, and more. Understand your payment schedule and total interest costs.',
    icon: DollarSign,
    category: 'Loans',
    difficulty: 'Beginner',
    color: 'from-financial-success to-financial-success-light',
    features: ['Payment schedules', 'Interest breakdown', 'Early payoff calculator', 'Multiple loan types'],
    popular: false,
    href: '/calculators/loan'
  },
  {
    id: 'investment',
    title: 'Investment Calculator',
    description: 'Analyze investment returns with different scenarios and timeframes. Plan your investment strategy with comprehensive analysis.',
    icon: PiggyBank,
    category: 'Investment',
    difficulty: 'Advanced',
    color: 'from-purple-500 to-purple-600',
    features: ['Portfolio analysis', 'Risk assessment', 'Goal tracking', 'Performance metrics'],
    popular: false,
    href: '/calculators/investment'
  },
  {
    id: 'retirement',
    title: 'Retirement Calculator',
    description: 'Plan for retirement with comprehensive savings and withdrawal analysis. Ensure you have enough for your golden years.',
    icon: Target,
    category: 'Retirement',
    difficulty: 'Advanced',
    color: 'from-emerald-500 to-emerald-600',
    features: ['Retirement planning', '401k analysis', 'Withdrawal strategies', 'Social Security'],
    popular: true,
    href: '/calculators/retirement'
  },
  {
    id: 'savings',
    title: 'Savings Goal Calculator',
    description: 'Calculate how much to save monthly to reach your financial goals. Set targets and track your progress.',
    icon: Calculator,
    category: 'Savings',
    difficulty: 'Beginner',
    color: 'from-orange-500 to-orange-600',
    features: ['Goal tracking', 'Timeline planning', 'Savings strategies', 'Progress monitoring'],
    popular: false,
    href: '/calculators/savings'
  }
];

const categories = ['All', 'Investment', 'Real Estate', 'Loans', 'Retirement', 'Savings'];
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function CalculatorList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const filteredCalculators = calculators.filter(calculator => {
    const matchesSearch = calculator.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         calculator.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || calculator.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || calculator.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header Ad */}
      <HeaderAd />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4 bg-gradient-to-r from-primary to-financial-blue bg-clip-text text-transparent">
            Financial Calculators
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional-grade financial calculators to help you make informed decisions about your money. 
            All tools are free, accurate, and designed for real-world use.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="financial-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search calculators..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Difficulty Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Difficulty</label>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map(difficulty => (
                        <SelectItem key={difficulty} value={difficulty}>
                          {difficulty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Sidebar Ad */}
            <SidebarAd />
          </div>

          {/* Calculator Grid */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-6">
              {filteredCalculators.map((calculator, index) => (
                <Card 
                  key={calculator.id} 
                  className="financial-card group hover:shadow-xl transition-all duration-500 relative overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {calculator.popular && (
                    <Badge className="absolute top-4 right-4 bg-financial-gold text-white z-10">
                      Popular
                    </Badge>
                  )}
                  
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${calculator.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <calculator.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {calculator.category}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            calculator.difficulty === 'Beginner' ? 'border-financial-success text-financial-success' :
                            calculator.difficulty === 'Intermediate' ? 'border-financial-gold text-financial-gold' :
                            'border-red-500 text-red-500'
                          }`}
                        >
                          {calculator.difficulty}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {calculator.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {calculator.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      {calculator.features.slice(0, 4).map((feature) => (
                        <div key={feature} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0" />
                          <span className="truncate">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      asChild 
                      className="w-full group/btn gradient-primary text-white hover:shadow-lg transition-all duration-300"
                    >
                      <Link to={calculator.href}>
                        Open Calculator
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCalculators.length === 0 && (
              <div className="text-center py-12">
                <Calculator className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No calculators found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or filters to find more calculators.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}