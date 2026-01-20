import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

// CORS - Herkese açık
app.use(cors())

// M3U endpoint
app.get('/get.php', (req, res) => {
  try {
    const { username, password, type, country } = req.query

    // Validate credentials
    if (username !== 'soylu' || password !== 'soylu123') {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Load channel data
    const channelsPath = path.join(__dirname, 'temp/data/channels.json')
    const categoriesPath = path.join(__dirname, 'temp/data/categories.json')

    if (!fs.existsSync(channelsPath)) {
      return res.status(500).json({ error: 'Data files not found - contact administrator' })
    }

    const channels = JSON.parse(fs.readFileSync(channelsPath, 'utf-8'))
    const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8'))

    // Filter by country
    let filtered = channels
    if (country) {
      filtered = channels.filter((c) => c.country === country.toUpperCase())
    }

    if (type === 'm3u' || type === 'm3') {
      let m3u = '#EXTM3U\n'

      for (const channel of filtered) {
        const cat = categories.find((c) => channel.categories?.includes(c.id))
        const group = cat?.name || 'General'

        m3u += `#EXTINF:-1 group-title="${group}",${channel.name}\n`
        m3u += `https://soyluiptv.github.io/intl/stream/${channel.id}.m3u8\n`
      }

      res.setHeader('Content-Type', 'audio/mpegurl; charset=utf-8')
      res.setHeader('Content-Disposition', `attachment; filename="soyluiptv-${country || 'all'}-${Date.now()}.m3u"`)
      return res.send(m3u)
    }

    if (type === 'json') {
      return res.json({
        success: true,
        message: 'Soylu IPTV API',
        username,
        channels: filtered.length,
        country: country || 'all',
        timestamp: new Date().toISOString()
      })
    }

    // Default response
    res.json({
      success: true,
      message: 'Soylu IPTV API - Professional IPTV Platform',
      supported_types: ['m3u', 'm3', 'json'],
      examples: {
        m3u: `/get.php?username=soylu&password=soylu123&type=m3u`,
        m3u_turkey: `/get.php?username=soylu&password=soylu123&type=m3u&country=TR`,
        json: `/get.php?username=soylu&password=soylu123&type=json`
      },
      statistics: {
        total_channels: channels.length,
        filtered_channels: filtered.length,
        country_filter: country || 'all'
      }
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: error.message })
  }
})

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Soylu IPTV API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  })
})

// Bilgi sayfası
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Soylu IPTV API</title>
        <style>
          body { font-family: sans-serif; max-width: 1000px; margin: 50px auto; padding: 20px; background: #f5f5f5; }
          .container { background: white; padding: 30px; border-radius: 10px; }
          h1 { color: #667eea; }
          code { background: #f0f0f0; padding: 2px 6px; border-radius: 3px; }
          pre { background: #222; color: #0f0; padding: 15px; border-radius: 5px; overflow-x: auto; }
          .endpoint { margin: 20px 0; padding: 15px; background: #f9f9f9; border-left: 4px solid #667eea; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🎬 Soylu IPTV API</h1>
          <p>Professional IPTV Platform with 38K+ channels</p>
          
          <h2>📺 M3U Playlist Endpoint</h2>
          <div class="endpoint">
            <p><strong>URL:</strong> <code>/get.php</code></p>
            <p><strong>Parameters:</strong></p>
            <ul>
              <li><code>username</code>: soylu</li>
              <li><code>password</code>: soylu123</li>
              <li><code>type</code>: m3u (or m3)</li>
              <li><code>country</code>: optional (e.g., TR for Turkey)</li>
            </ul>
          </div>
          
          <h2>📝 Examples</h2>
          <p><strong>All channels (M3U):</strong></p>
          <pre><code>/get.php?username=soylu&password=soylu123&type=m3u</code></pre>
          
          <p><strong>Turkish channels only:</strong></p>
          <pre><code>/get.php?username=soylu&password=soylu123&type=m3u&country=TR</code></pre>
          
          <p><strong>JSON format:</strong></p>
          <pre><code>/get.php?username=soylu&password=soylu123&type=json</code></pre>
          
          <h2>🔌 How to Use</h2>
          <ol>
            <li><strong>VLC:</strong> Media → Open Network Stream → Paste URL above</li>
            <li><strong>Kodi:</strong> Add-ons → PVR Clients → Add playlist</li>
            <li><strong>Perfect Player:</strong> Add Playlist → Xtream Codes → Use credentials above</li>
          </ol>
          
          <h2>⚠️ Important</h2>
          <p>✓ For educational purposes only<br>✓ Commercial use is prohibited<br>✓ Full responsibility is yours</p>
          
          <p style="margin-top: 40px; color: #999;">
            © 2026 Soylu IPTV | <a href="https://github.com/soyluiptv/intl" target="_blank">GitHub</a>
          </p>
        </div>
      </body>
    </html>
  `)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Soylu IPTV API Server running on port ${PORT}`)
  console.log(`📺 M3U Endpoint: http://localhost:${PORT}/get.php?username=soylu&password=soylu123&type=m3u`)
  console.log(`🌍 Web: http://localhost:${PORT}`)
})
