---
title: "Instalasi Jaringan Rumah"
date: 2026-07-01
category: "Jaringan"
coverImage: "/uploads/cover-jaringan-rumah.png"
summary: "Pasang kabel LAN Cat6 dari ruang tamu ke 3 kamar, crimping sendiri, dan setup router + access point supaya WiFi coverage merata di seluruh rumah."
tags:
  - Networking
  - Cat6
  - WiFi
  - Router
---

## Latar Belakang

WiFi di rumah selalu bermasalah — sinyal kuat di ruang tamu tapi hampir mati di kamar belakang. Setelah riset, solusi paling reliable adalah tarik kabel Ethernet ke setiap ruangan dan pasang access point.

## Perencanaan

### Layout Jaringan

```
[Modem ISP] → [Router Utama - Ruang Tamu]
                    ├── [Kabel Cat6] → Kamar 1 (Access Point)
                    ├── [Kabel Cat6] → Kamar 2 (Desktop PC)
                    └── [Kabel Cat6] → Kamar 3 (Access Point)
```

### Material yang Dibeli

| Item | Qty | Harga |
|------|-----|-------|
| Kabel Cat6 (305m box) | 1 | Rp450.000 |
| RJ45 Connector | 50 pcs | Rp35.000 |
| Crimping tool | 1 | Rp65.000 |
| Cable tester | 1 | Rp45.000 |
| Wall plate RJ45 | 6 | Rp90.000 |
| TP-Link EAP225 (AP) | 2 | Rp1.200.000 |
| **Total** | | **Rp1.885.000** |

## Proses Instalasi

### 1. Tarik Kabel

- Bor lubang di dinding antar ruangan (pakai bor beton 10mm)
- Tarik kabel melalui plafon/bawah lantai di beberapa titik
- Total kabel terpakai: ±45 meter untuk 3 jalur

### 2. Crimping RJ45

Ini bagian yang paling butuh kesabaran. Standard yang dipakai: **T568B**

Urutan warna:
1. Putih-Orange
2. Orange
3. Putih-Hijau
4. Biru
5. Putih-Biru
6. Hijau
7. Putih-Coklat
8. Coklat

### 3. Testing

Semua 3 jalur di-test pakai cable tester — hasilnya semua lampu LED menyala berurutan (1-8). **Tidak ada kabel yang cross atau putus**.

### 4. Setup Access Point

- TP-Link EAP225 dikonfigurasi sebagai **access point mode** (bukan router)
- SSID dan password disamakan dengan router utama
- Channel dipisah: Router (Ch 1), AP Kamar 1 (Ch 6), AP Kamar 3 (Ch 11) — supaya tidak interferensi

## Hasil

- **Speed test** di semua ruangan: konsisten 90-95 Mbps (dari paket 100 Mbps)
- **Ping** ke Google: 5-8ms dari mana saja di rumah
- **Roaming** antar AP smooth — device otomatis pindah ke AP terdekat

Jaringan rumah sekarang stabil dan kencang di mana-mana. Worth the effort! 🚀
