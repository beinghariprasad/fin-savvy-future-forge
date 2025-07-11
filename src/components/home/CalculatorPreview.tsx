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
    description: 'Watch your investments grow with the power of compound interest',
    icon: TrendingUp,
    gradient: 'from-primary to-violet',
    features: ['Real-time charts', 'Multiple currencies', 'Smart projections'],
    popular: true,
    href: '/calculators/compound-interest'
  },
  {
    id: 'mortgage',
    title: 'Mortgage Calculator',
    description: 'Plan your home purchase with detailed payment breakdowns',
    icon: Home,
    gradient: 'from-emerald to-cyan',
    features: ['Payment schedules', 'Tax calculations', 'Rate comparisons'],
    popular: false,
    href: '/calculators/mortgage'
  },
  {
    id: 'loan',
    title: 'Loan Calculator',
    description: 'Compare loan options and optimize your repayment strategy',
    icon: DollarSign,
    gradient: 'from-orange to-amber',
    features: ['Payment analysis', 'Interest savings', 'Payoff strategies'],
    popular: false,
    href: '/calculators/loan'
  },
  {
    id: 'investment',
    title: 'Investment Calculator',
    description: 'Model portfolio performance with advanced risk analysis',
    icon: PiggyBank,
    gradient: 'from-violet to-rose',
    features: ['Portfolio modeling', 'Risk metrics', 'Goal tracking'],
    popular: false,
    href: '/calculators/investment'
  },
  {
    id: 'retirement',
    title: 'Retirement Calculator',
    description: 'Build a comprehensive retirement plan with confidence',
    icon: Target,
    gradient: 'from-cyan to-emerald',
    features: ['Retirement planning', '401k optimization', 'Income strategies'],
    popular: false,
    href: '/calculators/retirement'
  },
  {
    id: 'savings',
    title: 'Savings Goal Calculator',
    description: 'Turn your financial dreams into achievable monthly targets',
    icon: Calculator,
    gradient: 'from-rose to-orange',
    features: ['Goal setting', 'Progress tracking', 'Smart strategies'],
    popular: false,
    href: '/calculators/savings'
  }
];

export const CalculatorPreview = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald/10 to-cyan/10 border border-emerald/20 mb-6">
            <span className="text-sm font-medium text-emerald">🚀 Interactive Financial Tools</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-emerald bg-clip-text text-transparent">
              Powerful Calculators
            </span>
            <br />
            <span className="text-foreground">Built for Success</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Make smarter financial decisions with our comprehensive suite of interactive calculators and real-time analytics
          </p>
          
          {/* Preview Image */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="glass-card p-6 hover-lift">
              <img
                src={calculatorPreview}
                alt="Calculator Interface Preview"
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {calculators.map((calculator, index) => (
            <div 
              key={calculator.id} 
              className="group hover-lift"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="gradient-card h-full relative overflow-hidden">
                {calculator.popular && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-amber to-orange text-white text-sm font-medium rounded-full shadow-lg">
                    ⭐ Popular
                  </div>
                )}
                
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${calculator.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <calculator.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <CardTitle className="text-xl group-hover:text-primary transition-colors mb-2">
                    {calculator.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {calculator.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {calculator.features.map((feature, featureIndex) => (
                      <div key={feature} className="flex items-center text-sm">
                        <div className={`w-2 h-2 rounded-full mr-3 ${
                          featureIndex === 0 ? 'bg-emerald' : 
                          featureIndex === 1 ? 'bg-violet' : 'bg-orange'
                        }`} />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    asChild 
                    className="w-full group/btn bg-gradient-to-r from-primary to-violet hover:from-primary/90 hover:to-violet/90 text-white border-0 h-12"
                  >
                    <Link to={calculator.href}>
                      Explore Calculator
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Financial Planning?</h3>
            <p className="text-lg text-muted-foreground">Join thousands of users who trust our calculators for their financial decisions</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="gradient-blue text-white hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 h-14 px-8"
            >
              <Link to="/calculators">
                Explore All Calculators
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-2 border-primary/20 hover:bg-primary/5 hover:border-primary/40 h-14 px-8"
            >
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};