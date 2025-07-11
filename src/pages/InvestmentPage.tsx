import { InvestmentCalculator } from '@/components/calculators/InvestmentCalculator';
import { HeaderAd, FooterAd } from '@/components/ads/AdSenseUnit';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Target, TrendingUp, PiggyBank, BookOpen, Lightbulb } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const educationalContent = [
  {
    title: 'Investment Basics',
    content: 'Investing involves purchasing assets with the expectation of generating income or appreciation. Diversification across different asset classes helps manage risk while pursuing returns over the long term.',
    icon: BookOpen
  },
  {
    title: 'Risk vs Return',
    content: 'Higher potential returns typically come with higher risk. Conservative investments offer stability but lower returns, while aggressive investments offer higher potential returns with more volatility.',
    icon: Target
  },
  {
    title: 'Time Horizon',
    content: 'Your investment timeline affects your strategy. Longer time horizons allow for more aggressive investments and recovery from market downturns, while shorter horizons require more conservative approaches.',
    icon: TrendingUp
  },
  {
    title: 'Tax Implications',
    content: 'Different investments have different tax treatments. Consider tax-advantaged accounts like 401(k)s and IRAs, and understand the difference between capital gains and ordinary income taxation.',
    icon: PiggyBank
  }
];

const tips = [
  'Start investing early to take advantage of compound growth',
  'Diversify across different asset classes and geographic regions',
  'Consider low-cost index funds for broad market exposure',
  'Rebalance your portfolio periodically to maintain target allocation',
  'Don\'t try to time the market - consistency beats timing',
  'Keep fees low as they can significantly impact long-term returns'
];

export default function InvestmentPage() {
  return (
    <>
      <Helmet>
        <title>Investment Calculator - Portfolio Growth & Risk Analysis | Fin Tools Lab</title>
        <meta 
          name="description" 
          content="Analyze investment returns with different scenarios and timeframes. Calculate portfolio growth, risk assessment, and tax implications." 
        />
        <meta name="keywords" content="investment calculator, portfolio growth, risk analysis, investment returns, asset allocation, retirement investing" />
        <link rel="canonical" href="https://fintoolslab.com/calculators/investment" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fintoolslab.com/calculators/investment" />
        <meta property="og:title" content="Investment Calculator - Portfolio Growth & Risk Analysis" />
        <meta property="og:description" content="Analyze investment returns with different scenarios and timeframes using our free investment calculator." />
        
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://fintoolslab.com/calculators/investment" />
        <meta property="twitter:title" content="Investment Calculator - Portfolio Growth & Risk Analysis" />
        <meta property="twitter:description" content="Analyze investment returns with different scenarios and timeframes using our free investment calculator." />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Investment Calculator",
            "description": "Free investment calculator with portfolio growth and risk analysis",
            "url": "https://fintoolslab.com/calculators/investment",
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
          <InvestmentCalculator />

          {/* Educational Content */}
          <div className="mt-16 space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Understanding Investments
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Learn about investment strategies and building wealth over time
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
                  Best practices for successful long-term investing
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
                  Investment Growth Formula
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 rounded-lg p-4 mb-3">
                  <p className="text-center text-lg font-mono mb-3">
                    FV = PV(1 + r)<sup>t</sup> + PMT[((1 + r)<sup>t</sup> - 1) / r]
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <strong>FV</strong> = Future value<br />
                      <strong>PV</strong> = Present value<br />
                      <strong>r</strong> = Annual return rate
                    </div>
                    <div>
                      <strong>t</strong> = Time in years<br />
                      <strong>PMT</strong> = Regular contributions
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  This formula calculates the future value of an investment with regular contributions and compound growth.
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