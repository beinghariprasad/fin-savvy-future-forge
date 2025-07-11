import { SavingsCalculator } from '@/components/calculators/SavingsCalculator';
import { HeaderAd, FooterAd } from '@/components/ads/AdSenseUnit';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Target, PiggyBank, DollarSign, BookOpen, Lightbulb } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const educationalContent = [
  {
    title: 'Emergency Fund Importance',
    content: 'An emergency fund covers unexpected expenses like job loss, medical bills, or major repairs. Aim for 3-6 months of living expenses in a high-yield savings account for easy access.',
    icon: BookOpen
  },
  {
    title: 'SMART Goals',
    content: 'Make savings goals Specific, Measurable, Achievable, Relevant, and Time-bound. Clear goals with deadlines help maintain motivation and track progress effectively.',
    icon: Target
  },
  {
    title: 'High-Yield Savings',
    content: 'Use high-yield savings accounts to earn more interest on your savings. Online banks often offer higher rates than traditional banks, helping your money grow faster.',
    icon: PiggyBank
  },
  {
    title: 'Automatic Savings',
    content: 'Set up automatic transfers to your savings account. Treating savings like a bill ensures consistent progress toward your goals without relying on willpower alone.',
    icon: DollarSign
  }
];

const tips = [
  'Start with small, achievable goals to build the savings habit',
  'Pay yourself first - save before spending on discretionary items',
  'Use separate accounts for different savings goals',
  'Take advantage of high-yield savings accounts for better returns',
  'Review and adjust your savings goals regularly',
  'Consider increasing savings when you get raises or bonuses'
];

export default function SavingsPage() {
  return (
    <>
      <Helmet>
        <title>Savings Goal Calculator - Emergency Fund & Goal Planning | Fin Tools Lab</title>
        <meta 
          name="description" 
          content="Calculate how much to save monthly to reach your financial goals. Plan for emergency funds, vacations, and major purchases." 
        />
        <meta name="keywords" content="savings calculator, emergency fund, savings goal, financial planning, budget calculator, savings plan" />
        <link rel="canonical" href="https://fintoolslab.com/calculators/savings" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fintoolslab.com/calculators/savings" />
        <meta property="og:title" content="Savings Goal Calculator - Emergency Fund & Goal Planning" />
        <meta property="og:description" content="Calculate how much to save monthly to reach your financial goals with our free savings calculator." />
        
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://fintoolslab.com/calculators/savings" />
        <meta property="twitter:title" content="Savings Goal Calculator - Emergency Fund & Goal Planning" />
        <meta property="twitter:description" content="Calculate how much to save monthly to reach your financial goals with our free savings calculator." />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Savings Goal Calculator",
            "description": "Free savings calculator for emergency funds and financial goal planning",
            "url": "https://fintoolslab.com/calculators/savings",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
      </Helmet>

      <div className="bg-background">
        <div className="container mx-auto container-padding section-padding">
          <SavingsCalculator />

          {/* Educational Content */}
          <div className="mt-16 space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Understanding Savings Goals
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Learn about effective savings strategies and achieving financial goals
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {educationalContent.map((item, index) => (
                <Card key={item.title} className="financial-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <item.icon className="h-4 w-4 text-primary" />
                      </div>
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tips Section */}
            <Card className="financial-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="w-8 h-8 bg-financial-gold/10 rounded-lg flex items-center justify-center">
                    <Lightbulb className="h-4 w-4 text-financial-gold" />
                  </div>
                  Savings Tips
                </CardTitle>
                <CardDescription className="text-sm">
                  Proven strategies for reaching your savings goals faster
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid md:grid-cols-2 gap-2">
                  {tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-financial-gold rounded-full mt-1.5 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Formula Section */}
            <Card className="financial-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="w-8 h-8 bg-financial-success/10 rounded-lg flex items-center justify-center">
                    <Calculator className="h-4 w-4 text-financial-success" />
                  </div>
                  Savings Goal Formula
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 rounded-lg p-4 mb-3">
                  <p className="text-center text-lg font-mono mb-3">
                    Monthly Savings = Goal Amount ÷ Months to Goal
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <strong>Goal Amount</strong> = Target savings amount<br />
                      <strong>Months to Goal</strong> = Timeline to reach goal
                    </div>
                    <div>
                      <strong>Monthly Savings</strong> = Required monthly contribution
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  This simple formula helps you determine how much to save each month to reach your financial goal by your target date.
                </p>
              </CardContent>
            </Card>
          </div>

          <FooterAd />
        </div>
      </div>
    </>
  );
}