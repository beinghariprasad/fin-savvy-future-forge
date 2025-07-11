import { MortgageCalculator } from '@/components/calculators/MortgageCalculator';
import { Helmet } from 'react-helmet-async';

export default function MortgagePage() {
  return (
    <>
      <Helmet>
        <title>Mortgage Calculator - Free Home Loan Payment Calculator | Fin Tools Lab</title>
        <meta 
          name="description" 
          content="Calculate mortgage payments, total interest, and amortization schedules. Free mortgage calculator with PMI, property tax, and insurance calculations." 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto container-padding section-padding">
          <MortgageCalculator />
        </div>
      </div>
    </>
  );
}