import { InvestmentCalculator } from '@/components/calculators/InvestmentCalculator';
import { Helmet } from 'react-helmet-async';

export default function InvestmentPage() {
  return (
    <>
      <Helmet>
        <title>Investment Calculator - Portfolio Growth & Risk Analysis | Fin Tools Lab</title>
        <meta 
          name="description" 
          content="Analyze investment returns with different scenarios and timeframes. Calculate portfolio growth, risk assessment, and tax implications." 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto container-padding section-padding">
          <InvestmentCalculator />
        </div>
      </div>
    </>
  );
}