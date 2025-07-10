import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calculator, Home, DollarSign, TrendingUp, PiggyBank, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import calculatorPreview from '@/assets/calculator-preview.jpg';

const calculators = [
  {
    id: 'compound-interest',
    title: 'Compound Interest Calculator',
    description: 'Calculate how your investments grow with compound interest over time',
    icon: TrendingUp,
    color: 'from-financial-blue to-financial-blue-light',
    features: ['Interactive charts', 'Multiple currencies', 'Flexible contributions'],
    popular: true,
    href: '/calculators/compound-interest'
  },
  {
    id: 'mortgage',
    title: 'Mortgage Calculator',
    description: 'Calculate monthly payments, total interest, and amortization schedules',
    icon: Home,
    color: 'from-financial-gold to-financial-gold-light',
    features: ['Amortization table', 'PMI calculations', 'Extra payments'],
    popular: false,
    href: '/calculators/mortgage'
  },
  {
    id: 'loan',
    title: 'Loan Calculator',
    description: 'Calculate loan payments for personal loans, auto loans, and more',
    icon: DollarSign,
    color: 'from-financial-success to-financial-success-light',
    features: ['Payment schedules', 'Interest breakdown', 'Early payoff'],
    popular: false,
    href: '/calculators/loan'
  },
  {
    id: 'investment',
    title: 'Investment Calculator',
    description: 'Analyze investment returns with different scenarios and timeframes',
    icon: PiggyBank,
    color: 'from-purple-500 to-purple-600',
    features: ['Portfolio analysis', 'Risk assessment', 'Goal tracking'],
    popular: false,
    href: '/calculators/investment'
  },
  {
    id: 'retirement',
    title: 'Retirement Calculator',
    description: 'Plan for retirement with comprehensive savings and withdrawal analysis',
    icon: Target,
    color: 'from-emerald-500 to-emerald-600',
    features: ['Retirement planning', '401k analysis', 'Withdrawal strategies'],
    popular: false,
    href: '/calculators/retirement'
  },
  {
    id: 'savings',
    title: 'Savings Goal Calculator',
    description: 'Calculate how much to save monthly to reach your financial goals',
    icon: Calculator,
    color: 'from-orange-500 to-orange-600',
    features: ['Goal tracking', 'Timeline planning', 'Savings strategies'],
    popular: false,
    href: '/calculators/savings'
  }
];

export const CalculatorPreview = () => {
  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-4">
            Professional Financial Calculators
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Comprehensive suite of financial tools to help you make informed decisions about your money
          </p>
          
          {/* Preview Image */}
          <div className="max-w-4xl mx-auto mb-12">
            <img
              src={calculatorPreview}
              alt="Calculator Interface Preview"
              className="w-full h-auto rounded-2xl shadow-2xl border border-border"
            />
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {calculators.map((calculator, index) => (
            <Card 
              key={calculator.id} 
              className="financial-card group hover:shadow-xl transition-all duration-500 relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {calculator.popular && (
                <Badge className="absolute top-4 right-4 bg-financial-gold text-white">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${calculator.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <calculator.icon className="h-6 w-6 text-white" />
                </div>
                
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {calculator.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {calculator.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {calculator.features.map((feature) => (
                    <div key={feature} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                <Button 
                  asChild 
                  className="w-full group/btn"
                  variant="outline"
                >
                  <Link to={calculator.href}>
                    Try Calculator
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            asChild 
            size="lg" 
            className="gradient-primary text-white hover:shadow-xl hover:shadow-primary/25 transition-all duration-300"
          >
            <Link to="/calculators">
              View All Calculators
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};