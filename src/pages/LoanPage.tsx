import { LoanCalculator } from '@/components/calculators/LoanCalculator';
import { HeaderAd, FooterAd } from '@/components/ads/AdSenseUnit';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, CreditCard, TrendingDown, DollarSign, BookOpen, Lightbulb } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const educationalContent = [
  {
    title: 'Types of Loans',
    content: 'Personal loans are unsecured and have higher interest rates. Auto loans are secured by the vehicle with lower rates. Student loans often have favorable terms and tax benefits. Each type has different requirements and benefits.',
    icon: BookOpen
  },
  {
    title: 'Interest Rates',
    content: 'Your credit score significantly impacts your interest rate. Secured loans typically offer better rates than unsecured loans. Shop around with multiple lenders to find the best rate for your situation.',
    icon: TrendingDown
  },
  {
    title: 'Loan Terms',
    content: 'Longer terms mean lower monthly payments but more total interest paid. Shorter terms have higher payments but save money overall. Choose based on your budget and financial goals.',
    icon: DollarSign
  },
  {
    title: 'Extra Payments',
    content: 'Making extra payments reduces the principal balance faster, saving interest and shortening the loan term. Even small additional payments can make a significant difference over time.',
    icon: CreditCard
  }
];

const tips = [
  'Check your credit score before applying to understand your rates',
  'Compare offers from multiple lenders including banks and credit unions',
  'Consider the total cost of the loan, not just monthly payments',
  'Read all terms and conditions, including prepayment penalties',
  'Make extra principal payments when possible to save on interest',
  'Avoid borrowing more than you need, even if pre-approved for more'
];

export default function LoanPage() {
  return (
    <>
      <Helmet>
        <title>Loan Calculator - Personal & Auto Loan Payment Calculator | Fin Tools Lab</title>
        <meta 
          name="description" 
          content="Calculate loan payments for personal loans, auto loans, and more. Free loan calculator with extra payment options and payoff schedules." 
        />
        <meta name="keywords" content="loan calculator, personal loan, auto loan, loan payment, interest rate, loan comparison" />
        <link rel="canonical" href="https://fintoolslab.com/calculators/loan" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fintoolslab.com/calculators/loan" />
        <meta property="og:title" content="Loan Calculator - Personal & Auto Loan Payment Calculator" />
        <meta property="og:description" content="Calculate loan payments for personal loans, auto loans, and more with our free loan calculator." />
        
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://fintoolslab.com/calculators/loan" />
        <meta property="twitter:title" content="Loan Calculator - Personal & Auto Loan Payment Calculator" />
        <meta property="twitter:description" content="Calculate loan payments for personal loans, auto loans, and more with our free loan calculator." />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Loan Calculator",
            "description": "Free loan calculator for personal, auto, and other loan types",
            "url": "https://fintoolslab.com/calculators/loan",
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
          <LoanCalculator />

          {/* Educational Content */}
          <div className="mt-16 space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Understanding Loans
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Learn about different loan types and strategies to save money
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
                  Loan Tips
                </CardTitle>
                <CardDescription className="text-sm">
                  Smart strategies for getting the best loan terms
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
                  Loan Payment Formula
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 rounded-lg p-4 mb-3">
                  <p className="text-center text-lg font-mono mb-3">
                    PMT = P[r(1+r)<sup>n</sup>]/[(1+r)<sup>n</sup>-1]
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <strong>PMT</strong> = Monthly payment<br />
                      <strong>P</strong> = Principal amount<br />
                      <strong>r</strong> = Monthly interest rate
                    </div>
                    <div>
                      <strong>n</strong> = Total number of payments
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  This formula calculates your fixed monthly payment amount for any type of installment loan.
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