'use client';

// src/components/ui/Button.jsx
// Atomic button komponen — support render sebagai <button> atau <Link>.
// Variants: primary, secondary, outline | Sizes: sm, md, lg

import Link from 'next/link';

/**
 * @param {{
 *   children: React.ReactNode,
 *   variant?: 'primary'|'secondary'|'outline',
 *   size?: 'sm'|'md'|'lg',
 *   href?: string,
 *   leftIcon?: React.ReactNode,
 *   rightIcon?: React.ReactNode,
 *   fullWidth?: boolean,
 *   disabled?: boolean,
 *   type?: 'button'|'submit'|'reset',
 *   onClick?: () => void,
 *   className?: string,
 * }} props
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  className = '',
}) {
  const baseStyles = [
    'inline-flex items-center justify-center gap-2',
    'font-sans font-semibold transition-all duration-200',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    fullWidth ? 'w-full' : '',
  ].join(' ');

  const variantStyles = {
    primary: [
      'bg-brand-gold text-brand-navy',
      'hover:brightness-110 active:brightness-95',
      'shadow-card hover:shadow-card-hover',
    ].join(' '),
    secondary: [
      'bg-brand-navy text-neutral-50',
      'hover:bg-brand-navy-light active:opacity-90',
      'shadow-card hover:shadow-card-hover',
    ].join(' '),
    outline: [
      'bg-transparent text-brand-gold',
      'border-2 border-brand-gold',
      'hover:bg-brand-gold hover:text-brand-navy active:opacity-90',
    ].join(' '),
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm rounded-btn',
    md: 'px-6 py-3 text-body rounded-btn',
    lg: 'px-8 py-4 text-h3 rounded-card',
  };

  const combinedClassName = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className,
  ].join(' ');

  const content = (
    <>
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
    >
      {content}
    </button>
  );
}
