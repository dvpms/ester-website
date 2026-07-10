'use client';

// src/components/forms/FormKonsultasi.jsx
// Form konsultasi umum dengan validasi react-hook-form.
// Honeypot field untuk spam protection.
// Submit diteruskan ke Server Action di halaman yang menggunakannya.

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { HiCheckCircle, HiExclamationCircle } from 'react-icons/hi2';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { kawasanList } from '@/data/kawasan';
import { id as textId } from '@/i18n/id';
import { en as textEn } from '@/i18n/en';

/**
 * @param {{
 *   listingSlug?: string,
 *   lang?: 'id'|'en',
 *   onSubmit?: (data: import('@/lib/types').LeadSubmission) => Promise<void>,
 * }} props
 */
export function FormKonsultasi({ listingSlug, lang = 'id', onSubmit }) {
  const text = lang === 'en' ? textEn : textId;
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { nama: '', email: '', telepon: '', kawasan: '', pesan: '', _honeypot: '' } });

  async function handleFormSubmit(data) {
    // Honeypot check — jika diisi, ini bot
    if (data._honeypot) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      /** @type {import('@/lib/types').LeadSubmission} */
      const leadData = {
        nama: data.nama,
        email: data.email,
        telepon: data.telepon,
        listingSlug: listingSlug,
        jenisForm: 'konsultasi',
        preferensi: data.kawasan ? { kawasan: data.kawasan } : undefined,
        pesan: data.pesan,
      };

      if (onSubmit) {
        await onSubmit(leadData);
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
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
      className="flex flex-col gap-5"
    >
      {/* ── Honeypot — hidden dari user, terlihat bot ─── */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('_honeypot')}
        />
      </div>

      {/* Nama */}
      <Input
        id="konsultasi-nama"
        label={text.form.nama}
        placeholder="Nama Lengkap Anda"
        error={errors.nama?.message}
        {...register('nama', {
          required: text.form.required,
          minLength: { value: 2, message: 'Nama minimal 2 karakter' },
        })}
      />

      {/* Email */}
      <Input
        id="konsultasi-email"
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
        id="konsultasi-telepon"
        type="tel"
        label={text.form.telepon}
        placeholder={text.form.phonePlaceholder}
        error={errors.telepon?.message}
        {...register('telepon', {
          required: text.form.required,
          minLength: { value: 9, message: 'Nomor telepon tidak valid' },
        })}
      />

      {/* Kawasan select */}
      <div className="flex flex-col gap-1">
        <label htmlFor="konsultasi-kawasan" className="text-sm font-semibold text-neutral-900 font-sans">
          {text.form.kawasan}
        </label>
        <select
          id="konsultasi-kawasan"
          className="w-full px-4 py-3 text-sm font-sans bg-white border border-neutral-600 rounded-btn text-neutral-900 hover:border-remax-red focus:outline-none focus:ring-2 focus:ring-remax-red focus:border-remax-red transition-all"
          {...register('kawasan')}
        >
          <option value="">-- Pilih Kawasan --</option>
          {kawasanList.map((k) => (
            <option key={k.id} value={k.id}>{k.nama}</option>
          ))}
        </select>
      </div>

      {/* Pesan */}
      <Input
        id="konsultasi-pesan"
        label={text.form.pesan}
        placeholder={text.form.messagePlaceholder}
        multiline
        rows={4}
        error={errors.pesan?.message}
        {...register('pesan')}
      />

      {/* Privacy note */}
      <p className="text-xs text-neutral-600 font-sans">{text.form.privacy}</p>

      {/* Submit button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={isSubmitting}
      >
        {isSubmitting ? text.common.loading : text.cta.consult}
      </Button>

      {/* Feedback messages */}
      {submitStatus === 'success' && (
        <div className="flex items-start gap-2 p-4 bg-green-50 border border-green-200 rounded-btn text-success text-sm font-sans">
          <HiCheckCircle className="shrink-0 mt-0.5 text-base" />
          {text.form.successMessage}
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-btn text-error text-sm font-sans">
          <HiExclamationCircle className="shrink-0 mt-0.5 text-base" />
          {text.form.errorMessage}
        </div>
      )}
    </form>
  );
}
