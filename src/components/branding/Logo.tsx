interface LogoMarkProps {
  className?: string;
}

/** Built-in TexNext hanger-and-shirt mark, drawn as SVG so it stays sharp at any size. */
export function TexNextMark({ className = 'h-16 w-16' }: LogoMarkProps) {
  return (
    <svg viewBox="0 0 96 80" className={className} aria-hidden="true" fill="none">
      <path
        d="M48 6c0 4-3 6-6 6 1 3 4 4 6 2"
        stroke="#1565E0"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M48 14v8M48 22L22 40c-2 1.5-1 4 1 4h50c2 0 3-2.5 1-4L48 22z"
        stroke="#1565E0"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M22 40l-6 12M74 40l6 12" stroke="#0B1F4B" strokeWidth="3" strokeLinecap="round" />
      <path d="M14 52c12 6 56 6 68 0" stroke="#1565E0" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

interface LogoProps {
  logoUrl?: string | null;
  companyName: string;
  className?: string;
}

export function Logo({ logoUrl, companyName, className = 'h-12 w-auto' }: LogoProps) {
  if (logoUrl) {
    return <img src={logoUrl} alt={companyName} className={`${className} object-contain`} />;
  }
  return <TexNextMark className={className} />;
}

interface WordmarkProps {
  size?: 'sm' | 'lg';
}

/** "TexNext ERP" wordmark: navy "TexNext", blue "ERP". */
export function TexNextWordmark({ size = 'lg' }: WordmarkProps) {
  const sizeClass = size === 'lg' ? 'text-5xl md:text-[3.25rem]' : 'text-3xl';
  return (
    <div className={`font-extrabold tracking-tight leading-none ${sizeClass}`}>
      <span className="text-brand-900">TexNext </span>
      <span className="text-brand-600">ERP</span>
    </div>
  );
}
