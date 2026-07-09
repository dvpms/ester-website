'use client';

// src/components/ui/Input.jsx
// Atomic input/textarea komponen dengan design states.
// forwardRef untuk kompatibilitas dengan react-hook-form register().

import { forwardRef } from 'react';

/**
 * @type {React.ForwardRefExoticComponent<{
 *   label?: string,
 *   error?: string,
 *   hint?: string,
 *   multiline?: boolean,
 *   rows?: number,
 *   className?: string,
 *   id: string,
 *   [key: string]: any,
 * } & React.RefAttributes<HTMLInputElement | HTMLTextAreaElement>>}
 */
export const Input = forwardRef(function Input(
  { label, error, hint, multiline = false, rows = 4, className = '', id, ...rest },
  ref
) {
  const fieldBaseStyles = [
    'w-full px-4 py-3 font-sans text-body text-neutral-900',
    'bg-white border rounded-btn transition-all duration-150',
    'placeholder:text-neutral-500',
    'focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold',
    'disabled:bg-neutral-100 disabled:text-neutral-500 disabled:cursor-not-allowed',
  ].join(' ');

  const errorStyles = 'border-error focus:ring-error focus:border-error';
  const defaultBorderStyles = 'border-neutral-300 hover:border-neutral-500';

  const fieldStyles = [
    fieldBaseStyles,
    error ? errorStyles : defaultBorderStyles,
    className,
  ].join(' ');

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-semibold text-neutral-700 font-sans"
        >
          {label}
        </label>
      )}

      {multiline ? (
        <textarea
          id={id}
          ref={ref}
          rows={rows}
          className={`${fieldStyles} resize-none`}
          {...rest}
        />
      ) : (
        <input
          id={id}
          ref={ref}
          className={fieldStyles}
          {...rest}
        />
      )}

      {/* Error atau hint — hanya tampilkan salah satu */}
      {error && (
        <p className="text-xs text-error font-sans" role="alert">
          {error}
        </p>
      )}
      {!error && hint && (
        <p className="text-xs text-neutral-500 font-sans">{hint}</p>
      )}
    </div>
  );
});
