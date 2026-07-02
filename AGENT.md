# AGENT.md
# Konstitusi Pengembangan AI — Website Pemesanan Tiket Pendakian Gunung Lawu

**Versi:** 1.0
**Tanggal:** 2 Juli 2026
**Berlaku untuk:** Seluruh AI coding assistant (Claude Code, Copilot, Cursor, dll.) yang mengerjakan repository ini

---

## 0. Tujuan Dokumen

Dokumen ini adalah **aturan wajib** yang harus diikuti oleh AI assistant apa pun saat menulis, mengubah, atau meninjau kode di proyek ini. Tujuannya:

1. Mencegah AI membuat keputusan arsitektur secara acak/asal-tebak.
2. Memastikan setiap fitur yang dibangun konsisten dengan **PRD-Pemesanan-Tiket-Gunung-Lawu.md** (source of truth requirement) dan skema database di **Bagian 9 PRD** (source of truth database).
3. Menjaga gaya kode, struktur folder, dan pola desain tetap seragam meskipun dikerjakan lintas sesi/lintas AI tool.

> **Aturan tertinggi:** Jika ada instruksi dari pengguna yang bertentangan dengan dokumen ini atau dengan PRD, AI **wajib bertanya konfirmasi** terlebih dahulu sebelum mengeksekusi — bukan langsung menuruti secara diam-diam. Jangan pernah "menebak" maksud pengguna untuk hal yang berkaitan dengan skema data, alur pembayaran, atau keamanan.

---

## 1. Sumber Kebenaran (Source of Truth)

Urutan prioritas dokumen ketika ada ketidaksesuaian:

1. **PRD-Pemesanan-Tiket-Gunung-Lawu.md** — definisi fitur, requirement ID (BR-xx, TK-xx, PM-xx, IN-xx, BT-xx, CS-xx, AD-xx), dan skema database (Bagian 9).
2. **AGENT.md (dokumen ini)** — aturan teknis & konvensi kode.
3. Kode yang sudah ada di repository (existing pattern menang atas preferensi gaya pribadi AI).

**AI dilarang:**
- Menambah tabel, kolom, atau enum baru ke database tanpa terlebih dahulu memperbarui Bagian 9 PRD.
- Menambah fitur yang tidak ada requirement ID-nya di PRD tanpa konfirmasi eksplisit dari pengguna.
- Mengubah alur pembayaran (WhatsApp redirect) menjadi payment gateway atau metode lain tanpa instruksi eksplisit — ini adalah keputusan produk yang sudah didokumentasikan, bukan asumsi teknis.

---

## 2. Tech Stack (Wajib, Tidak Boleh Diganti Tanpa Persetujuan)

| Layer | Teknologi |
|---|---|
| Framework | Next.js 16 (App Router) |
| Bahasa | TypeScript (strict mode wajib aktif) |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (admin only) |
| Storage | Supabase Storage |
| Styling | Tailwind CSS |
| Validasi | Zod |
| Form | React Hook Form |
| DB Tooling | pgAdmin 4 (untuk inspeksi manual, bukan untuk membuat skema baru di luar migration) |

AI **tidak boleh** menambahkan library baru (state management, UI kit, ORM tambahan, dsb.) tanpa menyebutkan alasan dan meminta konfirmasi, kecuali untuk dev-dependency kecil yang jelas dibutuhkan (mis. `@types/*`).

---

## 3. Struktur Folder Wajib

```
app/
  (public)/
    page.tsx                    → Beranda (6.1)
    tentang-kami/page.tsx        → Tentang Kami (6.2)
    pemesanan/page.tsx           → Form Pemesanan (6.3)
    informasi/page.tsx           → Informasi jalur (6.4)
    bantuan/page.tsx             → Bantuan (6.5)
    cek-status/page.tsx          → Cek Status Pemesanan (6.6)
  (admin)/
    admin/
      login/page.tsx
      dashboard/page.tsx         → Dashboard Admin (6.7)
      pemesanan/[id]/page.tsx
  api/
    pemesanan/route.ts           → POST create pemesanan
    cek-status/route.ts          → POST panggil RPC cek_status_pemesanan
    bantuan/route.ts             → POST kirim pesan bantuan
    admin/
      pemesanan/route.ts         → GET list, PATCH update status
      kuota/route.ts

lib/
  supabase/
    client.ts                    → Supabase client (browser)
    server.ts                    → Supabase client (server component / route handler)
    admin.ts                     → Service role client (HANYA dipakai di server, tidak boleh di-import client-side)
  services/
    pemesanan.service.ts         → Semua logika bisnis pemesanan
    kuota.service.ts
    whatsapp.service.ts          → Generate link & pesan WA
    email.service.ts
  validations/
    pemesanan.schema.ts          → Zod schema
    bantuan.schema.ts
  types/
    database.types.ts            → Generated types dari Supabase CLI (`supabase gen types typescript`)

components/
  ui/                            → Komponen generik (button, input, dsb.)
  forms/                         → Form spesifik fitur
  layout/                        → Navbar, footer

docs/
  PRD-Pemesanan-Tiket-Gunung-Lawu.md
  AGENT.md
```

**Aturan:**
- Logika bisnis **wajib** berada di `lib/services/`, bukan langsung di Route Handler. Route Handler hanya bertugas: parsing request → validasi → panggil service → format response.
- Tidak boleh ada query Supabase langsung di dalam komponen React (`app/**/page.tsx`) untuk operasi tulis (insert/update/delete). Operasi baca sederhana di Server Component diperbolehkan, tapi tetap lewat fungsi di `lib/services/` agar reusable.
- Service role key Supabase (`lib/supabase/admin.ts`) **hanya boleh dipakai di server** (Route Handler/Server Action), tidak pernah di-expose ke client bundle.

---

## 4. Konvensi Penamaan

| Item | Konvensi | Contoh |
|---|---|---|
| Folder & file | kebab-case | `cek-status/`, `pemesanan.service.ts` |
| Komponen React | PascalCase | `BookingForm.tsx` |
| Fungsi & variabel | camelCase | `getKuotaByJalur()` |
| Tabel & kolom database | snake_case | `jadwal_kuota`, `no_hp_pemesan` |
| Konstanta | UPPER_SNAKE_CASE | `MAX_PENDAKI_PER_BOOKING` |
| Enum database | snake_case (sesuai Bagian 9.2 PRD) | `menunggu_konfirmasi` |

Jangan mencampur gaya penamaan (mis. `getKuota_ByJalur`) — konsistensi lebih penting daripada preferensi gaya AI pada suatu sesi.

---

## 5. Standar Response API (Route Handler)

Semua Route Handler **wajib** mengembalikan format response yang konsisten:

```typescript
// Sukses
{
  success: true,
  data: { ... },
  message?: string
}

// Gagal
{
  success: false,
  error: {
    code: string,       // mis. "KUOTA_PENUH", "VALIDATION_ERROR"
    message: string      // pesan yang aman ditampilkan ke pengguna (Bahasa Indonesia)
  }
}
```

AI dilarang membuat format response ad-hoc yang berbeda antar endpoint. Jika endpoint baru dibuat, ikuti format ini.

---

## 6. Aturan Validasi

- Setiap input dari form publik **wajib** divalidasi dengan Zod di dua tempat: client (React Hook Form resolver) DAN server (Route Handler), sebelum data disentuh oleh service layer. Jangan percaya validasi client saja.
- Skema Zod harus disimpan di `lib/validations/`, bukan didefinisikan inline di dalam komponen atau Route Handler.
- Validasi harus selaras dengan constraint database (Bagian 9.3 PRD) — misal `jumlah_pendaki > 0`, `nik` panjang 16 karakter, dsb.

---

## 7. Aturan Interaksi dengan Database

1. **Semua perubahan skema** (tabel, kolom, enum, function, trigger, RLS policy) harus ditulis sebagai file migration SQL di `supabase/migrations/`, bukan dijalankan manual sekali pakai lewat SQL Editor tanpa dicatat.
2. **Jangan pernah menonaktifkan RLS** pada tabel manapun untuk "mempermudah development". Jika ada kebutuhan akses baru, tambahkan policy baru yang spesifik, jangan matikan RLS.
3. Operasi yang butuh bypass RLS (mis. admin service) **wajib** memakai service role key di server, bukan mematikan RLS di level tabel.
4. Query kompleks (join multi-tabel) dianjurkan dibungkus sebagai Postgres Function/RPC jika dipanggil berulang dari banyak tempat (mengikuti pola `cek_status_pemesanan` di Bagian 9.6 PRD), bukan disusun ulang manual di setiap Route Handler.
5. Jangan membuat tabel `pembayaran` atau menambah payment gateway — ini adalah keputusan desain final yang sudah didokumentasikan di PRD Bagian 8 & 11.

---

## 8. Aturan Alur Bisnis Kritis (Tidak Boleh Disederhanakan Sepihak)

### 8.1 Alur Pemesanan & Pembayaran
Wajib mengikuti urutan di PRD Bagian 6.3 secara utuh:
1. Insert `pemesanan` (kode booking & kuota di-generate/divalidasi otomatis oleh trigger database — AI **tidak boleh** menduplikasi logika ini di application layer).
2. Redirect ke WhatsApp dengan pesan pre-filled sesuai format di PRD.
3. Status berubah hanya lewat aksi admin di Dashboard Admin (6.7), tidak ada endpoint publik yang bisa langsung mengubah status pemesanan menjadi `terkonfirmasi`.

### 8.2 Kuota
Jangan implementasi ulang logika pengurangan/penambahan kuota di service layer aplikasi — ini sudah menjadi tanggung jawab trigger database (`update_kuota_on_pemesanan`, `release_kuota_on_cancel`, lihat PRD 9.5) demi mencegah race condition. Service layer hanya perlu menangani error yang dilempar trigger (mis. kuota penuh) dan menampilkannya dengan format error yang sesuai Bagian 5.

### 8.3 Keamanan Data Pendaki
Tabel `pemesanan` dan `pendaki` tertutup untuk `select` publik (RLS `using (false)`). AI **dilarang** membuat endpoint atau query yang membuka akses select langsung ke kedua tabel ini untuk role publik/anon — akses hanya lewat RPC `cek_status_pemesanan` yang sudah memvalidasi kode booking + no HP.

---

## 9. Aturan Git & Commit

- Commit message berbahasa Indonesia atau Inggris, konsisten — pilih satu di awal proyek dan pertahankan.
- Format: `<tipe>: <deskripsi singkat>` — tipe: `feat`, `fix`, `refactor`, `docs`, `chore`, `style`.
  Contoh: `feat: tambah validasi kuota pada form pemesanan`
- Satu commit = satu perubahan logis. Jangan menggabungkan perubahan skema database dengan perubahan UI yang tidak terkait dalam satu commit.
- AI **tidak boleh** melakukan `git push --force` ke branch utama tanpa instruksi eksplisit.

---

## 10. Checklist Sebelum AI Mengklaim Sebuah Fitur "Selesai"

AI wajib memverifikasi seluruh poin berikut sebelum menyatakan sebuah task selesai:

- [ ] Requirement ID terkait di PRD (mis. `PM-03`) benar-benar terpenuhi, bukan hanya sebagian.
- [ ] Validasi Zod ada di client dan server.
- [ ] Response API mengikuti format standar (Bagian 5).
- [ ] Tidak ada logika bisnis yang bocor ke dalam komponen React atau Route Handler (harus di service layer).
- [ ] Tidak ada RLS yang dinonaktifkan atau dilewati secara tidak semestinya.
- [ ] Perubahan skema database (jika ada) sudah dicatat sebagai file migration dan disinkronkan ke PRD Bagian 9.
- [ ] Penamaan file/variabel mengikuti konvensi Bagian 4.
- [ ] Tidak menambahkan dependency baru tanpa alasan yang disebutkan ke pengguna.

Jika ada satu poin saja yang belum terpenuhi, AI **wajib melaporkan ketidaklengkapan tersebut secara eksplisit** ke pengguna — bukan diam-diam menandai task sebagai selesai.

---

## 11. Sikap AI Saat Ambiguitas

Jika instruksi dari pengguna kurang jelas atau berpotensi menyimpang dari PRD/AGENT.md:

1. **Jangan menebak diam-diam** dan langsung menulis kode berdasarkan asumsi yang tidak disampaikan.
2. Nyatakan asumsi yang akan diambil secara eksplisit sebelum atau bersamaan dengan implementasi, khususnya untuk hal yang menyentuh skema data, keamanan, atau alur pembayaran.
3. Jika ambiguitas menyangkut keputusan produk (bukan teknis), tanyakan ke pengguna alih-alih memutuskan sendiri.
4. Konsistensi lebih diutamakan daripada kecepatan — lebih baik bertanya sebentar daripada membangun fitur yang harus dibongkar ulang karena salah asumsi.

---

*Dokumen ini bersifat living document. Setiap AI assistant yang bekerja di repository ini wajib membaca dokumen ini sebelum memulai task apa pun, dan wajib memperbarui dokumen ini (dengan sepengetahuan pengguna) jika ada keputusan arsitektur baru yang perlu didokumentasikan.*
