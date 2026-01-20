import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { loadData } from '$lib/api'

/**
 * Xtream Codes compatible API endpoint
 * GET /api/get.php?username=soylu&password=soylu123&type=m3u
 * GET /api/get.php?username=soylu&password=soylu123&type=xtream
 */
export const GET: RequestHandler = async ({ url }) => {
  try {
    const username = url.searchParams.get('username') || 'soylu'
    const password = url.searchParams.get('password') || 'soylu123'
    const type = url.searchParams.get('type') || 'm3u'
    const country = url.searchParams.get('country')

    // Validate credentials
    if (username !== 'soylu' || password !== 'soylu123') {
      return json({ message: 'Invalid credentials' }, { status: 401 })
    }

    // Load real data
    const data = await loadData()

    // Filter channels by country if specified
    let channels = data.channels
    if (country) {
      channels = channels.filter(c => c.country === country.toUpperCase())
    }

    if (type === 'm3u') {
      // Generate M3U playlist with real channel data
      let m3uContent = '#EXTM3U\n'

      for (const channel of channels) {
        if (!channel.feeds || channel.feeds.length === 0) continue

        const tvgId = channel.id || channel.name.replace(/\s+/g, '_')
        const tvgName = channel.name
        const tvgLogo = channel.logos && channel.logos.length > 0 ? ` tvg-logo="${channel.logos[0].src}"` : ''
        const categories = channel._categories || []
        const group = categories.length > 0 ? categories[0].name : 'Uncategorized'

        // Get the best feed/stream
        const feed = channel.feeds[0]
        let streamUrl = ''

        if (feed && feed.feeds && feed.feeds.length > 0) {
          streamUrl = feed.feeds[0].url || `https://soyluiptv.github.io/intl/api/stream.php?channel_id=${tvgId}`
        } else if (channel.website) {
          streamUrl = `https://soyluiptv.github.io/intl/api/stream.php?channel_id=${tvgId}`
        } else {
          continue
        }

        m3uContent += `#EXTINF:-1${tvgLogo} group-title="${group}",${tvgName}\n`
        m3uContent += `${streamUrl}\n`
      }

      return new Response(m3uContent, {
        headers: {
          'Content-Type': 'audio/mpegurl; charset=utf-8',
          'Content-Disposition': `attachment; filename="soyluiptv-${country || 'all'}-${Date.now()}.m3u"`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      })
    }

    if (type === 'xtream') {
      // Generate Xtream Codes playlist format
      let m3uContent = '#EXTM3U\n'

      for (const channel of channels) {
        if (!channel.feeds || channel.feeds.length === 0) continue

        const tvgId = channel.id || channel.name.replace(/\s+/g, '_')
        const tvgName = channel.name
        const tvgLogo = channel.logos && channel.logos.length > 0 ? ` tvg-logo="${channel.logos[0].src}"` : ''
        const categories = channel._categories || []
        const group = categories.length > 0 ? categories[0].name : 'Uncategorized'

        m3uContent += `#EXTINF:-1${tvgLogo} group-title="${group}",${tvgName}\n`
        m3uContent += `https://soyluiptv.github.io/intl/api/stream.php?channel_id=${tvgId}&username=${username}&password=${password}\n`
      }

      return new Response(m3uContent, {
        headers: {
          'Content-Type': 'audio/mpegurl; charset=utf-8',
          'Content-Disposition': `attachment; filename="xtream-${country || 'all'}-${Date.now()}.m3u"`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      })
    }

    // Default response with statistics
    return json({
      success: true,
      message: 'Soylu IPTV API',
      username,
      channels: channels.length,
      country: country || 'all',
      endpoints: {
        m3u: `https://soyluiptv.github.io/intl/api/get.php?username=${username}&password=${password}&type=m3u${country ? `&country=${country}` : ''}`,
        xtream: `https://soyluiptv.github.io/intl/api/get.php?username=${username}&password=${password}&type=xtream${country ? `&country=${country}` : ''}`,
      },
    })
  } catch (error) {
    console.error('API Error:', error)
    return json({ error: 'Internal Server Error', message: String(error) }, { status: 500 })
  }
}
