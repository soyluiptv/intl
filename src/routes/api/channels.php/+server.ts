import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { loadData } from '$lib/api'

/**
 * Get channels list API
 * GET /api/channels.php?country=TR&category=news
 */
export const GET: RequestHandler = async ({ url }) => {
  try {
    const country = url.searchParams.get('country')
    const category = url.searchParams.get('category')
    const limit = parseInt(url.searchParams.get('limit') || '100')
    const offset = parseInt(url.searchParams.get('offset') || '0')

    // Load real data
    const data = await loadData()

    // Filter channels
    let channels = data.channels

    if (country) {
      channels = channels.filter(c => c.country === country.toUpperCase())
    }

    if (category) {
      channels = channels.filter(c => 
        c._categories?.some(cat => cat.name.toLowerCase() === category.toLowerCase())
      )
    }

    // Paginate
    const total = channels.length
    const paginatedChannels = channels.slice(offset, offset + limit)

    // Format response
    const formattedChannels = paginatedChannels.map(channel => ({
      id: channel.id,
      name: channel.name,
      country: channel.country,
      categories: channel._categories?.map(c => c.name) || [],
      website: channel.website,
      logo: channel.logos?.[0]?.src,
      has_streams: (channel.feeds || []).length > 0,
      streams_count: (channel.feeds || []).length,
    }))

    return json({
      success: true,
      total,
      limit,
      offset,
      channels: formattedChannels,
    })
  } catch (error) {
    console.error('Channels API Error:', error)
    return json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
