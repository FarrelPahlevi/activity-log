---
title: "Restorasi HP Android Lama"
date: 2026-06-15
category: "Elektronik & Reparasi"
coverImage: "/uploads/cover-restorasi-hp.png"
summary: "Menghidupkan kembali Samsung Galaxy S7 yang sudah mati total — ganti baterai, flash custom ROM, dan pasang aplikasi ringan supaya masih bisa dipakai sehari-hari."
tags:
  - Android
  - Reparasi
  - Custom ROM
  - Samsung
---

## Latar Belakang

HP Samsung Galaxy S7 milik adik sudah mati total selama 6 bulan di laci. Daripada jadi sampah elektronik, saya coba restorasi supaya bisa dipakai lagi — minimal untuk browsing ringan dan YouTube.

## Langkah Pengerjaan

### 1. Diagnosis Awal

Pertama, saya cek apakah masalahnya di baterai atau di board. Colok charger → tidak ada tanda-tanda charging sama sekali. Buka casing belakang, ternyata baterai sudah kembung (berbahaya!).

### 2. Ganti Baterai

- Beli baterai replacement dari Tokopedia (±Rp85.000)
- Tools yang dipakai: **suction cup**, **spudger plastik**, **heat gun** (untuk melepas lem adhesive)
- Proses buka casing butuh kehati-hatian ekstra karena Galaxy S7 menggunakan back glass

### 3. Flash Custom ROM

Setelah baterai baru terpasang dan HP bisa nyala, stock ROM-nya sudah sangat lemot. Solusinya:

1. Unlock bootloader via **Odin**
2. Install **TWRP Recovery**
3. Flash **LineageOS 18.1** (berbasis Android 11)
4. Install **MindTheGapps** untuk Google Apps minimal

### 4. Optimasi

- Matikan animasi di Developer Options
- Install **Lite apps**: Facebook Lite, YouTube Vanced
- Pasang **Greenify** untuk hibernate background apps

## Tools yang Dipakai

| Tool | Fungsi |
|------|--------|
| Heat gun | Melepas adhesive back cover |
| Spudger plastik | Mencongkel tanpa merusak |
| Odin v3.14 | Flash firmware Samsung |
| TWRP | Custom recovery |

## Hasil Akhir

HP bisa hidup kembali dengan performa yang surprisingly smooth di LineageOS. Battery life sekitar 4-5 jam screen-on time — cukup untuk kebutuhan ringan. Total biaya: **Rp85.000** (hanya baterai).

> Lesson learned: Jangan buang HP lama sebelum coba restorasi. Kadang masalahnya cuma baterai!
