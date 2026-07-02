export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admins: {
        Row: {
          id: string
          nama: string
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          nama: string
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nama?: string
          role?: string
          created_at?: string
          updated_at?: string
        }
      }
      jalur: {
        Row: {
          id: string
          nama: string
          slug: string
          deskripsi: string | null
          jarak_km: number | null
          estimasi_waktu_jam: number | null
          tingkat_kesulitan: Database['public']['Enums']['tingkat_kesulitan_jalur']
          harga_tiket: number
          kuota_harian_default: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nama: string
          slug: string
          deskripsi?: string | null
          jarak_km?: number | null
          estimasi_waktu_jam?: number | null
          tingkat_kesulitan?: Database['public']['Enums']['tingkat_kesulitan_jalur']
          harga_tiket: number
          kuota_harian_default?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nama?: string
          slug?: string
          deskripsi?: string | null
          jarak_km?: number | null
          estimasi_waktu_jam?: number | null
          tingkat_kesulitan?: Database['public']['Enums']['tingkat_kesulitan_jalur']
          harga_tiket?: number
          kuota_harian_default?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      jadwal_kuota: {
        Row: {
          id: string
          jalur_id: string
          tanggal: string
          kuota_terpakai: number
          kuota_maksimal: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          jalur_id: string
          tanggal: string
          kuota_terpakai?: number
          kuota_maksimal: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          jalur_id?: string
          tanggal?: string
          kuota_terpakai?: number
          kuota_maksimal?: number
          created_at?: string
          updated_at?: string
        }
      }
      pemesanan: {
        Row: {
          id: string
          kode_booking: string
          jalur_id: string
          tanggal: string
          jumlah_pendaki: number
          total_biaya: number
          status: Database['public']['Enums']['status_pemesanan']
          nama_pemesan: string
          no_hp_pemesan: string
          wa_redirected_at: string | null
          verified_at: string | null
          verified_by: string | null
          catatan_admin: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          kode_booking?: string
          jalur_id: string
          tanggal: string
          jumlah_pendaki: number
          total_biaya: number
          status?: Database['public']['Enums']['status_pemesanan']
          nama_pemesan: string
          no_hp_pemesan: string
          wa_redirected_at?: string | null
          verified_at?: string | null
          verified_by?: string | null
          catatan_admin?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          kode_booking?: string
          jalur_id?: string
          tanggal?: string
          jumlah_pendaki?: number
          total_biaya?: number
          status?: Database['public']['Enums']['status_pemesanan']
          nama_pemesan?: string
          no_hp_pemesan?: string
          wa_redirected_at?: string | null
          verified_at?: string | null
          verified_by?: string | null
          catatan_admin?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      pendaki: {
        Row: {
          id: string
          pemesanan_id: string
          nama: string
          nik: string
          no_hp: string
          kontak_darurat: string
          dokumen_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          pemesanan_id: string
          nama: string
          nik: string
          no_hp: string
          kontak_darurat: string
          dokumen_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          pemesanan_id?: string
          nama?: string
          nik?: string
          no_hp?: string
          kontak_darurat?: string
          dokumen_url?: string | null
          created_at?: string
        }
      }
      pesan_bantuan: {
        Row: {
          id: string
          nama: string
          email: string
          subjek: string
          pesan: string
          status: Database['public']['Enums']['status_pesan_bantuan']
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nama: string
          email: string
          subjek: string
          pesan: string
          status?: Database['public']['Enums']['status_pesan_bantuan']
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nama?: string
          email?: string
          subjek?: string
          pesan?: string
          status?: Database['public']['Enums']['status_pesan_bantuan']
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cek_status_pemesanan: {
        Args: {
          p_kode_booking: string
          p_no_hp: string
        }
        Returns: {
          kode_booking: string
          nama_jalur: string
          tanggal: string
          jumlah_pendaki: number
          total_biaya: number
          status: Database['public']['Enums']['status_pemesanan']
          catatan_admin: string | null
        }[]
      }
    }
    CompositeTypes: {
      [_ in never]: never
    }
    Enums: {
      status_pemesanan: 'menunggu_konfirmasi' | 'terkonfirmasi' | 'dibatalkan' | 'selesai'
      status_pesan_bantuan: 'baru' | 'dibaca' | 'dibalas'
      tingkat_kesulitan_jalur: 'mudah' | 'menengah' | 'sulit'
    }
  }
}
