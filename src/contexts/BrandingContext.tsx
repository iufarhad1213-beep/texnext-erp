import { createContext, useContext, type ReactNode } from 'react';
import { defaultBranding, type Branding } from '../config/branding';

const BrandingContext = createContext<Branding>(defaultBranding);

/**
 * Step 1: provides static defaults.
 * Step 3: this provider will fetch branding from Supabase and subscribe to changes.
 */
export function BrandingProvider({ children }: { children: ReactNode }) {
  return <BrandingContext.Provider value={defaultBranding}>{children}</BrandingContext.Provider>;
}

export function useBranding(): Branding {
  return useContext(BrandingContext);
}
