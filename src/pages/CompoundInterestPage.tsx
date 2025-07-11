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

      <div className="bg-background">
        <div className="container mx-auto container-padding section-padding">
          {/* Calculator */}
          <CompoundInterestCalculator />

          {/* Educational Content */}
          <div className="mt-16 space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Understanding Compound Interest
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Learn how compound interest works and why it's powerful for building wealth
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
                  Investment Tips
                </CardTitle>
                <CardDescription className="text-sm">
                  Maximize the power of compound interest with these strategies
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
                  Compound Interest Formula
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 rounded-lg p-4 mb-3">
                  <p className="text-center text-lg font-mono mb-3">
                    A = P(1 + r/n)<sup>nt</sup>
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <strong>A</strong> = Final amount<br />
                      <strong>P</strong> = Principal<br />
                      <strong>r</strong> = Annual rate
                    </div>
                    <div>
                      <strong>n</strong> = Compounds per year<br />
                      <strong>t</strong> = Number of years
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  This formula calculates compound interest growth. Our calculator includes additional contributions for accurate projections.
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