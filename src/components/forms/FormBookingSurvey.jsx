'use client';

// src/components/forms/FormBookingSurvey.jsx
// Form booking survei properti: nama, email, telepon, kawasan, tanggal, catatan.
// Validasi tanggal: minimal hari ini + 1.

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { HiCheckCircle, HiExclamationCircle, HiCalendarDays } from 'react-icons/hi2';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { kawasanList } from '@/data/kawasan';
import { id as textId } from '@/i18n/id';
import { en as textEn } from '@/i18n/en';
import { submitLead } from '@/app/actions/submitLead';

/** Dapatkan tanggal minimum survei (besok) dalam format YYYY-MM-DD */
function getMinSurveyDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}

/**
 * @param {{
 *   lang?: 'id'|'en',
 *   onSubmit?: (data: import('@/lib/types').LeadSubmission & { tanggalSurvei: string, catatan?: string }) => Promise<void>,
 * }} props
 */
export function FormBookingSurvey({ lang = 'id', onSubmit }) {
  const text = lang === 'en' ? textEn : textId;
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const minDate = getMinSurveyDate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nama: '', email: '', telepon: '',
      kawasan: '', tanggalSurvei: '', catatan: '',
      _honeypot: '',
    },
  });

  async function handleFormSubmit(data) {
    if (data._honeypot) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      /** @type {import('@/lib/types').LeadSubmission & { tanggalSurvei: string }} */
      const leadData = {
        nama: data.nama,
        email: data.email,
        telepon: data.telepon,
        jenisForm: 'booking-survey',
        preferensi: data.kawasan ? { kawasan: data.kawasan } : undefined,
        tanggalSurvei: data.tanggalSurvei,
        catatan: data.catatan,
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
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-border-c">
        <HiCalendarDays className="text-remax-red text-lg" />
        <span className="font-sans text-sm font-semibold text-remax-blue">
          {lang === 'en' ? 'Book a Property Survey' : 'Booking Survei Properti'}
        </span>
      </div>

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input type="text" tabIndex={-1} autoComplete="off" {...register('_honeypot')} />
      </div>

      {/* Nama */}
      <Input
        id="survey-nama"
        label={text.form.nama}
        placeholder="Nama Lengkap"
        error={errors.nama?.message}
        {...register('nama', {
          required: text.form.required,
          minLength: { value: 2, message: 'Nama minimal 2 karakter' },
        })}
      />

      {/* Email */}
      <Input
        id="survey-email"
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
        id="survey-telepon"
        type="tel"
        label={text.form.telepon}
        placeholder={text.form.phonePlaceholder}
        error={errors.telepon?.message}
        {...register('telepon', {
          required: text.form.required,
          minLength: { value: 9, message: 'Nomor telepon tidak valid' },
        })}
      />

      {/* Kawasan */}
      <div className="flex flex-col gap-1">
        <label htmlFor="survey-kawasan" className="text-sm font-semibold text-neutral-900 font-sans">
          {text.form.kawasan}
        </label>
        <select
          id="survey-kawasan"
          className="w-full px-4 py-3 text-sm font-sans bg-white border border-neutral-600 rounded-btn text-neutral-900 hover:border-remax-red focus:outline-none focus:ring-2 focus:ring-remax-red focus:border-remax-red transition-all"
          {...register('kawasan', { required: text.form.required })}
        >
          <option value="">-- Pilih Kawasan --</option>
          {kawasanList.map((k) => (
            <option key={k.id} value={k.id}>{k.nama}</option>
          ))}
        </select>
        {errors.kawasan && (
          <p className="text-xs text-error font-sans" role="alert">{errors.kawasan.message}</p>
        )}
      </div>

      {/* Tanggal survei */}
      <Input
        id="survey-tanggal"
        type="date"
        label={lang === 'en' ? 'Preferred Survey Date' : 'Tanggal Survei yang Diinginkan'}
        min={minDate}
        error={errors.tanggalSurvei?.message}
        {...register('tanggalSurvei', {
          required: text.form.required,
          min: { value: minDate, message: 'Tanggal minimal besok' },
        })}
      />

      {/* Catatan */}
      <Input
        id="survey-catatan"
        label={lang === 'en' ? 'Additional Notes' : 'Catatan Tambahan (opsional)'}
        placeholder={lang === 'en' ? 'e.g. preferred time, specific requirements...' : 'mis. jam yang disukai, kebutuhan spesifik...'}
        multiline
        rows={3}
        {...register('catatan')}
      />

      <p className="text-xs text-neutral-600 font-sans">{text.form.privacy}</p>

      <Button type="submit" variant="primary" size="lg" fullWidth disabled={isSubmitting}>
        {isSubmitting ? text.common.loading : text.cta.bookSurvey}
      </Button>

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
