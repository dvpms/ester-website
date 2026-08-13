'use client';

// src/components/forms/FormBrosur.jsx
// Form request brosur properti spesifik.
// listingSlug dikirim sebagai hidden field ke Server Action.

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { HiCheckCircle, HiExclamationCircle, HiDocument } from 'react-icons/hi2';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { id as textId } from '@/i18n/id';
import { en as textEn } from '@/i18n/en';
import { submitLead } from '@/app/actions/submitLead';

/**
 * @param {{
 *   listingSlug: string,
 *   lang?: 'id'|'en',
 *   onSubmit?: (data: import('@/lib/types').LeadSubmission) => Promise<void>,
 * }} props
 */
export function FormBrosur({ listingSlug, lang = 'id', onSubmit }) {
  const text = lang === 'en' ? textEn : textId;
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { nama: '', email: '', telepon: '', _honeypot: '' } });

  async function handleFormSubmit(data) {
    if (data._honeypot) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      /** @type {import('@/lib/types').LeadSubmission} */
      const leadData = {
        nama: data.nama,
        email: data.email,
        telepon: data.telepon,
        listingSlug,
        jenisForm: 'brosur',
      };

      if (onSubmit) {
        await onSubmit(leadData);
      } else {
        const res = await submitLead(leadData);
        if (!res?.success) throw new Error(res?.error || 'Failed');
      }

      setSubmitStatus('success');
      reset();
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="flex flex-col gap-4">
      {/* Header form */}
      <div className="flex items-center gap-2 pb-2 border-b border-border-c">
        <HiDocument className="text-remax-red text-lg" />
        <span className="font-sans text-sm font-semibold text-remax-blue">
          {lang === 'en' ? 'Request Property Brochure' : 'Minta Brosur Properti'}
        </span>
      </div>

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input type="text" tabIndex={-1} autoComplete="off" {...register('_honeypot')} />
      </div>

      {/* Nama */}
      <Input
        id="brosur-nama"
        label={text.form.nama}
        placeholder="Nama"
        error={errors.nama?.message}
        {...register('nama', {
          required: text.form.required,
          minLength: { value: 2, message: 'Nama minimal 2 karakter' },
        })}
      />

      {/* Email */}
      <Input
        id="brosur-email"
        type="email"
        label={text.form.email}
        placeholder="email@contoh.com"
        error={errors.email?.message}
        {...register('email', {
          required: text.form.required,
          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: text.form.emailInvalid },
        })}
      />

      {/* Telepon */}
      <Input
        id="brosur-telepon"
        type="tel"
        label={text.form.telepon}
        placeholder={text.form.phonePlaceholder}
        error={errors.telepon?.message}
        {...register('telepon', {
          required: text.form.required,
          minLength: { value: 9, message: 'Nomor telepon tidak valid' },
        })}
      />

      <p className="text-xs text-neutral-600 font-sans">{text.form.privacy}</p>

      <Button type="submit" variant="primary" size="md" fullWidth disabled={isSubmitting}>
        {isSubmitting ? text.common.loading : text.cta.brochure}
      </Button>

      {submitStatus === 'success' && (
        <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-btn text-success text-sm font-sans">
          <HiCheckCircle className="shrink-0 mt-0.5 text-base" />
          <span>
            {lang === 'en'
              ? 'Thank you! The property brochure has been sent to your email.'
              : 'Terima kasih! Brosur properti telah dikirimkan ke email Anda.'}
          </span>
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-btn text-error text-sm font-sans">
          <HiExclamationCircle className="shrink-0 mt-0.5 text-base" />
          {text.form.errorMessage}
        </div>
      )}
    </form>
  );
}
