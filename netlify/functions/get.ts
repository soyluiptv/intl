import { Handler } from '@netlify/functions'
import fs from 'fs'
import path from 'path'

const handler: Handler = async (event, context) => {
  try {
    const { username, password, type, country } = event.queryStringParameters || {}

    // Validate credentials
    if (username !== 'soylu' || password !== 'soylu123') {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid credentials' })
      }
    }

    // Load channel data
    const channelsPath = path.join(process.cwd(), 'temp/data/channels.json')
    const categoriesPath = path.join(process.cwd(), 'temp/data/categories.json')
    
    if (!fs.existsSync(channelsPath)) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Data files not found' })
      }
    }

    const channels = JSON.parse(fs.readFileSync(channelsPath, 'utf-8'))
    const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8'))

    // Filter by country
    let filtered = channels
    if (country) {
      filtered = channels.filter((c: any) => c.country === country.toUpperCase())
    }

    if (type === 'm3u') {
      let m3u = '#EXTM3U\n'

      for (const channel of filtered.slice(0, 100)) {
        const cat = categories.find((c: any) => channel.categories?.includes(c.id))
        const group = cat?.name || 'General'

        m3u += `#EXTINF:-1 group-title="${group}",${channel.name}\n`
        m3u += `https://soyluiptv.github.io/intl/stream/${channel.id}.m3u8\n`
      }

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'audio/mpegurl' },
        body: m3u
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        channels: filtered.length,
        country: country || 'all'
      })
    }
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}

export { handler }
