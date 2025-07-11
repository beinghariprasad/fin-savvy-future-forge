import { SavingsCalculator } from '@/components/calculators/SavingsCalculator';
import { Helmet } from 'react-helmet-async';

export default function SavingsPage() {
  return (
    <>
      <Helmet>
        <title>Savings Goal Calculator - Emergency Fund & Goal Planning | Fin Tools Lab</title>
        <meta 
          name="description" 
          content="Calculate how much to save monthly to reach your financial goals. Plan for emergency funds, vacations, and major purchases." 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto container-padding section-padding">
          <SavingsCalculator />
        </div>
      </div>
    </>
  );
}