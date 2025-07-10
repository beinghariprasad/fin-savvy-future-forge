import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Calculator, TrendingUp, PieChart, Target, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-financial.jpg';

const features = [
  {
    icon: Calculator,
    title: 'Advanced Calculators',
    description: 'Professional-grade financial calculators with real-time results'
  },
  {
    icon: TrendingUp,
    title: 'Interactive Charts',
    description: 'Beautiful visualizations to understand your financial growth'
  },
  {
    icon: PieChart,
    title: 'Detailed Analysis',
    description: 'Comprehensive breakdowns and projections for informed decisions'
  },
  {
    icon: Target,
    title: 'Goal Planning',
    description: 'Set and track your financial goals with precision'
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your financial data stays private - calculations done client-side'
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Real-time calculations as you adjust your parameters'
  }
];

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-pattern opacity-50" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-playfair font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary via-financial-blue to-financial-gold bg-clip-text text-transparent">
                  Smart Financial
                </span>
                <br />
                <span className="text-foreground">
                  Calculators
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-lg">
                Make informed financial decisions with our suite of professional calculators. 
                From compound interest to retirement planning, we've got you covered.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                size="lg" 
                className="gradient-primary text-white hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 group"
              >
                <Link to="/calculators">
                  Start Calculating
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-2 hover:bg-accent"
              >
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-financial-success" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-financial-gold" />
                <span>Instant Results</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-financial-blue" />
                <span>Precise Calculations</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="animate-slide-in-up">
            <div className="relative">
              <img
                src={heroImage}
                alt="Financial Tools and Charts"
                className="w-full h-auto rounded-2xl shadow-2xl animate-float"
              />
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 bg-card border border-border rounded-xl p-4 shadow-lg animate-glow">
                <Calculator className="h-8 w-8 text-primary" />
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-xl p-4 shadow-lg animate-glow" style={{ animationDelay: '1s' }}>
                <TrendingUp className="h-8 w-8 text-financial-success" />
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 lg:mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-4">
              Why Choose Fin Tools Lab?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional-grade financial tools designed for accuracy, simplicity, and powerful insights
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={feature.title} 
                className="financial-card group hover:shadow-xl transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-financial-blue/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};