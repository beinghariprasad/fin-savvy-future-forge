import { RetirementCalculator } from '@/components/calculators/RetirementCalculator';
import { HeaderAd, FooterAd } from '@/components/ads/AdSenseUnit';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Target, Wallet, TrendingUp, BookOpen, Lightbulb } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const educationalContent = [
  {
    title: 'Retirement Planning Basics',
    content: 'Retirement planning involves estimating future expenses and building sufficient savings to maintain your desired lifestyle. Start early to take advantage of compound growth and employer benefits.',
    icon: BookOpen
  },
  {
    title: 'The 4% Rule',
    content: 'A common guideline suggests withdrawing 4% of your retirement savings annually. This rate historically preserves capital while providing income. However, consider your specific situation and market conditions.',
    icon: Target
  },
  {
    title: 'Employer Matching',
    content: 'Always contribute enough to get your full employer 401(k) match - it\'s free money. Employer matches can significantly boost your retirement savings over time.',
    icon: Wallet
  },
  {
    title: 'Inflation Impact',
    content: 'Inflation reduces purchasing power over time. What costs $1,000 today might cost $1,500 in 20 years at 2% inflation. Plan for inflation when calculating retirement needs.',
    icon: TrendingUp
  }
];

const tips = [
  'Start contributing to retirement accounts as early as possible',
  'Maximize employer 401(k) matching - it\'s free money',
  'Consider both traditional and Roth retirement accounts',
  'Increase contributions when you get raises or bonuses',
  'Don\'t touch retirement savings early - penalties are costly',
  'Review and adjust your plan annually as circumstances change'
];

export default function RetirementPage() {
  return (
    <>
      <Helmet>
        <title>Retirement Calculator - 401k & Retirement Planning Calculator | Fin Tools Lab</title>
        <meta 
          name="description" 
          content="Plan for retirement with comprehensive savings and withdrawal analysis. Calculate 401k growth, employer matching, and retirement income." 
        />
        <meta name="keywords" content="retirement calculator, 401k calculator, retirement planning, retirement savings, pension calculator, IRA calculator" />
        <link rel="canonical" href="https://fintoolslab.com/calculators/retirement" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fintoolslab.com/calculators/retirement" />
        <meta property="og:title" content="Retirement Calculator - 401k & Retirement Planning Calculator" />
        <meta property="og:description" content="Plan for retirement with comprehensive savings and withdrawal analysis using our free retirement calculator." />
        
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://fintoolslab.com/calculators/retirement" />
        <meta property="twitter:title" content="Retirement Calculator - 401k & Retirement Planning Calculator" />
        <meta property="twitter:description" content="Plan for retirement with comprehensive savings and withdrawal analysis using our free retirement calculator." />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Retirement Calculator",
            "description": "Free retirement calculator with 401k and comprehensive retirement planning",
            "url": "https://fintoolslab.com/calculators/retirement",
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
          <RetirementCalculator />

          {/* Educational Content */}
          <div className="mt-16 space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Understanding Retirement Planning
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Learn about retirement savings strategies and income planning
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
                  Retirement Tips
                </CardTitle>
                <CardDescription className="text-sm">
                  Smart strategies for successful retirement planning
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
                  Retirement Savings Formula
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 rounded-lg p-4 mb-3">
                  <p className="text-center text-lg font-mono mb-3">
                    Monthly Income = Total Savings × 0.04 ÷ 12
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <strong>4% Rule</strong> = Annual withdrawal rate<br />
                      <strong>Total Savings</strong> = Final retirement balance
                    </div>
                    <div>
                      <strong>Monthly Income</strong> = Sustainable monthly withdrawal
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  The 4% rule suggests you can withdraw 4% of your retirement savings annually while preserving your principal.
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