# Product Requirements Document (PRD)
# Website Pemesanan Tiket Pendakian Gunung Lawu

**Versi Dokumen:** 1.1
**Tanggal:** 2 Juli 2026
**Status:** Draft

---

## 1. Ringkasan Eksekutif

Website ini dibangun untuk memfasilitasi proses pemesanan tiket pendakian Gunung Lawu secara online, menggantikan proses manual/offline yang selama ini digunakan oleh basecamp pendakian. Website akan menyediakan informasi resmi seputar jalur pendakian, profil pengelola, serta layanan bantuan bagi calon pendaki.

---

## 2. Latar Belakang Masalah

- Proses pendaftaran pendakian Gunung Lawu di banyak basecamp masih dilakukan secara manual (datang langsung atau via WhatsApp), sehingga rawan antrean panjang dan human error dalam pencatatan data.
- Calon pendaki kesulitan mendapatkan informasi jalur, kuota harian, dan syarat pendakian secara terpusat.
- Tidak ada sistem yang mencatat riwayat transaksi dan data pendaki secara digital dan dapat diaudit.

---

## 3. Tujuan Produk

1. Menyediakan platform pemesanan tiket pendakian Gunung Lawu yang cepat, transparan, dan dapat diakses kapan saja.
2. Memberikan informasi lengkap dan akurat mengenai jalur pendakian dan ketentuan pendakian.
3. Mempermudah komunikasi antara calon pendaki dan pengelola melalui fitur bantuan.
4. Mendigitalisasi data pemesanan untuk kebutuhan rekapitulasi dan pelaporan pengelola.

---

## 4. Target Pengguna

| Persona | Deskripsi | Kebutuhan Utama |
|---|---|---|
| Pendaki Umum | Wisatawan/pendaki domestik usia 17–40 tahun | Pemesanan cepat, info jalur jelas, harga transparan |
| Pendaki Rombongan/Komunitas | Kelompok pendakian (5–20 orang) | Pemesanan massal, konfirmasi kuota |
| Admin/Pengelola Basecamp | Petugas basecamp Gunung Lawu | Verifikasi tiket, rekap data, kelola kuota |

---

## 5. Ruang Lingkup Produk

Produk ini mencakup **6 fitur utama** (sisi pengunjung) sebagai berikut:

### 5.1 Beranda
### 5.2 Tentang Kami
### 5.3 Pemesanan
### 5.4 Informasi
### 5.5 Bantuan
### 5.6 Cek Status Pemesanan

Detail masing-masing fitur dijabarkan pada Bagian 6.

Selain 6 fitur utama di atas, terdapat **1 komponen internal** yang bukan bagian dari fitur pengunjung namun wajib ada untuk mendukung operasional sistem:

- **Dashboard Admin** — digunakan oleh pengelola/basecamp untuk verifikasi pembayaran, kelola kuota, dan rekap data (lihat Bagian 6.7).

**Usahakan**
- Aplikasi mobile native
- Sistem berjalan dengan lancar

---

## 6. Detail Fitur Utama

### 6.1 Fitur: Beranda

**Deskripsi:**
Halaman utama yang menjadi pintu masuk pengguna, menampilkan gambaran umum Gunung Lawu, ajakan untuk memesan tiket, dan navigasi ke fitur lain.

**User Story:**
- Sebagai calon pendaki, saya ingin melihat informasi ringkas dan menarik tentang Gunung Lawu begitu membuka website, agar saya tertarik melanjutkan ke pemesanan.

**Functional Requirements:**
| ID | Requirement |
|---|---|
| BR-01 | Menampilkan hero section dengan foto/banner Gunung Lawu dan tagline |
| BR-02 | Menampilkan tombol Call-to-Action "Pesan Tiket Sekarang" menuju halaman Pemesanan |
| BR-03 | Menampilkan ringkasan singkat 3 jalur pendakian populer (Cemoro Sewu, Cemoro Kandang, Candi Cetho) |
| BR-04 | Navigasi (navbar) ke seluruh 6 fitur utama |
| BR-05 | Menampilkan cuplikan testimoni/galeri foto pendaki |
| BR-06 | Footer berisi info kontak singkat dan sosial media |

---

### 6.2 Fitur: Tentang Kami

**Deskripsi:**
Berisi profil pengelola/basecamp dan tujuan dibangunnya website ini.

**User Story:**
- Sebagai calon pendaki, saya ingin mengetahui siapa pengelola di balik layanan ini agar saya percaya untuk melakukan transaksi.

**Functional Requirements:**
| ID | Requirement |
|---|---|
| TK-01 | Menampilkan profil pengelola/basecamp (nama, sejarah singkat) |
| TK-02 | Menampilkan visi & misi atau tujuan dibuatnya platform |
---

### 6.3 Fitur: Pemesanan

**Deskripsi:**
Fitur inti dari website — memungkinkan pengguna memilih jadwal, jalur, dan jumlah pendaki, lalu melakukan pemesanan tiket.

**User Story:**
- Sebagai calon pendaki, saya ingin memesan tiket pendakian secara online dengan mengisi data diri dan memilih jadwal, agar saya tidak perlu antre di lokasi.

**Functional Requirements:**
| ID | Requirement |
|---|---|
| PM-01 | Form pemilihan jalur pendakian (Cemoro Sewu / Cemoro Kandang / Candi Cetho, dsb.) |
| PM-02 | Form pemilihan tanggal pendakian dengan validasi ketersediaan kuota harian |
| PM-03 | Form input jumlah pendaki dan data diri tiap pendaki (nama, NIK, no. HP, kontak darurat) |
| PM-04 | Sistem menghitung otomatis total biaya berdasarkan jumlah pendaki dan jalur dipilih |
| PM-05 | Upload dokumen pendukung (contoh: surat sehat) jika disyaratkan |
| PM-06 | Ringkasan pemesanan (review order) sebelum konfirmasi |
| PM-07 | Konfirmasi pemesanan & generate kode booking unik (status awal: `menunggu_konfirmasi`) |
| PM-08 | Tombol **"Bayar via WhatsApp"** yang mengarahkan pengunjung ke WhatsApp (`wa.me/{nomor_admin}?text={pesan_terisi_otomatis}`) berisi rincian pemesanan yang sudah terisi otomatis (kode booking, nama, jalur, tanggal, jumlah pendaki, total biaya) |
| PM-09 | Notifikasi email berisi e-tiket/ringkasan pemesanan (dapat berupa PDF/QR code) sebagai cadangan selain chat WhatsApp |
| PM-10 | Validasi kuota agar tidak melebihi daya tampung jalur per hari |

**Alur Pemesanan (High-level):**
1. Pilih jalur → 2. Pilih tanggal → 3. Isi data pendaki → 4. Review & hitung biaya → 5. Konfirmasi pemesanan (kode booking dibuat) → 6. Klik "Bayar via WhatsApp" → diarahkan ke chat WhatsApp admin dengan pesan sudah terisi otomatis → 7. Admin verifikasi & konfirmasi pembayaran manual → 8. Status pemesanan berubah menjadi terkonfirmasi

**Detail teknis tombol "Bayar via WhatsApp" (PM-08):**
- Format link: `https://wa.me/62XXXXXXXXXX?text=<pesan yang di-encode>`
- Contoh isi pesan otomatis:
  ```
  Halo, saya ingin konfirmasi pembayaran tiket pendakian Gunung Lawu.
  Kode Booking: LAWU-20260702-001
  Nama: Budi Santoso
  Jalur: Cemoro Sewu
  Tanggal Pendakian: 10 Juli 2026
  Jumlah Pendaki: 3 orang
  Total Biaya: Rp 150.000
  ```
- Pesan disusun di sisi client (setelah data pemesanan tersimpan ke Supabase) menggunakan template string, lalu di-encode dengan `encodeURIComponent()` sebelum disisipkan ke URL `wa.me`.

**Alur Verifikasi Pembayaran (Human-in-the-loop) — ringkas:**

Karena tidak ada payment gateway, verifikasi pembayaran sepenuhnya bergantung pada tindakan manual admin:

1. Pengunjung transfer manual ke rekening/e-wallet yang diinfokan admin melalui chat WhatsApp.
2. Pengunjung mengirim bukti transfer (screenshot) langsung di chat WhatsApp yang sama — **bukan diupload ke sistem**.
3. Admin memeriksa bukti transfer secara manual di WhatsApp, lalu mengubah status pemesanan di **Dashboard Admin** (lihat Bagian 6.7) dari `menunggu_konfirmasi` menjadi `terkonfirmasi`.
4. Sistem otomatis mengirim email e-tiket ke pengunjung begitu status berubah (trigger dari Supabase).
5. Pengunjung dapat memantau status pemesanannya sendiri lewat fitur **Cek Status Pemesanan** (lihat Bagian 6.6).

---

### 6.4 Fitur: Informasi

**Deskripsi:**
Pusat informasi bagi pendaki terkait jalur pendakian, peraturan, perlengkapan, dan kondisi terkini.

**User Story:**
- Sebagai calon pendaki, saya ingin mengetahui detail jalur pendakian dan aturan yang berlaku agar saya bisa mempersiapkan diri dengan baik.

**Functional Requirements:**
| ID | Requirement |
|---|---|
| IN-01 | Menampilkan detail masing-masing jalur (Cemoro Sewu, Cemoro Kandang, Candi Cetho): jarak tempuh, estimasi waktu, tingkat kesulitan, pos-pos peristirahatan |
| IN-02 | Menampilkan peta/ilustrasi jalur pendakian (trek map) |
| IN-03 | Menampilkan syarat & ketentuan pendakian (usia minimal, dokumen wajib, larangan) |
| IN-04 | Menampilkan daftar perlengkapan wajib & rekomendasi |
| IN-05 | Menampilkan info cuaca/kondisi gunung terkini (statis atau integrasi API cuaca opsional) |
| IN-06 | Menampilkan tarif/biaya tiket per jalur |
| IN-07 | Menampilkan FAQ seputar pendakian |

---

### 6.5 Fitur: Bantuan

**Deskripsi:**
Menyediakan sarana komunikasi antara pengguna dan pengelola untuk pertanyaan, kendala, atau keadaan darurat.

**User Story:**
- Sebagai calon pendaki, saya ingin dapat menghubungi pengelola dengan mudah jika mengalami kendala saat pemesanan atau butuh bantuan darurat.

**Functional Requirements:**
| ID | Requirement |
|---|---|
| BT-01 | Menampilkan nomor kontak (telepon/WhatsApp) basecamp dan tim SAR/darurat |
| BT-02 | Menampilkan nomor kontak per pos jalur pendakian (jika berbeda) |
| BT-03 | Form kontak/pengaduan (nama, email, subjek, pesan) yang terkirim ke admin |
| BT-04 | Menampilkan jam operasional layanan bantuan |
| BT-05 | Tautan langsung ke WhatsApp (klik untuk chat) |
| BT-06 | Menampilkan FAQ singkat terkait proses pemesanan/pembatalan |
| BT-07 | (Opsional) Live chat sederhana atau chatbot dasar |

---

### 6.6 Fitur: Cek Status Pemesanan

**Deskripsi:**
Halaman publik yang memungkinkan pengunjung memantau status pemesanan mereka sendiri tanpa perlu login, menggunakan kode booking sebagai identitas.

**User Story:**
- Sebagai pendaki yang sudah memesan, saya ingin mengecek apakah pembayaran saya sudah dikonfirmasi admin, tanpa harus menunggu balasan WhatsApp.

**Functional Requirements:**
| ID | Requirement |
|---|---|
| CS-01 | Form input kode booking + no HP untuk mencari data pemesanan |
| CS-02 | Menampilkan detail pemesanan (jalur, tanggal, jumlah pendaki, total biaya) dan status terkini (`menunggu_konfirmasi`/`terkonfirmasi`/`dibatalkan`/`selesai`) |
| CS-03 | Menampilkan e-tiket (PDF/QR code) apabila status sudah `terkonfirmasi` |
| CS-04 | Menampilkan pesan/alasan pembatalan apabila status `dibatalkan` (dari `catatan_admin`) |
| CS-05 | Tombol ulang "Bayar via WhatsApp" ditampilkan kembali jika status masih `menunggu_konfirmasi` (memudahkan pengunjung follow-up) |

---

### 6.7 Dashboard Admin *(Komponen Internal — bukan fitur utama pengunjung)*

**Deskripsi:**
Panel internal yang hanya dapat diakses oleh admin/pengelola basecamp (via Supabase Auth) untuk memverifikasi pembayaran, mengelola kuota, dan merekap data pemesanan.

**User Story:**
- Sebagai admin basecamp, saya ingin memverifikasi pembayaran dan mengubah status pemesanan dengan mudah setelah menerima bukti transfer di WhatsApp.

**Functional Requirements:**
| ID | Requirement |
|---|---|
| AD-01 | Login admin menggunakan Supabase Auth |
| AD-02 | Dashboard menampilkan daftar pemesanan dengan filter status (`menunggu_konfirmasi`, `terkonfirmasi`, `dibatalkan`, `selesai`) |
| AD-03 | Admin dapat mengubah status pemesanan secara manual (satu per satu) setelah verifikasi bukti transfer di WhatsApp |
| AD-04 | Sistem mengirim email e-tiket otomatis saat status berubah menjadi `terkonfirmasi` (via Supabase Database Trigger/Webhook ke Route Handler pengirim email) |
| AD-05 | Admin dapat membatalkan pemesanan (status → `dibatalkan`) beserta alasan pembatalan (`catatan_admin`) |
| AD-06 | Sistem mencatat `verified_at` (timestamp) dan `verified_by` (admin id) saat status diubah menjadi `terkonfirmasi`, untuk kebutuhan audit |
| AD-07 | Admin dapat mengelola kuota harian per jalur (tambah/kurangi `kuota_maksimal`) |
| AD-08 | Admin dapat melihat & merespons pesan yang masuk dari fitur Bantuan |

---

## 7. Kebutuhan Non-Fungsional

| Kategori | Requirement |
|---|---|
| Performa | Halaman utama dan pemesanan harus dapat dimuat dalam < 3 detik pada koneksi normal |
| Keamanan | Data pribadi pendaki (NIK, kontak) dienkripsi/disimpan sesuai praktik keamanan; proteksi terhadap SQL Injection & CSRF |
| Skalabilitas | Sistem mampu menangani lonjakan pemesanan saat musim liburan/akhir pekan |
| Kompatibilitas | Responsif di perangkat desktop dan mobile |
| Ketersediaan | Uptime minimal 99% |
| Aksesibilitas | Kontras warna dan ukuran teks memadai untuk keterbacaan |
| Bahasa | Bahasa Indonesia sebagai bahasa utama antarmuka |

---

## 8. Tech Stack

Stack yang digunakan pada proyek ini:

| Layer | Teknologi | Catatan |
|---|---|---|
| Fullstack Framework | **Next.js 16** (App Router) | Server Components untuk halaman statis (Beranda, Tentang Kami, Informasi), Client Components untuk form interaktif (Pemesanan, Bantuan) |
| API Layer | Next.js Route Handlers (`app/api/.../route.ts`) | Menggantikan backend terpisah; seluruh logika bisnis (validasi kuota, hitung biaya, generate kode booking) ditangani di sini |
| Database | **Supabase (PostgreSQL)** | Database utama, sekaligus dimanfaatkan untuk Auth & Storage |
| Database Management Tool | **pgAdmin 4** | Digunakan untuk mengelola/inspeksi skema database secara langsung via koneksi ke connection string PostgreSQL milik Supabase (di luar Supabase Dashboard) |
| ORM/Query | Supabase JS Client atau Prisma (opsional, jika ingin type-safety tambahan di atas skema Postgres) | Pilih salah satu secara konsisten di seluruh proyek |
| Autentikasi | Supabase Auth | Digunakan untuk login **admin/pengelola**; pemesanan oleh pengunjung tetap **guest checkout** (kode booking + no HP sebagai identitas pelacakan) |
| Storage File | Supabase Storage | Untuk upload dokumen pendukung (mis. surat sehat) |
| Validasi Form | Zod + React Hook Form | Validasi di sisi client maupun server (route handler) |
| Styling | Tailwind CSS | Konsisten dengan ekosistem Next.js |
| Pembayaran | **Redirect ke WhatsApp** (`wa.me` link dengan pesan pre-filled) | Tidak menggunakan payment gateway; pengunjung menekan tombol "Bayar" lalu diarahkan ke WhatsApp admin dengan rincian pemesanan otomatis terisi di pesan |
| Notifikasi | Resend/SMTP untuk email (opsional, sebagai cadangan e-tiket) | Konfirmasi pembayaran utama dilakukan lewat percakapan WhatsApp, bukan otomatis dari sistem |
| Hosting | Vercel (untuk aplikasi Next.js) + Supabase Cloud (untuk database & storage) | Kombinasi ini mendukung tier gratis untuk skala kecil/menengah |

**Catatan arsitektur:**
- Karena Next.js bersifat fullstack, tidak diperlukan backend terpisah (mis. Laravel) — seluruh logika bisnis (Service Layer) dapat diletakkan di folder `lib/services/` dan dipanggil dari Route Handlers agar tetap terstruktur dan reusable.
- Row Level Security (RLS) Supabase perlu dikonfigurasi agar data pemesanan/pendaki hanya dapat diakses oleh admin yang berwenang, sementara insert dari form publik dibatasi lewat policy khusus (mis. hanya boleh insert, tidak boleh select/update data pengguna lain).
- **pgAdmin 4** dipakai sebagai tool pendamping untuk keperluan development (menjalankan query manual, memeriksa data, debugging skema), terhubung langsung ke database Supabase melalui connection string PostgreSQL yang tersedia di pengaturan project Supabase.

---

## 9. Skema Database (Supabase / PostgreSQL)

Skema lengkap di bawah ini dirancang untuk dijalankan langsung di **Supabase SQL Editor** atau via **pgAdmin 4** yang terhubung ke connection string PostgreSQL milik project Supabase.

### 9.1 Entity Relationship Diagram (Tekstual)

```
auth.users (Supabase Auth)
    │
    │ 1:1
    ▼
  admins ────────────────┐
    │                     │ verified_by (nullable FK)
    │                     ▼
    │                 pemesanan ──────────► jalur
    │                     │  jalur_id (FK)     │
    │                     │                    │ 1:N
    │                     │ 1:N                ▼
    │                     ▼               jadwal_kuota
    │                 pendaki

  pesan_bantuan (berdiri sendiri, tidak ada FK ke tabel lain)
```

**Relasi:**
- `jalur` 1 — N `jadwal_kuota` (satu jalur punya banyak baris kuota per tanggal)
- `jalur` 1 — N `pemesanan` (satu jalur bisa dipesan berkali-kali)
- `pemesanan` 1 — N `pendaki` (satu pemesanan bisa berisi banyak pendaki/rombongan)
- `admins` 1 — N `pemesanan` (lewat kolom `verified_by`, nullable — diisi saat admin memverifikasi)
- `pesan_bantuan` berdiri sendiri (tidak berelasi ke tabel lain)

### 9.2 Enum / Tipe Data Custom

```sql
-- Status pemesanan (lihat Bagian 6.3 & 6.7)
create type status_pemesanan as enum (
  'menunggu_konfirmasi',
  'terkonfirmasi',
  'dibatalkan',
  'selesai'
);

-- Status pesan pada fitur Bantuan (Bagian 6.5)
create type status_pesan_bantuan as enum (
  'baru',
  'dibaca',
  'dibalas'
);

-- Tingkat kesulitan jalur (Bagian 6.4)
create type tingkat_kesulitan_jalur as enum (
  'mudah',
  'menengah',
  'sulit'
);
```

### 9.3 Definisi Tabel (DDL)

**Tabel `admins`** — data admin/pengelola basecamp, terhubung ke `auth.users` bawaan Supabase Auth.

```sql
create table admins (
  id uuid primary key references auth.users(id) on delete cascade,
  nama text not null,
  role text not null default 'admin' check (role in ('admin', 'superadmin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table admins is 'Data admin/pengelola basecamp, terhubung ke Supabase Auth';
```

**Tabel `jalur`** — data master jalur pendakian (Cemoro Sewu, Cemoro Kandang, Candi Cetho, dst).

```sql
create table jalur (
  id uuid primary key default gen_random_uuid(),
  nama text not null,
  slug text not null unique,
  deskripsi text,
  jarak_km numeric(5,2),
  estimasi_waktu_jam numeric(4,1),
  tingkat_kesulitan tingkat_kesulitan_jalur not null default 'menengah',
  harga_tiket numeric(10,2) not null check (harga_tiket >= 0),
  kuota_harian_default integer not null default 50 check (kuota_harian_default > 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table jalur is 'Data master jalur pendakian Gunung Lawu';
```

**Tabel `jadwal_kuota`** — kuota pendakian per jalur per tanggal. Baris baru dibuat otomatis (via trigger) saat ada pemesanan pertama pada tanggal tersebut, atau dapat di-generate manual oleh admin.

```sql
create table jadwal_kuota (
  id uuid primary key default gen_random_uuid(),
  jalur_id uuid not null references jalur(id) on delete cascade,
  tanggal date not null,
  kuota_terpakai integer not null default 0 check (kuota_terpakai >= 0),
  kuota_maksimal integer not null check (kuota_maksimal > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (jalur_id, tanggal)
);

comment on table jadwal_kuota is 'Kuota pendakian per jalur per tanggal';
```

**Tabel `pemesanan`** — tabel inti, mencatat setiap transaksi pemesanan tiket.

```sql
create table pemesanan (
  id uuid primary key default gen_random_uuid(),
  kode_booking text not null unique,
  jalur_id uuid not null references jalur(id),
  tanggal date not null,
  jumlah_pendaki integer not null check (jumlah_pendaki > 0),
  total_biaya numeric(12,2) not null check (total_biaya >= 0),
  status status_pemesanan not null default 'menunggu_konfirmasi',
  nama_pemesan text not null,
  no_hp_pemesan text not null,
  wa_redirected_at timestamptz,
  verified_at timestamptz,
  verified_by uuid references admins(id),
  catatan_admin text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table pemesanan is 'Transaksi pemesanan tiket pendakian';
comment on column pemesanan.no_hp_pemesan is 'Digunakan bersama kode_booking sebagai identitas pada fitur Cek Status Pemesanan (Bagian 6.6)';
comment on column pemesanan.wa_redirected_at is 'Timestamp saat pengunjung menekan tombol Bayar via WhatsApp (PM-08)';
```

**Tabel `pendaki`** — data setiap individu pendaki dalam satu pemesanan (mendukung rombongan).

```sql
create table pendaki (
  id uuid primary key default gen_random_uuid(),
  pemesanan_id uuid not null references pemesanan(id) on delete cascade,
  nama text not null,
  nik varchar(16) not null,
  no_hp text not null,
  kontak_darurat text not null,
  dokumen_url text,
  created_at timestamptz not null default now()
);

comment on table pendaki is 'Data individu pendaki per pemesanan (mendukung rombongan)';
comment on column pendaki.dokumen_url is 'Path file di Supabase Storage, misal surat sehat (PM-05)';
```

**Tabel `pesan_bantuan`** — pesan/pengaduan dari fitur Bantuan.

```sql
create table pesan_bantuan (
  id uuid primary key default gen_random_uuid(),
  nama text not null,
  email text not null,
  subjek text not null,
  pesan text not null,
  status status_pesan_bantuan not null default 'baru',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table pesan_bantuan is 'Pesan/pengaduan dari fitur Bantuan (Bagian 6.5)';
```

### 9.4 Index

```sql
-- Pencarian cepat untuk fitur Cek Status Pemesanan (kode_booking + no_hp)
create index idx_pemesanan_kode_booking on pemesanan (kode_booking);
create index idx_pemesanan_no_hp on pemesanan (no_hp_pemesan);

-- Filter dashboard admin berdasarkan status
create index idx_pemesanan_status on pemesanan (status);

-- Lookup kuota per jalur & tanggal (selain unique constraint di atas)
create index idx_jadwal_kuota_jalur_tanggal on jadwal_kuota (jalur_id, tanggal);

-- Relasi pendaki ke pemesanan
create index idx_pendaki_pemesanan_id on pendaki (pemesanan_id);

-- Filter dashboard admin untuk pesan bantuan yang belum dibaca
create index idx_pesan_bantuan_status on pesan_bantuan (status);
```

### 9.5 Function & Trigger

**Auto-update kolom `updated_at`:**

```sql
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_admins_updated_at before update on admins
  for each row execute function set_updated_at();

create trigger trg_jalur_updated_at before update on jalur
  for each row execute function set_updated_at();

create trigger trg_jadwal_kuota_updated_at before update on jadwal_kuota
  for each row execute function set_updated_at();

create trigger trg_pemesanan_updated_at before update on pemesanan
  for each row execute function set_updated_at();

create trigger trg_pesan_bantuan_updated_at before update on pesan_bantuan
  for each row execute function set_updated_at();
```

**Auto-generate kode booking** — format `LAWU-YYYYMMDD-XXX` (contoh: `LAWU-20260702-001`):

```sql
create or replace function generate_kode_booking()
returns trigger as $$
declare
  today_prefix text := 'LAWU-' || to_char(now(), 'YYYYMMDD') || '-';
  next_seq integer;
begin
  if new.kode_booking is null or new.kode_booking = '' then
    select coalesce(max(substring(kode_booking from '\d+$')::integer), 0) + 1
    into next_seq
    from pemesanan
    where kode_booking like today_prefix || '%';

    new.kode_booking := today_prefix || lpad(next_seq::text, 3, '0');
  end if;
  return new;
end;
$$ language plpgsql;

create trigger trg_pemesanan_kode_booking before insert on pemesanan
  for each row execute function generate_kode_booking();
```

**Validasi & update kuota otomatis (mencegah race condition)** — berjalan setiap ada pemesanan baru: memastikan baris `jadwal_kuota` untuk jalur+tanggal tersebut ada, lalu menambah `kuota_terpakai`. Menggunakan `select ... for update` untuk mengunci baris dan mencegah dua pemesanan bersamaan melebihi kuota.

```sql
create or replace function update_kuota_on_pemesanan()
returns trigger as $$
declare
  v_kuota_maksimal integer;
  v_kuota_terpakai integer;
begin
  insert into jadwal_kuota (jalur_id, tanggal, kuota_maksimal)
  select new.jalur_id, new.tanggal, kuota_harian_default
  from jalur where id = new.jalur_id
  on conflict (jalur_id, tanggal) do nothing;

  select kuota_maksimal, kuota_terpakai
  into v_kuota_maksimal, v_kuota_terpakai
  from jadwal_kuota
  where jalur_id = new.jalur_id and tanggal = new.tanggal
  for update;

  if (v_kuota_terpakai + new.jumlah_pendaki) > v_kuota_maksimal then
    raise exception 'Kuota pendakian untuk jalur dan tanggal ini tidak mencukupi. Sisa kuota: %', (v_kuota_maksimal - v_kuota_terpakai);
  end if;

  update jadwal_kuota
  set kuota_terpakai = kuota_terpakai + new.jumlah_pendaki
  where jalur_id = new.jalur_id and tanggal = new.tanggal;

  return new;
end;
$$ language plpgsql;

create trigger trg_pemesanan_update_kuota before insert on pemesanan
  for each row execute function update_kuota_on_pemesanan();
```

**Kembalikan kuota saat pemesanan dibatalkan:**

```sql
create or replace function release_kuota_on_cancel()
returns trigger as $$
begin
  if new.status = 'dibatalkan' and old.status != 'dibatalkan' then
    update jadwal_kuota
    set kuota_terpakai = greatest(kuota_terpakai - old.jumlah_pendaki, 0)
    where jalur_id = old.jalur_id and tanggal = old.tanggal;
  end if;
  return new;
end;
$$ language plpgsql;

create trigger trg_pemesanan_release_kuota after update on pemesanan
  for each row execute function release_kuota_on_cancel();
```

**Catat `verified_at` otomatis saat status jadi `terkonfirmasi`** — melengkapi requirement **AD-06** (nilai `verified_by` tetap diisi manual oleh aplikasi berdasarkan admin yang sedang login):

```sql
create or replace function set_verified_at()
returns trigger as $$
begin
  if new.status = 'terkonfirmasi' and old.status != 'terkonfirmasi' then
    new.verified_at = now();
  end if;
  return new;
end;
$$ language plpgsql;

create trigger trg_pemesanan_verified_at before update on pemesanan
  for each row execute function set_verified_at();
```

### 9.6 Row Level Security (RLS)

Semua tabel **wajib** diaktifkan RLS-nya, mengingat sebagian besar akses datang dari pengunjung anonim (guest checkout).

```sql
alter table admins enable row level security;
alter table jalur enable row level security;
alter table jadwal_kuota enable row level security;
alter table pemesanan enable row level security;
alter table pendaki enable row level security;
alter table pesan_bantuan enable row level security;
```

**Policy `admins`:**
```sql
create policy "Admin dapat melihat data admin"
  on admins for select
  using (auth.uid() is not null and exists (select 1 from admins where id = auth.uid()));

create policy "Admin dapat update data sendiri"
  on admins for update
  using (auth.uid() = id);
```

**Policy `jalur`:**
```sql
create policy "Publik dapat melihat jalur aktif"
  on jalur for select
  using (is_active = true);

create policy "Admin full access jalur"
  on jalur for all
  using (exists (select 1 from admins where id = auth.uid()))
  with check (exists (select 1 from admins where id = auth.uid()));
```

**Policy `jadwal_kuota`:**
```sql
create policy "Publik dapat melihat kuota"
  on jadwal_kuota for select
  using (true);

create policy "Admin full access kuota"
  on jadwal_kuota for all
  using (exists (select 1 from admins where id = auth.uid()))
  with check (exists (select 1 from admins where id = auth.uid()));
```

**Policy `pemesanan`:**
```sql
create policy "Publik dapat insert pemesanan"
  on pemesanan for insert
  with check (true);

create policy "Publik tidak bisa select langsung"
  on pemesanan for select
  using (false);

create policy "Admin full access pemesanan"
  on pemesanan for all
  using (exists (select 1 from admins where id = auth.uid()))
  with check (exists (select 1 from admins where id = auth.uid()));
```

> **Catatan penting:** Select untuk publik sengaja **ditutup total** (`using (false)`) demi keamanan data pribadi (NIK, no HP). Fitur "Cek Status Pemesanan" **tidak** melakukan `select` langsung ke tabel, melainkan memanggil **RPC function** (`SECURITY DEFINER`) yang memvalidasi kombinasi `kode_booking` + `no_hp_pemesan` sebelum mengembalikan data (lihat di bawah).

**Policy `pendaki`:**
```sql
create policy "Publik dapat insert pendaki"
  on pendaki for insert
  with check (true);

create policy "Publik tidak bisa select pendaki"
  on pendaki for select
  using (false);

create policy "Admin full access pendaki"
  on pendaki for all
  using (exists (select 1 from admins where id = auth.uid()))
  with check (exists (select 1 from admins where id = auth.uid()));
```

**Policy `pesan_bantuan`:**
```sql
create policy "Publik dapat insert pesan bantuan"
  on pesan_bantuan for insert
  with check (true);

create policy "Publik tidak bisa select pesan bantuan"
  on pesan_bantuan for select
  using (false);

create policy "Admin full access pesan bantuan"
  on pesan_bantuan for all
  using (exists (select 1 from admins where id = auth.uid()))
  with check (exists (select 1 from admins where id = auth.uid()));
```

**RPC Function — Cek Status Pemesanan (akses terkontrol untuk publik):**

Karena `select` langsung pada tabel `pemesanan` ditutup untuk publik, fitur **Cek Status Pemesanan** (Bagian 6.6) menggunakan function `SECURITY DEFINER` yang di-expose sebagai RPC dan dipanggil dari Route Handler Next.js.

```sql
create or replace function cek_status_pemesanan(
  p_kode_booking text,
  p_no_hp text
)
returns table (
  kode_booking text,
  nama_jalur text,
  tanggal date,
  jumlah_pendaki integer,
  total_biaya numeric,
  status status_pemesanan,
  catatan_admin text
)
security definer
set search_path = public
language sql
as $$
  select
    p.kode_booking,
    j.nama as nama_jalur,
    p.tanggal,
    p.jumlah_pendaki,
    p.total_biaya,
    p.status,
    p.catatan_admin
  from pemesanan p
  join jalur j on j.id = p.jalur_id
  where p.kode_booking = p_kode_booking
    and p.no_hp_pemesan = p_no_hp;
$$;

grant execute on function cek_status_pemesanan(text, text) to anon;
```

### 9.7 Supabase Storage (Bucket)

```sql
insert into storage.buckets (id, name, public)
values ('dokumen-pendaki', 'dokumen-pendaki', false);

create policy "Publik dapat upload dokumen"
  on storage.objects for insert
  with check (bucket_id = 'dokumen-pendaki');

create policy "Admin dapat membaca dokumen"
  on storage.objects for select
  using (
    bucket_id = 'dokumen-pendaki'
    and exists (select 1 from admins where id = auth.uid())
  );
```

### 9.8 Contoh Seed Data

```sql
insert into jalur (nama, slug, deskripsi, jarak_km, estimasi_waktu_jam, tingkat_kesulitan, harga_tiket, kuota_harian_default)
values
  ('Cemoro Sewu', 'cemoro-sewu', 'Jalur pendakian paling populer dari sisi Jawa Timur.', 8.5, 7.0, 'menengah', 25000, 150),
  ('Cemoro Kandang', 'cemoro-kandang', 'Jalur dari sisi Jawa Tengah dengan pemandangan sabana.', 9.5, 8.0, 'menengah', 20000, 100),
  ('Candi Cetho', 'candi-cetho', 'Jalur alternatif melewati kompleks candi bersejarah.', 11.0, 9.5, 'sulit', 20000, 75);
```

### 9.9 Catatan Desain

- Tabel `pembayaran` **sengaja tidak dibuat** — konsisten dengan alur pembayaran via WhatsApp (tidak ada bukti transfer yang disimpan sistem).
- Kolom `nama_pemesan` dan `no_hp_pemesan` pada `pemesanan` dibutuhkan untuk mengisi pesan WhatsApp otomatis (PM-08) dan sebagai kunci pencarian pada fitur Cek Status Pemesanan (CS-01).
- Kode booking digenerate otomatis oleh trigger database (`generate_kode_booking`), bukan oleh aplikasi, untuk menjamin keunikan.
- Kuota dijaga otomatis oleh trigger dengan row-locking (`update_kuota_on_pemesanan`) untuk mencegah overbooking saat ada pemesanan bersamaan.
- Akses publik ke tabel `pemesanan` dan `pendaki` ditutup total untuk `select`; akses hanya lewat RPC `SECURITY DEFINER` (`cek_status_pemesanan`).

---

## 10. Metrik Keberhasilan (Success Metrics)

- Jumlah transaksi pemesanan berhasil per bulan
- Tingkat penyelesaian pemesanan (conversion rate dari kunjungan ke transaksi)
- Waktu rata-rata penyelesaian proses pemesanan
- Jumlah pesan bantuan yang direspons dalam < 24 jam
- Tingkat kepuasan pengguna (jika ditambahkan survei/SUS)

---

## 11. Batasan & Asumsi

- Pembayaran dilakukan sepenuhnya melalui konfirmasi manual via WhatsApp (bukan payment gateway), sehingga status "terkonfirmasi" bergantung pada verifikasi admin setelah menerima bukti transfer di chat WhatsApp.
- Kuota jalur pendakian mengikuti kebijakan resmi Taman Nasional Gunung Lawu (TNGL) dan dapat berubah sewaktu-waktu.
- Website ini merupakan kanal pemesanan resmi, namun verifikasi akhir tetap dilakukan di basecamp saat keberangkatan.
- Nomor WhatsApp admin bersifat tetap (hardcoded/konfigurasi environment variable), belum mendukung multi-admin/multi-nomor secara dinamis pada versi awal.

---

## 12. Rencana Pengembangan Bertahap (Milestone)

| Fase | Cakupan |
|---|---|
| Fase 1 (MVP) | Beranda, Tentang Kami, Informasi, Bantuan, Pemesanan dengan alur redirect ke WhatsApp untuk pembayaran |
| Fase 2 | Dashboard admin lengkap (kelola kuota, verifikasi status pemesanan), integrasi email notifikasi otomatis |
| Fase 3 | Live chat, integrasi cuaca real-time, sistem rating pendaki |

---

*Dokumen ini bersifat living document dan dapat direvisi seiring perkembangan kebutuhan proyek.*
