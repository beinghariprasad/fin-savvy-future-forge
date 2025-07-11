import { RetirementCalculator } from '@/components/calculators/RetirementCalculator';
import { Helmet } from 'react-helmet-async';

export default function RetirementPage() {
  return (
    <>
      <Helmet>
        <title>Retirement Calculator - 401k & Retirement Planning Calculator | Fin Tools Lab</title>
        <meta 
          name="description" 
          content="Plan for retirement with comprehensive savings and withdrawal analysis. Calculate 401k growth, employer matching, and retirement income." 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto container-padding section-padding">
          <RetirementCalculator />
        </div>
      </div>
    </>
  );
}