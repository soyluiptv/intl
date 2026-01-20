import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { loadData } from '$lib/api'

/**
 * Stream proxy and fetch endpoint
 * GET /api/stream.php?channel_id=AhiTV.tr
 */
export const GET: RequestHandler = async ({ url }) => {
  try {
    const channelId = url.searchParams.get('channel_id')
    const username = url.searchParams.get('username') || 'soylu'
    const password = url.searchParams.get('password') || 'soylu123'

    if (!channelId) {
      return json({ error: 'channel_id parameter required' }, { status: 400 })
    }

    // Load real data
    const data = await loadData()

    // Find the channel
    const channel = data.channels.find(c => c.id === channelId)
    if (!channel) {
      return json({ error: 'Channel not found' }, { status: 404 })
    }

    // Get stream URL from feeds
    if (channel.feeds && channel.feeds.length > 0) {
      const feed = channel.feeds[0]
      if (feed.feeds && feed.feeds.length > 0) {
        const streamUrl = feed.feeds[0].url

        if (streamUrl) {
          // Return stream info
          return json({
            success: true,
            channel: channel.name,
            channel_id: channelId,
            stream_url: streamUrl,
            logo: channel.logos?.[0]?.src,
          })
        }
      }
    }

    // Return a placeholder if no stream found
    return json({
      success: false,
      message: 'No active stream found for this channel',
      channel: channel.name,
      channel_id: channelId,
    }, { status: 404 })
  } catch (error) {
    console.error('Stream Error:', error)
    return json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
