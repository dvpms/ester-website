// src/components/ui/Badge.jsx
// Atomic badge/label komponen untuk status properti dan kategori.
// Server Component — tidak ada interaktivitas.

/**
 * @param {{
 *   children: React.ReactNode,
 *   variant?: 'primary'|'secondary'|'tersedia'|'terjual'|'proses',
 *   className?: string,
 * }} props
 */
export function Badge({ children, variant = 'primary', className = '' }) {
  const baseStyles = 'inline-flex items-center px-3 py-1 text-xs font-semibold font-sans rounded-sm uppercase tracking-wide';

  const variantStyles = {
    // Segmen properti
    primary: 'bg-brand-gold-light text-brand-navy border border-brand-gold',
    secondary: 'bg-brand-navy text-neutral-50',

    // Status properti
    tersedia: 'bg-green-100 text-success border border-green-200',
    terjual: 'bg-red-100 text-error border border-red-200',
    proses: 'bg-yellow-100 text-warning border border-yellow-200',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}
