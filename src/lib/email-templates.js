/**
 * Kumpulan template email HTML berdasarkan email-template.md
 */

import { profile } from "@/data/profile";

const AGENT_PROFILE = {
  nama: profile.name,
  telepon: profile.phone,
  email: profile.email,
  websiteUrl: profile.websiteUrl,
  fotoUrl: "/images/esther-profile.jpeg",
};

/**
 * Membungkus konten HTML dengan header dan footer standar REMAX.
 */
function wrapEmail(title, content) {
  return `
    <div style="background:#F5F5F5;padding:40px 20px;">

  <div style="
      max-width:600px;
      margin:0 auto;
      background:#FFFFFF;
      border-radius:12px;
      overflow:hidden;
      box-shadow:0 8px 24px rgba(0,0,0,.08);
      font-family:Arial,Helvetica,sans-serif;
      color:#333333;
    ">

    <!-- HEADER -->
    <div style="
        background:#003DA5;
        padding:22px 32px;
      ">

      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>

          <td width="52" valign="middle">

            <img
              src="/logo/potrait.png"
              alt="REMAX"
              width="42"
              style="display:block;border:0;">

          </td>

          <td valign="middle">

            <div style="
                color:#FFFFFF;
                font-size:24px;
                font-weight:bold;
                line-height:1.2;
              ">
              Esther REMAX
            </div>

            <div style="
                color:#D7E4FF;
                font-size:13px;
                margin-top:2px;
              ">
              Property Consultant
            </div>

          </td>

        </tr>
      </table>

    </div>

    <!-- CONTENT -->
    <div style="padding:40px 36px;">

      <h1 style="
          margin:0 0 20px;
          color:#1A1A1A;
          font-size:28px;
          line-height:1.3;
        ">
        ${title}
      </h1>

      <div style="
          font-size:15px;
          color:#555555;
          line-height:1.8;
        ">
        ${content}
      </div>

    </div>

    <!-- FOOTER -->
    <div style="
        background:#F1EFE8;
        padding:28px 32px;
        border-top:1px solid #E6E2D8;
      ">
      
      <!-- Footer Global -->
      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ccc;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="width: 80px; vertical-align: top; padding-right: 15px;">
              <img src="${AGENT_PROFILE.fotoUrl}" alt="${AGENT_PROFILE.nama}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; display: block;" />
            </td>
            <td style="vertical-align: top; font-size: 12px; color: #888; line-height: 1.5;">
              <strong style="color: #00458C; font-size: 14px;">${AGENT_PROFILE.nama}</strong><br/>
              Konsultan Properti REMAX Future<br/>
              📞 ${AGENT_PROFILE.telepon} <br/>
              ✉ ${AGENT_PROFILE.email} <br/>
              🌐 <a href="${AGENT_PROFILE.websiteUrl}" style="color: #00458C;">${AGENT_PROFILE.websiteUrl}</a>
            </td>
          </tr>
        </table>
        
        <div style="margin-top: 15px; font-size: 11px; color: #aaa; line-height: 1.4;">
          Email ini dikirim secara otomatis oleh sistem.<br/>
          Apabila Anda menerima email ini karena pernah menghubungi kami melalui website, Anda dapat mengabaikannya jika sudah tidak memerlukan informasi lebih lanjut.
        </div>
      </div>

    </div>

  </div>

</div>
  `;
}

// ==========================================
// 1. Notifikasi Lead Baru (Ke Agent)
// ==========================================
export function getLeadNotificationHtml(data) {
  const waktuMasuk = new Date().toLocaleString("id-ID");
  const waUrl = data.telepon
    ? `https://wa.me/${data.telepon.replace(/\D/g, "")}`
    : "#";

  const content = `
    <p>Halo,</p>
    <p>Anda menerima lead baru dari website. Berikut informasi yang telah dikirimkan oleh calon klien.</p>
    
    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
    
    <h2 style="color: #00458C; font-size: 18px; margin-bottom: 10px;">Informasi Lead</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; width: 40%;"><strong>Nama</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.nama || "-"}</td></tr>
      <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.email || "-"}</td></tr>
      <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Nomor Telepon</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.telepon || "-"}</td></tr>
      <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Jenis Form</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.jenisForm || "-"}</td></tr>
      <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Listing</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.listingSlug || "-"}</td></tr>
      <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Kawasan / Pesan</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.pesan || data.preferensi?.kawasan || "-"}</td></tr>
      <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Tanggal Janji</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.tanggalSurvei || "-"}</td></tr>
      <tr><td style="padding: 8px 0;"><strong>Waktu Masuk</strong></td><td style="padding: 8px 0;">${waktuMasuk}</td></tr>
    </table>
    
    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
    
    <p>
      <a href="${waUrl}" style="background-color: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">
        Chat WhatsApp Sekarang
      </a>
    </p>
    
    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
    <p style="font-style: italic; color: #666;">Semakin cepat Anda menghubungi calon klien, semakin besar peluang terjadinya transaksi.</p>
  `;

  return wrapEmail("Lead Baru Masuk", content);
}

// ==========================================
// 2. Konfirmasi Pesan Diterima (Ke Klien)
// ==========================================
export function getContactConfirmationHtml(data) {
  const waUrl = `https://wa.me/${AGENT_PROFILE.telepon.replace(/\D/g, "")}`;

  const content = `
    <p>Halo <strong>${data.nama}</strong>,</p>
    <p>Terima kasih telah menghubungi kami melalui website.</p>
    <p>Pesan Anda telah kami terima dengan baik dan akan kami respons maksimal dalam <strong>1x24 jam kerja</strong>.</p>
    <p>Jika kebutuhan Anda bersifat mendesak, silakan menghubungi kami secara langsung melalui WhatsApp.</p>
    
    <div style="margin: 30px 0;">
      <a href="${waUrl}" style="background-color: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">
        Chat WhatsApp Sekarang
      </a>
    </div>
    
    <p>Salam,</p>
    <p>
      <strong>${AGENT_PROFILE.nama}</strong><br/>
      Konsultan Properti REMAX
    </p>
  `;

  return wrapEmail("Terima Kasih Telah Menghubungi Kami", content);
}

// ==========================================
// 3. Konfirmasi Janji Temu (Ke Klien)
// ==========================================
export function getSurveyConfirmationHtml(data) {
  const waUrl = `https://wa.me/${AGENT_PROFILE.telepon.replace(/\D/g, "")}`;

  const content = `
    <p>Halo <strong>${data.nama}</strong>,</p>
    <p>Terima kasih. Janji temu Anda telah berhasil kami jadwalkan.</p>
    
    <h2 style="color: #00458C; font-size: 18px; margin-top: 30px;">Detail Janji</h2>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; width: 30%;"><strong>Tanggal</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.tanggalSurvei}</td></tr>
      <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Topik/Kawasan</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.preferensi?.kawasan || "Survei Properti"}</td></tr>
      ${data.catatan ? `<tr><td style="padding: 8px 0;"><strong>Catatan</strong></td><td style="padding: 8px 0;">${data.catatan}</td></tr>` : ""}
    </table>
    
    <p>Kami akan mengirimkan pengingat satu hari sebelum jadwal berlangsung.</p>
    <p>Apabila ingin mengubah jadwal, silakan hubungi kami melalui WhatsApp.</p>
    
    <div style="margin: 30px 0;">
      <a href="${waUrl}" style="background-color: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">
        Hubungi via WhatsApp
      </a>
    </div>
    
    <p>Salam,</p>
    <p>
      <strong>${AGENT_PROFILE.nama}</strong><br/>
      Konsultan Properti REMAX
    </p>
  `;

  return wrapEmail("Janji Temu Berhasil Dijadwalkan", content);
}

// ==========================================
// 4. Pengiriman Brosur & Pricelist (Ke Klien)
// ==========================================
export function getBrochureHtml(data, listingDetails) {
  const waUrl = `https://wa.me/${AGENT_PROFILE.telepon.replace(/\D/g, "")}`;

  // Asumsi listingDetails berisi nama, lokasi, jenis, harga, brosurUrl
  const l = listingDetails || {};

  const content = `
    <p>Halo <strong>${data.nama}</strong>,</p>
    <p>Terima kasih atas ketertarikan Anda terhadap properti berikut.</p>
    <p><strong>${l.nama || data.listingSlug}</strong></p>
    <p>Kami telah menyiapkan brosur dan pricelist terbaru yang dapat langsung Anda unduh.</p>
    
    <h2 style="color: #00458C; font-size: 18px; margin-top: 30px;">Informasi Properti</h2>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; width: 30%;"><strong>Nama Properti</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${l.nama || "-"}</td></tr>
      <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Lokasi</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${l.lokasi || "-"}</td></tr>
      <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Jenis Properti</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${l.jenis || "-"}</td></tr>
      <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Harga Mulai</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${l.harga || "-"}</td></tr>
    </table>
    
    <div style="margin: 30px 0;">
      <a href="${l.brosurUrl || "#"}" style="background-color: #E11B22; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold; margin-bottom: 15px;">
        Unduh Brosur PDF
      </a>
      <p style="margin: 0; color: #666; font-size: 14px;">Jika Anda memiliki pertanyaan mengenai properti ini atau ingin melakukan survei lokasi, silakan menghubungi kami.</p>
    </div>
    
    <div style="margin: 30px 0;">
      <a href="${waUrl}" style="background-color: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">
        Chat Konsultan
      </a>
    </div>
    
    <p>Salam,</p>
    <p>
      <strong>${AGENT_PROFILE.nama}</strong><br/>
      Konsultan Properti REMAX
    </p>
  `;

  return wrapEmail("Brosur & Pricelist Siap Diunduh", content);
}

// ==========================================
// 5. Reminder Janji Temu (Ke Klien)
// ==========================================
export function getSurveyReminderHtml(data) {
  const waUrl = `https://wa.me/${AGENT_PROFILE.telepon.replace(/\D/g, "")}`;

  const content = `
    <p>Halo <strong>${data.nama}</strong>,</p>
    <p>Kami ingin mengingatkan bahwa besok Anda memiliki jadwal konsultasi/survei bersama kami.</p>
    
    <h2 style="color: #00458C; font-size: 18px; margin-top: 30px;">Jadwal</h2>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; width: 30%;"><strong>Tanggal</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.tanggalSurvei}</td></tr>
      <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Topik</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.preferensi?.kawasan || "Survei Properti"}</td></tr>
    </table>
    
    <p>Kami menantikan pertemuan dengan Anda.</p>
    <p>Jika ingin melakukan penjadwalan ulang, silakan hubungi kami.</p>
    
    <div style="margin: 30px 0;">
      <a href="${waUrl}" style="background-color: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">
        Hubungi via WhatsApp
      </a>
    </div>
    
    <p>Salam,</p>
    <p>
      <strong>${AGENT_PROFILE.nama}</strong><br/>
      Konsultan Properti REMAX
    </p>
  `;

  return wrapEmail("Pengingat Janji Temu", content);
}

// ==========================================
// 6. Broadcast Email — Property Highlight (Ke Klien)
// ==========================================
export function getBroadcastHtml(properties, articles) {
  const waUrl = `https://wa.me/${AGENT_PROFILE.telepon.replace(/\D/g, "")}`;

  let propertiesHtml = properties
    .map(
      (p) => `
    <div style="margin-bottom: 24px; border: 1px solid #E6E2D8; border-radius: 8px; overflow: hidden; background: #FFFFFF; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
      ${p.gambar ? `<img src="${p.gambar}" alt="${p.nama}" style="width: 100%; height: 200px; object-fit: cover; display: block;" />` : `<div style="width: 100%; height: 12px; background-color: #003DA5;"></div>`}
      <div style="padding: 20px;">
        <h3 style="color: #003DA5; margin: 0 0 8px 0; font-size: 18px; line-height: 1.3;">${p.nama}</h3>
        <p style="margin: 0 0 12px 0; font-size: 14px; color: #666666;">
          📍 ${p.lokasi}
        </p>
        <p style="margin: 0 0 16px 0; color: #E11B22; font-weight: bold; font-size: 18px;">${p.harga}</p>
        <p style="margin: 0 0 24px 0; font-size: 14px; color: #555555; line-height: 1.6;">${p.ringkasan}</p>
        <a href="${p.url}" style="display: inline-block; background-color: #003DA5; color: #FFFFFF; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px; text-align: center;">
          Lihat Detail Properti
        </a>
      </div>
    </div>
  `,
    )
    .join("");

  let articlesHtml = articles
    .map(
      (a) => `
    <li style="margin-bottom: 10px;"><a href="${a.url}" style="color: #333; text-decoration: none;">${a.judul}</a></li>
  `,
    )
    .join("");

  const content = `
    <p style="font-size: 16px;">Temukan properti terbaik di lokasi strategis dengan harga kompetitif.</p>
    
    <h2 style="color: #E11B22; font-size: 20px; margin-top: 30px;">Properti Unggulan</h2>
    ${propertiesHtml}
    
    <h2 style="color: #E11B22; font-size: 20px; margin-top: 30px;">Update & Tips Properti</h2>
    <ul style="padding-left: 20px;">
      ${articlesHtml}
    </ul>
    
    <h2 style="color: #00458C; font-size: 18px; margin-top: 40px;">Butuh Konsultasi?</h2>
    <p>Saya siap membantu Anda memilih properti sesuai kebutuhan maupun tujuan investasi. Silakan hubungi saya kapan saja melalui WhatsApp.</p>
    
    <div style="margin: 30px 0;">
      <a href="${waUrl}" style="background-color: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">
        Chat via WhatsApp
      </a>
    </div>
    
    <p>Salam,</p>
    <p>
      <strong>${AGENT_PROFILE.nama}</strong><br/>
      Konsultan Properti REMAX
    </p>
  `;

  return wrapEmail("Properti Pilihan Minggu Ini", content);
}
