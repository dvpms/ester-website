// src/components/ui/Breadcrumb.jsx
// Navigasi hierarkis berstandar SEO.
// Menggunakan markup <nav> + <ol> sesuai HTML5 semantic + aksesibilitas ARIA.
// Server Component.

import Link from 'next/link';
import { HiChevronRight } from 'react-icons/hi2';

/**
 * @param {{
 *   items: Array<{ label: string, href: string }>,
 *   className?: string,
 * }} props
 */
export function Breadcrumb({ items, className = '' }) {
  return (
    <nav aria-label="Breadcrumb" className={`font-sans ${className}`}>
      <ol className="flex flex-wrap items-center gap-1 text-sm text-neutral-600">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.href} className="flex items-center gap-1">
              {index > 0 && (
                <HiChevronRight
                  className="text-remax-red shrink-0 text-sm"
                  aria-hidden="true"
                />
              )}

              {isLast ? (
                // Item terakhir: teks aktif, bukan link (aria-current)
                <span
                  aria-current="page"
                  className="text-remax-blue font-semibold truncate max-w-[200px]"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-remax-red transition-colors duration-150 truncate max-w-[160px]"
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
