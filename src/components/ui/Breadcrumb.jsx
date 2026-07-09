// src/components/ui/Breadcrumb.jsx
// Navigasi hierarkis berstandar SEO.
// Menggunakan markup <nav> + <ol> sesuai HTML5 semantic + aksesibilitas ARIA.
// Server Component.

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

/**
 * @param {{
 *   items: Array<{ label: string, href: string }>,
 *   className?: string,
 * }} props
 */
export function Breadcrumb({ items, className = '' }) {
  return (
    <nav aria-label="Breadcrumb" className={`font-sans ${className}`}>
      <ol className="flex flex-wrap items-center gap-1 text-sm text-neutral-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.href} className="flex items-center gap-1">
              {index > 0 && (
                <ChevronRight
                  size={14}
                  className="text-neutral-300 shrink-0"
                  aria-hidden="true"
                />
              )}

              {isLast ? (
                // Item terakhir: teks aktif, bukan link (aria-current)
                <span
                  aria-current="page"
                  className="text-brand-navy font-semibold truncate max-w-[200px]"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-brand-gold transition-colors duration-150 truncate max-w-[160px]"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
