import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { generateM3U, generateXtreamPlaylist, formatApiUrl } from '$lib/api.utils'

/**
 * API endpoint for generating M3U and Xtream playlists
 * GET /api/get.php?username=soylu&password=soylu123&type=m3u
 */
export const GET: RequestHandler = async ({ url }) => {
  try {
    const username = url.searchParams.get('username') || 'soylu'
    const password = url.searchParams.get('password') || 'soylu123'
    const type = url.searchParams.get('type') || 'm3u'
    const format = url.searchParams.get('format') || 'json'

    // For demo purposes, return configuration info
    if (type === 'm3u') {
      const m3uContent = `#EXTM3U
#EXTINF:-1 tvg-id="trt1" tvg-name="TRT 1" tvg-logo="https://example.com/trt1.png" group-title="Kanallar",TRT 1
http://example.com/stream/trt1

#EXTINF:-1 tvg-id="trt2" tvg-name="TRT 2" tvg-logo="https://example.com/trt2.png" group-title="Kanallar",TRT 2
http://example.com/stream/trt2

#EXTINF:-1 tvg-id="atv" tvg-name="ATV" tvg-logo="https://example.com/atv.png" group-title="Kanallar",ATV
http://example.com/stream/atv
`

      return new Response(m3uContent, {
        headers: {
          'Content-Type': 'audio/mpegurl',
          'Content-Disposition': `attachment; filename="soylu-iptv-${Date.now()}.m3u"`,
        },
      })
    }

    if (type === 'xtream') {
      const xtreamConfig = {
        username,
        password,
        server: 'soyluiptv.github.io/intl:80',
        protocol: 'https',
        portal: 'soyluiptv',
      }

      if (format === 'json') {
        return json(xtreamConfig)
      }

      // Return as text configuration
      const configText = Object.entries(xtreamConfig)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n')

      return new Response(configText, {
        headers: {
          'Content-Type': 'text/plain',
          'Content-Disposition': `attachment; filename="xtream-config.txt"`,
        },
      })
    }

    return json({
      success: true,
      message: 'API is working',
      endpoints: {
        m3u: formatApiUrl('m3u', username, password),
        xtream: formatApiUrl('xtream', username, password),
      },
    })
  } catch (error) {
    return json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
