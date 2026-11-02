import { useState, type FormEvent } from 'react';
import { Eye, EyeOff, Lock, LogIn, User } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import type { TranslationKey } from '../../i18n/translations';

export interface LoginCredentials {
  email: string;
  password: string;
  remember: boolean;
}

interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => Promise<void>;
  onGoogle: () => Promise<void>;
  onForgotPassword: () => void;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginForm({ onSubmit, onGoogle, onForgotPassword }: LoginFormProps) {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorKey, setErrorKey] = useState<TranslationKey | null>(null);

  const validate = (): TranslationKey | null => {
    if (!email.trim() || !password) return 'err_required';
    if (!EMAIL_PATTERN.test(email.trim())) return 'err_email';
    return null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setErrorKey(validationError);
      return;
    }
    setErrorKey(null);
    setLoading(true);
    try {
      await onSubmit({ email: email.trim(), password, remember });
    } catch {
      setErrorKey('err_generic');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setErrorKey(null);
    try {
      await onGoogle();
    } catch {
      setErrorKey('err_generic');
    }
  };

  const inputBase =
    'w-full rounded-xl border border-brand-100 bg-white py-3.5 pl-12 text-[15px] text-brand-900 placeholder:text-slate-400 shadow-sm transition focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15';

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {errorKey && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {t(errorKey)}
        </p>
      )}

      <div className="relative">
        <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" aria-hidden="true" />
        <label htmlFor="login-email" className="sr-only">
          {t('email_label')}
        </label>
        <input
          id="login-email"
          type="text"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('email_label')}
          className={inputBase}
        />
      </div>

      <div className="relative">
        <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" aria-hidden="true" />
        <label htmlFor="login-password" className="sr-only">
          {t('password_label')}
        </label>
        <input
          id="login-password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('password_label')}
          className={`${inputBase} pr-12`}
        />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          aria-label={showPassword ? t('hide_password') : t('show_password')}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-slate-500 hover:text-brand-600"
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>

      <div className="flex items-center justify-between gap-3 pt-1">
        <label className="flex cursor-pointer items-center gap-2.5 text-[15px] text-brand-900">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-[18px] w-[18px] rounded border-brand-100 text-brand-600 focus:ring-brand-500"
          />
          {t('remember')}
        </label>
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-[15px] font-medium text-brand-600 hover:text-brand-700 hover:underline"
        >
          {t('forgot')}
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-brand-600 py-3.5 text-base font-semibold text-white shadow-md transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <LogIn className="h-5 w-5" aria-hidden="true" />
        {loading ? t('logging_in') : t('login')}
      </button>

      <div className="flex items-center gap-4 pt-2">
        <span className="h-px flex-1 bg-brand-100" />
        <span className="text-sm text-slate-500">{t('or_continue')}</span>
        <span className="h-px flex-1 bg-brand-100" />
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-brand-100 bg-white py-3 text-[15px] font-medium text-brand-900 shadow-sm transition hover:bg-brand-50"
      >
        <GoogleG />
        {t('google')}
      </button>
    </form>
  );
}

function GoogleG() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.54 5.54 0 0 1-2.4 3.64v3.02h3.88c2.27-2.09 3.55-5.17 3.55-8.9z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.02c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.76-2.11-6.71-4.95H1.29v3.11A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.29 14.28A7.2 7.2 0 0 1 4.9 12c0-.79.14-1.56.39-2.28V6.61H1.29A12 12 0 0 0 0 12c0 1.94.46 3.77 1.29 5.39l4-3.11z" />
      <path fill="#EA4335" d="M12 4.77c1.76 0 3.35.61 4.6 1.8l3.43-3.43A11.5 11.5 0 0 0 12 0 12 12 0 0 0 1.29 6.61l4 3.11C6.24 6.88 8.88 4.77 12 4.77z" />
    </svg>
  );
}
