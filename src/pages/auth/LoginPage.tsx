import { useState } from 'react';
import { BarChart3, Factory, Globe, Package, ShieldCheck, ShoppingCart } from 'lucide-react';
import { LoginForm, type LoginCredentials } from '../../components/auth/LoginForm';
import { Logo, TexNextMark, TexNextWordmark } from '../../components/branding/Logo';
import { useBranding } from '../../contexts/BrandingContext';
import { useLanguage } from '../../contexts/LanguageContext';
import type { TranslationKey } from '../../i18n/translations';
import { AuthNotConfiguredError, signInWithEmail, signInWithGoogle } from '../../services/auth';

const FEATURES: { icon: typeof ShoppingCart; key: TranslationKey }[] = [
  { icon: ShoppingCart, key: 'feature_orders' },
  { icon: Factory, key: 'feature_production' },
  { icon: ShieldCheck, key: 'feature_quality' },
  { icon: Package, key: 'feature_inventory' },
  { icon: BarChart3, key: 'feature_analytics' },
];

export function LoginPage() {
  const { t, lang, setLang } = useLanguage();
  const branding = useBranding();
  const [notice, setNotice] = useState<TranslationKey | null>(null);
  const year = new Date().getFullYear();

  const handleSubmit = async ({ email, password }: LoginCredentials) => {
    setNotice(null);
    try {
      await signInWithEmail(email, password);
    } catch (err) {
      if (err instanceof AuthNotConfiguredError) {
        setNotice('err_not_configured');
        return;
      }
      setNotice('err_invalid_credentials');
    }
  };

  const handleGoogle = async () => {
    setNotice(null);
    try {
      await signInWithGoogle();
    } catch (err) {
      setNotice(err instanceof AuthNotConfiguredError ? 'err_not_configured' : 'err_generic');
    }
  };

  const handleForgot = () => setNotice('reset_coming_soon');

  const backgroundStyle = branding.loginBackgroundUrl
    ? { backgroundImage: `url(${branding.loginBackgroundUrl})` }
    : undefined;

  return (
    <div className="flex min-h-full flex-col bg-gradient-to-b from-brand-50 to-[#E6EEF9] p-4 md:p-6">
      <main className="mx-auto flex w-full max-w-[1320px] flex-1 flex-col overflow-hidden rounded-3xl bg-white shadow-card lg:flex-row">
        {/* LEFT PANEL: brand story and factory photo (desktop and laptop) */}
        <section className="relative hidden flex-[1.15] overflow-hidden lg:flex lg:flex-col">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={backgroundStyle}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/92 via-white/70 to-white/10" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-100/80 via-transparent to-transparent" aria-hidden="true" />

          <div className="relative z-10 flex flex-1 flex-col p-10 xl:p-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TexNextMark className="h-14 w-16" />
                <div>
                  <TexNextWordmark size="sm" />
                  <p className="mt-1 text-sm text-slate-600">{t('tagline')}</p>
                </div>
              </div>
              <LanguageSwitch lang={lang} onChange={setLang} />
            </div>

            <div className="mt-12 max-w-xl">
              <h2 className="text-[2.35rem] font-bold leading-[1.15] tracking-tight text-brand-900 xl:text-[2.6rem]">
                {t('heading')}
              </h2>
              <p className="mt-4 text-lg text-slate-700">{t('subtitle')}</p>
            </div>

            <ul className="mt-auto grid grid-cols-5 gap-3 pb-10">
              {FEATURES.map(({ icon: Icon, key }) => (
                <li key={key} className="flex flex-col items-center text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/80 text-brand-900 shadow-sm ring-1 ring-brand-100 backdrop-blur">
                    <Icon className="h-7 w-7 text-brand-900" aria-hidden="true" />
                  </span>
                  <span className="mt-3 text-sm font-medium leading-snug text-brand-900">{t(key)}</span>
                </li>
              ))}
            </ul>

            <p className="relative z-10 border-l-4 border-brand-600 pl-3 text-base italic text-brand-900">
              {t('slogan')}
            </p>
          </div>
        </section>

        {/* RIGHT PANEL: login card */}
        <section className="flex flex-1 flex-col justify-center px-6 py-10 sm:px-12 lg:px-14 xl:px-20">
          <div className="mx-auto w-full max-w-md">
            {/* Mobile and tablet brand header (left panel is hidden below lg) */}
            <div className="mb-8 flex flex-col items-center text-center">
              <div className="flex items-center justify-between w-full lg:hidden mb-4">
                <span />
                <LanguageSwitch lang={lang} onChange={setLang} />
              </div>
              <TexNextMark className="h-20 w-24" />
              <div className="mt-3">
                <TexNextWordmark size="lg" />
              </div>
              <p className="mt-3 text-[15px] tracking-wide text-slate-600">{t('brand_subtitle')}</p>
            </div>

            <div className="mb-6 border-t border-brand-100" />

            <div className="mb-7 text-center">
              <h1 className="text-2xl font-bold text-brand-900">{t('welcome')}</h1>
              <p className="mt-1.5 text-[15px] text-slate-600">{t('signin_prompt')}</p>
            </div>

            {notice && (
              <p role="status" className="mb-4 rounded-lg bg-brand-50 px-4 py-3 text-sm text-brand-900">
                {t(notice)}
              </p>
            )}

            <LoginForm onSubmit={handleSubmit} onGoogle={handleGoogle} onForgotPassword={handleForgot} />

            <CompanyFooter />
          </div>
        </section>
      </main>

      <footer className="mx-auto mt-4 flex w-full max-w-[1320px] flex-col items-center justify-between gap-2 rounded-2xl bg-brand-900 px-6 py-4 text-sm text-white sm:flex-row">
        <div className="flex items-center gap-2 text-brand-100">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          <span>{t('secure')}</span>
        </div>
        <span className="text-brand-100">
          © {year} TexNext ERP. {t('all_rights')}
        </span>
      </footer>
    </div>
  );
}

function CompanyFooter() {
  const { t } = useLanguage();
  const branding = useBranding();
  return (
    <div className="mt-8 flex items-center justify-between gap-4 rounded-xl border border-brand-100 bg-gradient-to-r from-brand-50 to-white px-4 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <Logo logoUrl={branding.companyLogoUrl} companyName={branding.companyName} className="h-9 w-9" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-brand-900">{branding.companyName}</p>
          <p className="truncate text-xs italic text-slate-600">{branding.companyTagline}</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2 text-sm text-emerald-700">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" aria-hidden="true" />
        {t('system_online')}
      </div>
    </div>
  );
}

function LanguageSwitch({ lang, onChange }: { lang: 'en' | 'bn'; onChange: (lang: 'en' | 'bn') => void }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-sm font-medium text-brand-900 shadow-sm ring-1 ring-brand-100">
      <Globe className="h-4 w-4 text-slate-600" aria-hidden="true" />
      <button
        type="button"
        onClick={() => onChange('en')}
        aria-pressed={lang === 'en'}
        className={lang === 'en' ? 'text-brand-600 font-semibold' : 'text-slate-500 hover:text-brand-900'}
      >
        EN
      </button>
      <span className="text-slate-300" aria-hidden="true">|</span>
      <button
        type="button"
        onClick={() => onChange('bn')}
        aria-pressed={lang === 'bn'}
        className={lang === 'bn' ? 'text-brand-600 font-semibold' : 'text-slate-500 hover:text-brand-900'}
      >
        বাংলা
      </button>
    </div>
  );
}
