import { MortgageCalculator } from '@/components/calculators/MortgageCalculator';
import { HeaderAd, FooterAd } from '@/components/ads/AdSenseUnit';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Home, TrendingDown, DollarSign, BookOpen, Lightbulb } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const educationalContent = [
  {
    title: 'Understanding Mortgages',
    content: 'A mortgage is a loan specifically used to purchase real estate. The property serves as collateral for the loan. Mortgages typically have lower interest rates than personal loans because they are secured by the property value.',
    icon: BookOpen
  },
  {
    title: 'Down Payment Impact',
    content: 'A larger down payment reduces your loan amount, monthly payments, and total interest paid. It can also help you avoid Private Mortgage Insurance (PMI) if you put down 20% or more.',
    icon: Home
  },
  {
    title: 'Interest Rates Matter',
    content: 'Even a small difference in interest rates can significantly impact your monthly payment and total cost. A 1% difference on a $300,000 loan can cost or save you tens of thousands over the life of the loan.',
    icon: TrendingDown
  },
  {
    title: 'Additional Costs',
    content: 'Beyond principal and interest, homeowners pay property taxes, insurance, and possibly PMI. These costs are often escrowed with your monthly payment, making budgeting easier.',
    icon: DollarSign
  }
];

const tips = [
  'Save for a 20% down payment to avoid PMI and get better rates',
  'Shop around with multiple lenders to find the best interest rate',
  'Consider the total monthly payment, not just principal and interest',
  'Factor in maintenance, utilities, and other homeownership costs',
  'Get pre-approved to understand your budget before house hunting',
  'Consider shorter loan terms if you can afford higher payments'
];

export default function MortgagePage() {
  return (
    <>
      <Helmet>
        <title>Mortgage Calculator - Free Home Loan Payment Calculator | Fin Tools Lab</title>
        <meta 
          name="description" 
          content="Calculate mortgage payments, total interest, and amortization schedules. Free mortgage calculator with PMI, property tax, and insurance calculations." 
        />
        <meta name="keywords" content="mortgage calculator, home loan calculator, mortgage payment, interest rate, down payment, PMI calculator" />
        <link rel="canonical" href="https://fintoolslab.com/calculators/mortgage" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fintoolslab.com/calculators/mortgage" />
        <meta property="og:title" content="Mortgage Calculator - Free Home Loan Payment Calculator" />
        <meta property="og:description" content="Calculate mortgage payments, total interest, and amortization schedules with our free mortgage calculator." />
        
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://fintoolslab.com/calculators/mortgage" />
        <meta property="twitter:title" content="Mortgage Calculator - Free Home Loan Payment Calculator" />
        <meta property="twitter:description" content="Calculate mortgage payments, total interest, and amortization schedules with our free mortgage calculator." />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Mortgage Calculator",
            "description": "Free mortgage calculator with PMI, property tax, and insurance calculations",
            "url": "https://fintoolslab.com/calculators/mortgage",
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
          <MortgageCalculator />

          {/* Educational Content */}
          <div className="mt-16 space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Understanding Mortgages
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Learn about home loans, payments, and strategies to save money
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
                  Mortgage Tips
                </CardTitle>
                <CardDescription className="text-sm">
                  Smart strategies for getting the best mortgage deal
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
                  Mortgage Payment Formula
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 rounded-lg p-4 mb-3">
                  <p className="text-center text-lg font-mono mb-3">
                    M = P[r(1+r)<sup>n</sup>]/[(1+r)<sup>n</sup>-1]
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <strong>M</strong> = Monthly payment<br />
                      <strong>P</strong> = Principal amount<br />
                      <strong>r</strong> = Monthly interest rate
                    </div>
                    <div>
                      <strong>n</strong> = Total number of payments
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  This formula calculates your monthly principal and interest payment. Additional costs like taxes, insurance, and PMI are added separately.
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