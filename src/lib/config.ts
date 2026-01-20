// Configuration for Soylu IPTV
export const CONFIG = {
  SITE_NAME: 'Soylu IPTV',
  SITE_DOMAIN: 'soyluiptv.github.io',
  SITE_ORIGIN: 'https://soyluiptv.github.io/intl',
  API_BASE: 'https://soyluiptv.github.io/intl/api',
  
  // Default credentials for demo
  DEFAULT_USERNAME: 'soylu',
  DEFAULT_PASSWORD: 'soylu123',
  
  // Supported API types
  API_TYPES: {
    M3U: 'm3u',
    XTREAM: 'xtream',
  },

  // Languages
  LANGUAGES: {
    TR: 'tr',
    EN: 'en',
  },

  // Categories
  CATEGORIES: [
    'Haberler',
    'Spor',
    'Yüksek Tanım',
    'Film',
    'Dizi',
    'Belgesel',
    'Eğlence',
    'Müzik',
    'Çocuk',
  ],
}

export const TRANSLATIONS = {
  tr: {
    title: 'Soylu IPTV',
    subtitle: 'Türkiye\'nin En İyi IPTV Platformu',
    search: 'Ara',
    channels: 'Kanallar',
    categories: 'Kategoriler',
    m3u: 'M3U Dosyası',
    xtream: 'Xtream Kodu',
    download: 'İndir',
    copy: 'Kopyala',
    username: 'Kullanıcı Adı',
    password: 'Şifre',
    generatePlaylist: 'Oynatma Listesi Oluştur',
    apiEndpoint: 'API Endpoint',
    selectCountry: 'Ülke Seçin',
    selectCategory: 'Kategori Seçin',
    noChannels: 'Kanal bulunamadı',
    totalChannels: 'Toplam Kanallar',
  },
  en: {
    title: 'Soylu IPTV',
    subtitle: 'The Best IPTV Platform',
    search: 'Search',
    channels: 'Channels',
    categories: 'Categories',
    m3u: 'M3U File',
    xtream: 'Xtream Code',
    download: 'Download',
    copy: 'Copy',
    username: 'Username',
    password: 'Password',
    generatePlaylist: 'Generate Playlist',
    apiEndpoint: 'API Endpoint',
    selectCountry: 'Select Country',
    selectCategory: 'Select Category',
    noChannels: 'No channels found',
    totalChannels: 'Total Channels',
  },
}
