import { CompoundInterestCalculator } from '@/components/calculators/CompoundInterestCalculator';
import { HeaderAd, FooterAd } from '@/components/ads/AdSenseUnit';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, TrendingUp, DollarSign, Target, BookOpen, Lightbulb } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const educationalContent = [
  {
    title: 'What is Compound Interest?',
    content: 'Compound interest is the addition of interest to the principal sum of a loan or deposit, or in other words, interest on interest. It is the result of reinvesting interest, rather than paying it out, so that interest in the next period is then earned on the principal sum plus previously accumulated interest.',
    icon: BookOpen
  },
  {
    title: 'The Power of Time',
    content: 'The longer your money has to compound, the more dramatic the results. Starting early, even with small amounts, can lead to significantly larger returns than starting later with larger amounts. Time is your most powerful ally in building wealth.',
    icon: Target
  },
  {
    title: 'Compound Frequency Matters',
    content: 'The frequency of compounding affects your returns. Daily compounding typically yields slightly higher returns than monthly, which yields more than annually. However, the difference becomes less significant as the compounding frequency increases.',
    icon: TrendingUp
  },
  {
    title: 'Regular Contributions',
    content: 'Making regular contributions to your investment significantly amplifies the power of compound interest. Even small, consistent contributions can lead to substantial wealth accumulation over time due to the compounding effect.',
    icon: DollarSign
  }
];

const tips = [
  'Start investing as early as possible to maximize the power of compound interest',
  'Make regular contributions, even if they\'re small - consistency is key',
  'Choose investments with higher compound frequencies when possible',
  'Reinvest your returns rather than withdrawing them to maintain compounding',
  'Be patient - compound interest works best over long time periods',
  'Consider tax-advantaged accounts like 401(k)s and IRAs for retirement savings'
];

export default function CompoundInterestPage() {
  return (
    <>
      <Helmet>
        <title>Compound Interest Calculator - Free Investment Growth Calculator | Fin Tools Lab</title>
        <meta 
          name="description" 
          content="Calculate compound interest with our free calculator. See how your investments grow over time with interactive charts, multiple currencies, and detailed projections. Perfect for retirement and investment planning." 
        />
        <meta name="keywords" content="compound interest calculator, investment calculator, compound interest, retirement planning, savings calculator, investment growth" />
        <link rel="canonical" href="https://fintoolslab.com/calculators/compound-interest" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fintoolslab.com/calculators/compound-interest" />
        <meta property="og:title" content="Compound Interest Calculator - Free Investment Growth Calculator" />
        <meta property="og:description" content="Calculate compound interest with our free calculator. See how your investments grow over time with interactive charts and detailed projections." />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://fintoolslab.com/calculators/compound-interest" />
        <meta property="twitter:title" content="Compound Interest Calculator - Free Investment Growth Calculator" />
        <meta property="twitter:description" content="Calculate compound interest with our free calculator. See how your investments grow over time with interactive charts and detailed projections." />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Compound Interest Calculator",
            "description": "Free compound interest calculator with interactive charts and detailed projections",
            "url": "https://fintoolslab.com/calculators/compound-interest",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Interactive charts",
              "Multiple currencies",
              "Flexible contribution schedules",
              "Real-time calculations",
              "Export results"
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header Ad */}
        <HeaderAd />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Calculator */}
          <CompoundInterestCalculator />

          {/* Educational Content */}
          <div className="mt-20 space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-playfair font-bold mb-4">
                Understanding Compound Interest
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Learn how compound interest works and why it's one of the most powerful concepts in finance
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {educationalContent.map((item, index) => (
                <Card key={item.title} className="financial-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-financial-blue/10 rounded-xl flex items-center justify-center">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{item.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tips Section */}
            <Card className="financial-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-financial-gold/10 to-financial-gold-light/10 rounded-xl flex items-center justify-center">
                    <Lightbulb className="h-5 w-5 text-financial-gold" />
                  </div>
                  Investment Tips
                </CardTitle>
                <CardDescription>
                  Maximize the power of compound interest with these proven strategies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid md:grid-cols-2 gap-3">
                  {tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-financial-gold rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Formula Section */}
            <Card className="financial-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-financial-success/10 to-financial-success-light/10 rounded-xl flex items-center justify-center">
                    <Calculator className="h-5 w-5 text-financial-success" />
                  </div>
                  Compound Interest Formula
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg p-6 mb-4">
                  <p className="text-center text-lg font-mono mb-4">
                    A = P(1 + r/n)<sup>nt</sup>
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>A</strong> = Final amount<br />
                      <strong>P</strong> = Principal (initial investment)<br />
                      <strong>r</strong> = Annual interest rate (decimal)
                    </div>
                    <div>
                      <strong>n</strong> = Number of times interest compounds per year<br />
                      <strong>t</strong> = Number of years
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  This formula calculates the final amount when interest is compounded at regular intervals. 
                  Our calculator uses this formula along with additional contributions to provide accurate projections.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Footer Ad */}
          <FooterAd />
        </div>
      </div>
    </>
  );
}