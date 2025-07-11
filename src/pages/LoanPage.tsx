import { LoanCalculator } from '@/components/calculators/LoanCalculator';
import { Helmet } from 'react-helmet-async';

export default function LoanPage() {
  return (
    <>
      <Helmet>
        <title>Loan Calculator - Personal & Auto Loan Payment Calculator | Fin Tools Lab</title>
        <meta 
          name="description" 
          content="Calculate loan payments for personal loans, auto loans, and more. Free loan calculator with extra payment options and payoff schedules." 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto container-padding section-padding">
          <LoanCalculator />
        </div>
      </div>
    </>
  );
}