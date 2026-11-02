/**
 * Shape of the company branding that Admin Settings controls.
 * In Step 1 these defaults are used. In Step 3 the BrandingProvider loads
 * the saved values from Supabase (company_settings / branding_settings).
 */
export interface Branding {
  companyName: string;
  companyTagline: string;
  companyLogoUrl: string | null;
  loginBackgroundUrl: string | null;
  loginHeading: string | null;
  loginSubtitle: string | null;
  footerText: string | null;
  copyrightText: string | null;
}

export const defaultBranding: Branding = {
  companyName: 'Your Company',
  companyTagline: 'Your company tagline',
  companyLogoUrl: null,
  loginBackgroundUrl: '/assets/login-factory.jpg',
  loginHeading: null,
  loginSubtitle: null,
  footerText: null,
  copyrightText: null,
};
