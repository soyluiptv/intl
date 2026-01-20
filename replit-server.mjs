import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());

// Kimlik doğrulama
const VALID_USERNAME = 'soylu';
const VALID_PASSWORD = 'soylu123';

// Veri yükleme
function loadChannelsData() {
  try {
    const channelsPath = path.join(__dirname, 'temp', 'data', 'channels.json');
    const categoriesPath = path.join(__dirname, 'temp', 'data', 'categories.json');
    
    const channels = JSON.parse(fs.readFileSync(channelsPath, 'utf8'));
    const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
    
    return { channels, categories };
  } catch (error) {
    console.error('Veri yükleme hatası:', error.message);
    return { channels: [], categories: [] };
  }
}

// M3U/JSON Endpoint
app.get('/get.php', (req, res) => {
  const { username, password, type = 'playlist', country } = req.query;

  // Kimlik doğrula
  if (username !== VALID_USERNAME || password !== VALID_PASSWORD) {
    return res.status(401).json({ error: 'Geçersiz kullanıcı adı veya şifre' });
  }

  const { channels, categories } = loadChannelsData();

  // Ülkeye göre filtrele
  let filteredChannels = channels;
  if (country) {
    filteredChannels = channels.filter(ch => ch.country && ch.country.toUpperCase() === country.toUpperCase());
  }

  // M3U formatı
  if (type === 'm3u' || type === 'playlist') {
    let m3uContent = '#EXTM3U\n';
    
    filteredChannels.slice(0, 500).forEach(channel => {
      const tvgName = channel.name;
      const tvgId = channel.name.toLowerCase().replace(/\s+/g, '-');
      const tvgLogo = channel.logos && channel.logos.length > 0 ? channel.logos[0].src : '';
      const group = categories.length > 0 ? categories[0].name : 'Uncategorized';
      
      m3uContent += `#EXTINF:-1 tvg-id="${tvgId}" tvg-name="${tvgName}" tvg-logo="${tvgLogo}" group-title="${group}",${tvgName}\n`;
      m3uContent += `${channel.url || '#'}\n`;
    });

    res.setHeader('Content-Type', 'audio/mpegurl; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="playlist-${country || 'all'}-${new Date().toISOString().split('T')[0]}.m3u"`);
    return res.send(m3uContent);
  }

  // Xtream Codes JSON formatı
  if (type === 'xtream' || type === 'json') {
    const response = {
      user_info: {
        username: VALID_USERNAME,
        password: VALID_PASSWORD,
        auth: 1,
        status: 'Active',
        exp_date: 999999999,
        is_trial: 0
      },
      channels: filteredChannels.slice(0, 500).map(channel => ({
        name: channel.name,
        stream_id: channel.id,
        stream_icon: channel.logos && channel.logos.length > 0 ? channel.logos[0].src : '',
        category_id: 1,
        added: new Date().toISOString(),
        is_adult: 0,
        category_name: 'TV',
        stream_type: 'live'
      })),
      total_channels: filteredChannels.length
    };

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.json(response);
  }

  // Varsayılan: JSON döndür
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.json({
    total_channels: filteredChannels.length,
    sample_channels: filteredChannels.slice(0, 10).map(ch => ({
      name: ch.name,
      country: ch.country,
      url: ch.url
    }))
  });
});

// Sağlık kontrolü
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Ana sayfa
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="tr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>SOYLU IPTV - API Sunucusu</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 900px; margin: 0; padding: 40px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; }
        .container { background: white; padding: 40px; border-radius: 15px; box-shadow: 0 10px 40px rgba(0,0,0,0.3); }
        h1 { color: #333; margin-top: 0; }
        .status { color: #22c55e; font-weight: bold; font-size: 1.2em; }
        .endpoint { background: #f0f0f0; padding: 15px; margin: 20px 0; border-left: 5px solid #667eea; border-radius: 5px; font-family: monospace; overflow-x: auto; }
        code { background: #f5f5f5; padding: 2px 6px; border-radius: 3px; }
        ul { line-height: 1.8; }
        .example-urls { background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0; }
        a { color: #667eea; text-decoration: none; }
        a:hover { text-decoration: underline; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 0.9em; }
        .success { color: #22c55e; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🎬 SOYLU IPTV - API Sunucusu</h1>
        <p class="status">✅ Sunucu Çalışıyor</p>
        
        <h2>🎯 Hızlı Başlama</h2>
        <div class="example-urls">
          <strong>M3U Playlist (Türkçe):</strong><br>
          <code>http://localhost:3000/get.php?username=soylu&password=soylu123&type=m3u&country=TR</code>
          <br><br>
          <strong>VLC'de Açmak:</strong>
          <ol>
            <li>VLC → Medya → Açık Ağ Akışı</li>
            <li>Yukarıdaki URL'yi yapıştır</li>
            <li>Play ▶️</li>
          </ol>
        </div>

        <h2>📡 API Endpoints</h2>
        
        <h3>M3U Playlist</h3>
        <div class="endpoint">
          GET /get.php?username=soylu&password=soylu123&type=m3u&country=TR
        </div>
        
        <h3>Xtream Codes (Perfect Player)</h3>
        <div class="endpoint">
          GET /get.php?username=soylu&password=soylu123&type=xtream
        </div>
        
        <h3>JSON Format</h3>
        <div class="endpoint">
          GET /get.php?username=soylu&password=soylu123&type=json
        </div>

        <h2>🔑 Kimlik Bilgileri</h2>
        <ul>
          <li><code>username</code>: <strong>soylu</strong></li>
          <li><code>password</code>: <strong>soylu123</strong></li>
          <li><code>type</code>: m3u, xtream, json</li>
          <li><code>country</code>: TR, US, GB, vb. (isteğe bağlı)</li>
        </ul>

        <h2>✨ Desteklenen Ülkeler</h2>
        <p>231+ ülke: TR, US, GB, DE, FR, IT, ES, RU, JP, CN ve daha fazlası</p>

        <h2>🎮 Oynatıcı Kurulumu</h2>
        
        <h3>Perfect Player (Android)</h3>
        <ol>
          <li>Perfect Player aç</li>
          <li>Add Playlist → Xtream Codes</li>
          <li>Portal: http://localhost:3000</li>
          <li>Username: soylu | Password: soylu123</li>
          <li>OK tıkla ✅</li>
        </ol>

        <h2>📊 Sunucu Bilgisi</h2>
        <ul>
          <li>Toplam Kanallar: 38,964+</li>
          <li>Ülkeler: 250+</li>
          <li>CORS: Etkinleştirildi</li>
          <li>Ücretsiz: Ömür boyu</li>
        </ul>

        <div class="footer">
          <p><strong>🌐 Web Site:</strong> <a href="https://soyluiptv.github.io/intl">https://soyluiptv.github.io/intl</a></p>
          <p><strong>🐙 GitHub:</strong> <a href="https://github.com/soyluiptv/intl">https://github.com/soyluiptv/intl</a></p>
          <p class="success">Eğitim amaçlı | Educational Purpose</p>
        </div>
      </div>
    </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ SOYLU IPTV API Sunucusu başlatıldı`);
  console.log(`📡 http://0.0.0.0:${PORT}`);
  console.log(`🎬 M3U: http://localhost:${PORT}/get.php?username=soylu&password=soylu123&type=m3u`);
  console.log(`🌐 Web: http://localhost:${PORT}`);
});
