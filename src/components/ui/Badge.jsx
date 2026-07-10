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
    primary: 'bg-red-tint text-remax-red border border-remax-red/20',
    secondary: 'bg-blue-tint text-remax-blue border border-remax-blue/20',

    // Status properti
    tersedia: 'bg-green-50 text-success border border-green-200',
    terjual: 'bg-red-50 text-error border border-red-200',
    proses: 'bg-neutral-100 text-neutral-600 border border-border-c',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}
