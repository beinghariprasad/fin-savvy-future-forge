import { useEffect } from 'react';

interface AdSenseUnitProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
  style?: React.CSSProperties;
}

// Note: Replace with your actual AdSense publisher ID
const ADSENSE_CLIENT = 'ca-pub-0000000000000000';

export const AdSenseUnit = ({ 
  adSlot, 
  adFormat = 'auto',
  className = '',
  style = {} 
}: AdSenseUnitProps) => {

  useEffect(() => {
    // Only initialize AdSense in production with valid publisher ID
    if (ADSENSE_CLIENT !== 'ca-pub-0000000000000000' && typeof window !== 'undefined') {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (error) {
        // Silently handle AdSense errors in development
      }
    }
  }, []);

  // Don't render ads in development or with invalid publisher ID
  if (ADSENSE_CLIENT === 'ca-pub-0000000000000000') {
    return (
      <div className={`ad-container ${className}`} style={style}>
        <span className="text-muted-foreground">Ad Space - Replace with your AdSense Publisher ID</span>
      </div>
    );
  }

  return (
    <div className={`ad-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
        
      />
    </div>
  );
};

// Specific ad unit components for different placements
export const HeaderAd = () => (
  <AdSenseUnit
    adSlot="1234567890" // Replace with your actual slot ID
    adFormat="horizontal"
    className="ad-container-horizontal my-4"
  />
);

export const SidebarAd = () => (
  <AdSenseUnit
    adSlot="1234567891" // Replace with your actual slot ID
    adFormat="rectangle"
    className="ad-container sticky top-20"
  />
);

export const FooterAd = () => (
  <AdSenseUnit
    adSlot="1234567892" // Replace with your actual slot ID
    adFormat="horizontal"
    className="ad-container-horizontal my-8"
  />
);

export const InContentAd = () => (
  <AdSenseUnit
    adSlot="1234567893" // Replace with your actual slot ID
    adFormat="rectangle"
    className="ad-container my-8 mx-auto"
  />
);