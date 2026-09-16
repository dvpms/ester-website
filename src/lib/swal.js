// src/lib/swal.js
// Konfigurasi SweetAlert2 terpadu dengan palet warna brand Esther REMAX

import Swal from 'sweetalert2';

/**
 * Notifikasi popup toast kecil di sudut kanan atas
 */
export const toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toastEl) => {
    toastEl.onmouseenter = Swal.stopTimer;
    toastEl.onmouseleave = Swal.resumeTimer;
  },
});

/**
 * Dialog sukses
 */
export function showSuccessAlert(title, text = '') {
  return Swal.fire({
    icon: 'success',
    title,
    text,
    confirmButtonColor: '#003da5', // remax-blue
    confirmButtonText: 'Selesai',
  });
}

/**
 * Dialog peringatan / info
 */
export function showWarningAlert(title, text = '') {
  return Swal.fire({
    icon: 'warning',
    title,
    text,
    confirmButtonColor: '#003da5',
    confirmButtonText: 'Mengerti',
  });
}

/**
 * Dialog error
 */
export function showErrorAlert(title = 'Terjadi Kendala', text = '') {
  return Swal.fire({
    icon: 'error',
    title,
    text,
    confirmButtonColor: '#003da5',
    confirmButtonText: 'Tutup',
  });
}

/**
 * Dialog konfirmasi (misal untuk aksi hapus)
 */
export async function showConfirmDialog({
  title = 'Apakah Anda yakin?',
  text = 'Tindakan ini tidak dapat dibatalkan.',
  confirmText = 'Ya, Hapus',
  cancelText = 'Batal',
  isDanger = true,
}) {
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: isDanger ? '#da291c' : '#003da5', // remax-red atau remax-blue
    cancelButtonColor: '#5f5e5a', // neutral-600
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true,
  });

  return result.isConfirmed;
}

export default Swal;
