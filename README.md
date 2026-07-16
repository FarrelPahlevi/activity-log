# ⚡ Farrel's Activity Log

Website portofolio pribadi berbasis **Astro** yang berfungsi sebagai "activity log" — tempat mendokumentasikan project, kegiatan teknis, dan eksperimen sehari-hari.

## 🛠️ Tech Stack

- **[Astro](https://astro.build)** — Static site generator
- **[Tailwind CSS v4](https://tailwindcss.com)** — Utility-first CSS framework
- **[Decap CMS](https://decapcms.org)** — Git-based headless CMS (admin panel di `/admin`)
- **[DecapBridge](https://decapbridge.com)** — Auth provider untuk Decap CMS
- **[Netlify](https://netlify.com)** — Hosting & deployment

## 📁 Struktur Project

```
├── public/
│   ├── admin/
│   │   ├── index.html      # Decap CMS admin page
│   │   └── config.yml      # Decap CMS configuration
│   ├── uploads/             # Media uploads dari CMS
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   ├── ActivityCard.astro
│   │   └── CategoryBadge.astro
│   ├── data/
│   │   └── activities/      # Markdown content (entri kegiatan)
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro           # Homepage
│   │   ├── tentang.astro         # Halaman Tentang
│   │   ├── rss.xml.js            # RSS Feed
│   │   └── kegiatan/
│   │       ├── index.astro       # Semua Kegiatan (search & filter)
│   │       └── [...slug].astro   # Detail Kegiatan
│   ├── styles/
│   │   └── global.css
│   └── content.config.ts         # Content collection schema
├── astro.config.mjs
├── netlify.toml
├── package.json
└── README.md
```

---

## 🚀 1. Cara Run Lokal

### Prerequisites
- Node.js >= 22.12.0
- npm atau pnpm

### Langkah

```bash
# Clone repo (ganti URL sesuai repo kamu)
git clone https://github.com/USERNAME/REPO_NAME.git
cd REPO_NAME

# Install dependencies
npm install

# Jalankan dev server
npm run dev
```

Buka `http://localhost:4321` di browser. 🎉

### Perintah Lainnya

| Perintah | Fungsi |
|----------|--------|
| `npm run dev` | Jalankan dev server |
| `npm run build` | Build production ke `dist/` |
| `npm run preview` | Preview hasil build |

---

## 📤 2. Cara Push ke GitHub & Deploy ke Netlify

### A. Push ke GitHub

1. Buat repository baru di [github.com/new](https://github.com/new)
   - Nama repo bebas (misal: `activity-log`)
   - Set sebagai **Public** atau **Private**
   - **Jangan** centang "Initialize with README"

2. Push code:
```bash
git init
git add .
git commit -m "Initial commit: activity log portfolio"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO_NAME.git
git push -u origin main
```

### B. Deploy ke Netlify

1. Buka [app.netlify.com](https://app.netlify.com) dan login/daftar (bisa pakai akun GitHub)
2. Klik **"Add new site"** → **"Import an existing project"**
3. Pilih **GitHub** dan authorize Netlify
4. Pilih repository yang baru dibuat
5. Settings build seharusnya auto-detected, tapi pastikan:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Klik **"Deploy site"**
7. Setelah deploy selesai, catat URL site kamu (misal: `https://farrel-activity-log.netlify.app`)

> **Penting:** Update nilai `site` di `astro.config.mjs` dengan URL Netlify kamu yang sebenarnya supaya sitemap dan RSS menghasilkan URL yang benar.

---

## 🔐 3. Setup DecapBridge & GitHub Token

### A. Generate GitHub Personal Access Token (Fine-Grained)

1. Buka [github.com/settings/tokens?type=beta](https://github.com/settings/tokens?type=beta)
2. Klik **"Generate new token"**
3. Isi konfigurasi:
   - **Token name:** `DecapBridge - Activity Log`
   - **Expiration:** Pilih sesuai kebutuhan (misal 90 hari, bisa di-renew)
   - **Repository access:** Pilih **"Only select repositories"** → pilih repo activity log kamu
   - **Permissions:**
     - **Contents:** Read and write ✅
     - **Pull requests:** Read and write ✅
4. Klik **"Generate token"**
5. **⚠️ SALIN TOKEN SEGERA** — token hanya ditampilkan sekali!

### B. Daftar DecapBridge

1. Buka [decapbridge.com](https://decapbridge.com) dan buat akun
2. Di dashboard, klik **"Add Site"**
3. Isi detail:
   - **Git Provider:** GitHub
   - **Repository:** `USERNAME/REPO_NAME`
   - **Git Access Token:** Paste token yang sudah di-generate di langkah sebelumnya
4. Klik **"Save"** / **"Create Site"**
5. DecapBridge akan memberikan **Site ID** — catat ini!

---

## 🔄 4. Update `identity_url` di `config.yml`

Setelah mendapat Site ID dari DecapBridge:

1. Buka file `public/admin/config.yml`
2. Ganti placeholder pada baris `identity_url`:

```yaml
backend:
  name: git-gateway
  repo: USERNAME/REPO_NAME          # ← Ganti dengan repo kamu
  branch: main
  identity_url: https://auth.decapbridge.com/sites/YOUR_SITE_ID  # ← Ganti SITE_ID
  gateway_url: https://gateway.decapbridge.com
```

3. Commit dan push perubahan:

```bash
git add public/admin/config.yml
git commit -m "feat: update DecapBridge identity_url"
git push
```

4. Netlify akan otomatis rebuild site kamu. Tunggu ±1-2 menit.

---

## ✏️ 5. Cara Akses & Pakai Admin Panel

Setelah semua setup di atas selesai:

1. Buka `https://YOUR-SITE.netlify.app/admin`
2. Login menggunakan akun yang sudah didaftarkan di DecapBridge
3. Kamu akan melihat dashboard Decap CMS dengan collection **"Kegiatan"**
4. Untuk menambah entri baru:
   - Klik **"New Kegiatan"**
   - Isi semua field: Judul, Tanggal, Kategori, Cover Image, Ringkasan, Tags
   - Tulis konten lengkap di editor Markdown
   - Klik **"Publish"**
5. Decap CMS akan otomatis:
   - Membuat file Markdown baru di `src/data/activities/`
   - Commit dan push ke GitHub
   - Netlify akan rebuild site secara otomatis

> **Tips:** Kamu bisa mengakses admin panel dari HP! Cukup buka URL `/admin` di browser HP — tampilannya responsive.

---

## 📝 Cara Menambah Entri Secara Manual (Tanpa CMS)

Jika ingin menambah entri langsung via code:

1. Buat file baru di `src/data/activities/`, misal `nama-kegiatan.md`
2. Isi dengan format frontmatter berikut:

```markdown
---
title: "Judul Kegiatan"
date: 2026-07-16
category: "Software & Programming"
coverImage: "/uploads/nama-cover.jpg"
summary: "Ringkasan singkat 1-2 kalimat."
tags:
  - Tag1
  - Tag2
---

Konten lengkap kegiatan di sini...
Bisa pakai **Markdown** formatting.
```

3. Tambahkan cover image ke `public/uploads/`
4. Commit dan push

---

## 📡 RSS Feed & Sitemap

- **RSS Feed:** `https://YOUR-SITE.netlify.app/rss.xml`
- **Sitemap:** `https://YOUR-SITE.netlify.app/sitemap-index.xml`

Keduanya di-generate otomatis saat build.

---

## 📄 License

MIT License — feel free to use and modify.
