# 🎬 Soylu IPTV

Türkiye'nin En İyi IPTV Platformu - Eğitim ve Test Amaçlı

[![License](https://img.shields.io/badge/License-Educational%20Use%20Only-red.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-green.svg)](#)

---

## ⚠️ ÖNEMLİ UYARI - IMPORTANT NOTICE

### 🔴 SADECE EĞİTİM, DERS VE TEST AMAÇLI / FOR EDUCATIONAL PURPOSES ONLY

Bu platform **YÖNETİCİ VE ÖĞRETİCİ** tarafından **eğitim**, **ders** ve **yazılım test** amacıyla geliştirilmiştir.

This platform is developed by administrators for **educational**, **learning**, and **software testing** purposes.

### ❌ TİCARİ KULLANIM KESINLIKLE YASAKTIR / COMMERCIAL USE IS STRICTLY PROHIBITED

- ❌ Ticari amaçla kullanılamaz
- ❌ Para karşılığında hizmet verilemez
- ❌ Telif hakkı korumalı içerik paylaşılamaz
- ❌ Başkasının hakkına tecavüz edemez

**Aksi halde yasal sorumluluk tamamen sorumluya aittir.**

---

## 📋 İçindekiler

- [Özellikler](#-özellikler)
- [Hızlı Başlangıç](#-hızlı-başlangıç)
- [Kurulum](#-kurulum)
- [Kullanım](#-kullanım)
- [API Endpoints](#-api-endpoints)
- [Sorumluluk Reddi](#-sorumluluk-reddi)

---

## ✨ Özellikler

✅ **Çok Dilli Arayüz** - Türkçe/İngilizce desteği  
✅ **M3U Playlist** - VLC, Kodi, IPTV-M3U uyumlu  
✅ **Xtream Codes API** - Perfect Player, Kodi uyumlu  
✅ **Kategoriye Göre Filtreleme** - Kanalları kolayca bulun  
✅ **HD Logo Desteği** - Profesyonel görünüm  
✅ **Responsive Design** - Mobil, tablet, masaüstü uyumlu  
✅ **Açık Kaynak** - Tamamen ücretsiz ve şeffaf  

---

## 🚀 Hızlı Başlangıç

### Online Kullanım (En Kolay)

Tarayıcıda açın: **https://soyluiptv.github.io/intl**

### M3U ile VLC'de Açmak

```
Medya → Açık Ağ Akışı
https://soyluiptv.github.io/intl/api/get.php?username=soylu&password=soylu123&type=m3u
```

### Xtream Codes ile Perfect Player'da

```
Add Playlist
Portal: https://soyluiptv.github.io/intl:80
Username: soylu
Password: soylu123
```

---

## 💻 Kurulum (Yerel Geliştirme)

### Gereksinimler

- Node.js 18+
- npm veya yarn
- Git

### Adım Adım

```bash
# 1. Repository'yi klonla
git clone https://github.com/soyluiptv/intl.git
cd intl

# 2. Bağımlılıkları yükle
npm install

# 3. Geliştirme sunucusunu başlat
npm run dev

# 4. Tarayıcıda aç
# http://localhost:5173
```

### Production Build

```bash
# Build et
npm run build

# Önizleme
npm run preview
```

---

## 🎮 Kullanım Kılavuzu

### 1. Web Arayüzü

```
1. https://soyluiptv.github.io/intl → Açın
2. Dil seçin (Türkçe/İngilizce)
3. Ülkeyi seçin
4. Kanal arayın veya kategoriye göre filtreleyin
5. M3U veya Xtream kodunu kopyalayın
```

### 2. VLC Media Player

```
Medya → Açık Ağ Akışı (Open Network Stream)
URL: https://soyluiptv.github.io/intl/api/get.php?username=soylu&password=soylu123&type=m3u
Aç (Play)
```

### 3. Kodi

```
Add-ons → My Add-ons → PVR Clients
Install Xtream Codes Support
URL: https://soyluiptv.github.io/intl:80
Username: soylu
Password: soylu123
```

### 4. Perfect Player

```
Add Playlist
Portal Address: https://soyluiptv.github.io/intl:80
Username: soylu
Password: soylu123
OK
```

---

## 📡 API Endpoints

### M3U Format

```
GET /api/get.php?username=soylu&password=soylu123&type=m3u
```

**Örnek:**
```bash
curl "https://soyluiptv.github.io/intl/api/get.php?username=soylu&password=soylu123&type=m3u" \
  -H "Accept: audio/mpegurl" \
  -o playlist.m3u
```

### Xtream Codes Format

```
GET /api/get.php?username=soylu&password=soylu123&type=xtream&format=json
```

**Yanıt:**
```json
{
  "username": "soylu",
  "password": "soylu123",
  "server": "soyluiptv.github.io/intl:80",
  "protocol": "https",
  "portal": "soyluiptv"
}
```

---

## 📚 Teknik Detaylar

### Stack

- **Frontend**: SvelteKit + Svelte 5
- **Styling**: Tailwind CSS
- **Build**: Vite
- **Language**: TypeScript
- **Deployment**: GitHub Pages

### Proje Yapısı

```
src/
├── routes/          # Sayfalar
├── lib/
│   ├── components/  # Svelte bileşenleri
│   ├── models/      # TypeScript modelleri
│   ├── api.utils.ts # API yardımcıları
│   ├── lang.ts      # Çok dil desteği
│   └── store.ts     # State management
├── static/          # Static dosyalar
└── app.html         # Ana HTML
```

### NPM Komutları

```bash
npm run dev       # Geliştirme sunucusu
npm run build     # Production build
npm run preview   # Build preview
npm run lint      # Linting
npm run test      # Testler
```

---

## 🔐 Lisans ve Yasal Sorumluluk

### Lisans Türü

**Educational Use License (Eğitim Amaçlı Lisans)**

### Yasak Kullanımlar

❌ **Ticari Amaç**: Para karşılığında hizmet vermek  
❌ **Telif Hakkı İhlali**: Korumalı içerik paylaşmak  
❌ **Hak İhlali**: Başkasının haklarına tecavüz etmek  
❌ **Yasadışı Amaç**: Herhangi bir yasadışı kullanım  

### İzin Verilen Kullanımlar

✅ **Eğitim**: Okul, üniversite, kurs  
✅ **Test**: Yazılım test ve geliştirme  
✅ **Kişisel**: Bireysel öğrenme ve araştırma  
✅ **Açık Kaynak**: GitHub'da katkı sunma  

---

## ⚖️ Sorumluluk Reddi (Disclaimer)

### Platform Sorumluluğu

Bu platform:

- ❌ **Herhangi bir yasal sorumluluk KABUL ETMEMEKTEDİR**
- ❌ **Telif hakkı ihlalinden sorumlu DEĞİLDİR**
- ❌ **İçerik doğruluğunu GARANTİ ETMEMEKTEDİR**
- ❌ **Hizmet kesintisinden sorumlu DEĞİLDİR**
- ❌ **Veri kaybından sorumlu DEĞİLDİR**

### Kullanıcı Sorumluluğu

Kullanıcı bu platformu kullanarak:

✓ **Tüm yasal sorumluluğu kendisine ait olduğunu kabul eder**  
✓ **Telif hakkı yasalarına uyacağını taahhüt eder**  
✓ **Platform yöneticisini tüm sorumluluklardan azat eder**  
✓ **Yasadışı amaçla kullanmayacağını beyan eder**  

---

## 🤝 Katkı Sunma

Hataları bildir veya özellik öner:

1. [GitHub Issues](https://github.com/soyluiptv/intl/issues)
2. Pull Request gönder
3. Dokümantasyon geliştir

---

## 📞 İletişim & Destek

- **GitHub**: https://github.com/soyluiptv/intl
- **Issues**: Hata raporları ve öneriler
- **Wiki**: Teknik dokümantasyon
- **Discussions**: Soru ve tartışmalar

---

## 📖 Öğrenme Kaynakları

- [SvelteKit Dokümantasyonu](https://kit.svelte.dev)
- [M3U Format](https://en.wikipedia.org/wiki/M3U)
- [Xtream Codes API](https://xtream-codes.com)
- [IPTV Nedir?](https://tr.wikipedia.org/wiki/IPTV)

---

## ⚠️ HAZIRBULUNUŞLUK

**Bu platform EĞITIM ve TEST amaçlıdır.**

- Ticari kullanım YASAKTIR
- Telif hakkı yasalarına uyun
- Kendi sorumluluğunuzda kullanın
- Yasal sorunlardan yönetim sorumlu DEĞİLDİR

---

**❤️ Eğitim ve Öğrenme İçin Açık Kaynak - Open Source for Education**

**Last Updated: January 20, 2026**
**License: Educational Use Only**
