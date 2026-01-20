import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001

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
      return res.status(500).json({ error: 'Data files not found' })
    }

    const channels = JSON.parse(fs.readFileSync(channelsPath, 'utf-8'))
    const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8'))

    // Filter by country
    let filtered = channels
    if (country) {
      filtered = channels.filter((c) => c.country === country.toUpperCase())
    }

    if (type === 'm3u') {
      let m3u = '#EXTM3U\n'

      for (const channel of filtered.slice(0, 100)) {
        const cat = categories.find((c) => channel.categories?.includes(c.id))
        const group = cat?.name || 'General'

        m3u += `#EXTINF:-1 group-title="${group}",${channel.name}\n`
        m3u += `http://localhost:${PORT}/stream/${channel.id}.m3u8\n`
      }

      res.setHeader('Content-Type', 'audio/mpegurl; charset=utf-8')
      res.setHeader('Content-Disposition', `attachment; filename="soyluiptv-${country || 'all'}.m3u"`)
      return res.send(m3u)
    }

    res.json({
      success: true,
      message: 'Soylu IPTV API',
      username,
      channels: filtered.length,
      country: country || 'all',
      endpoints: {
        m3u: `/get.php?username=${username}&password=${password}&type=m3u${country ? `&country=${country}` : ''}`,
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Soylu IPTV API Server çalışıyor: http://localhost:${PORT}`)
  console.log(`📺 M3U Playlist: http://localhost:${PORT}/get.php?username=soylu&password=soylu123&type=m3u&country=TR`)
})
