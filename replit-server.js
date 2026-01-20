const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

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
      <title>SOYLU IPTV - API</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; background: #f5f5f5; }
        .container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #333; }
        .endpoint { background: #f0f0f0; padding: 15px; margin: 15px 0; border-left: 4px solid #007bff; font-family: monospace; }
        .example { color: #666; font-size: 0.9em; margin-top: 10px; }
        code { background: #f9f9f9; padding: 2px 6px; border-radius: 3px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🎬 SOYLU IPTV API</h1>
        <p>Bütün kanallar gerçek veri ile çalışıyor!</p>
        
        <h2>API Endpoint</h2>
        <div class="endpoint">
          GET /get.php
          <div class="example">
            ?username=soylu&password=soylu123&type=m3u&country=TR
          </div>
        </div>

        <h2>Parametreler</h2>
        <ul>
          <li><code>username</code>: soylu</li>
          <li><code>password</code>: soylu123</li>
          <li><code>type</code>: m3u, xtream, json</li>
          <li><code>country</code>: İsteğe bağlı (TR, US, GB, vb.)</li>
        </ul>

        <h2>Örnekler</h2>
        <div class="endpoint">
          M3U (Türkçe):
          <div class="example">/get.php?username=soylu&password=soylu123&type=m3u&country=TR</div>
        </div>
        <div class="endpoint">
          Xtream Codes:
          <div class="example">/get.php?username=soylu&password=soylu123&type=xtream</div>
        </div>

        <h2>🌐 Web Site</h2>
        <p><a href="https://soyluiptv.github.io/intl">https://soyluiptv.github.io/intl</a></p>

        <p style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 0.9em;">
          Eğitim amaçlı | Educational Purpose
        </p>
      </div>
    </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ SOYLU IPTV API http://0.0.0.0:${PORT}`);
  console.log(`📡 Bağlantı: http://localhost:${PORT}/get.php?username=soylu&password=soylu123&type=m3u`);
});
