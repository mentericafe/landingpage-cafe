# Menteri Cafe & Family Space — Landing Page

Static, mobile-first, PWA-ready landing page for GitHub Pages.

## Data bisnis yang sudah dimasukkan
- Alamat: Jl. Gedawang Raya, RT.1/RW.1, Gedawang, Kec. Banyumanik, Kota Semarang, Jawa Tengah 50266
- WhatsApp: 0818-0705-3300
- Google Maps: https://maps.app.goo.gl/FcaKLn2uGKd5dP4T9
- TikTok: https://www.tiktok.com/@menteri.cafe?is_from_webapp=1&sender_device=pc
- Jam buka: Senin tutup; Selasa–Jumat 16.00–23.00; Sabtu–Minggu 09.00–23.00
- 17 item menu aktual beserta harga

## Struktur
- `index.html` — halaman utama, semantic HTML, menu, jam buka, JSON-LD
- `style.css` — desain responsive/mobile-first
- `script.js` — menu mobile, filter menu, status jam buka, install prompt, service worker
- `sw.js` — offline cache
- `site.webmanifest` — PWA manifest
- `robots.txt` + `sitemap.xml` — crawler/indexing support
- `index.md`, `llms.txt`, `llms-full.txt` — konteks machine-readable tambahan
- `business.json` + `menu.json` — fakta bisnis dan menu terstruktur untuk integrasi/AI
- `404.html` — halaman 404
- `.github/workflows/pages.yml` — deploy otomatis ke GitHub Pages
- `assets/` — favicon, PWA icons, visual sementara

## Penting sebelum publish
Cari dan ganti semua kemunculan:
`YOUR-GITHUB-USERNAME`

Contoh project site:
`https://username.github.io/menteri-cafe/`

Setelah custom domain tersedia, ubah canonical URL, Open Graph URL, sitemap, robots.txt, dan URL JSON-LD ke domain final.

## Logo dan foto
Logo resmi dan foto asli cafe belum disertakan pada paket ini. Aset `hero-art.svg`, `space-1.svg`, `space-2.svg`, `space-3.svg`, dan `og-cover.*` merupakan visual sementara. Ganti dengan aset resmi agar halaman produksi memakai identitas visual dan foto lokasi yang nyata.

Rekomendasi nama file foto: `menteri-cafe-gedawang-banyumanik.jpg`, `family-space-menteri-cafe.jpg`, `menu-kopi-menteri-cafe.jpg`, dan sejenisnya. Gunakan `alt` yang mendeskripsikan foto secara akurat.

## GitHub Pages
1. Buat repository, misalnya `menteri-cafe`.
2. Upload seluruh isi folder ini ke branch `main`.
3. Buka Settings → Pages.
4. Pilih GitHub Actions sebagai source.
5. Workflow `.github/workflows/pages.yml` akan deploy saat push ke `main`.

## SEO
Setelah URL live:
1. Daftarkan properti di Google Search Console.
2. Verifikasi kepemilikan.
3. Submit `/sitemap.xml`.
4. Gunakan URL Inspection untuk homepage.
5. Uji structured data dengan Rich Results Test.

## AI discoverability
Tidak ada mekanisme yang menjamin semua AI crawler akan mengindeks website. Paket ini memperkuat discoverability dengan semantic HTML, konten eksplisit, JSON-LD, crawlable links, sitemap, robots.txt, dan `llms.txt` sebagai metadata tambahan.
