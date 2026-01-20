// API utilities for generating M3U and Xtream formats
import type { Channel } from '$lib/models'

interface PlaylistOptions {
  username?: string
  password?: string
  includeLogos?: boolean
}

interface XtreamDevice {
  username: string
  password: string
  server: string
  portal: string
}

/**
 * Generate M3U playlist content
 */
export function generateM3U(channels: Channel[], options: PlaylistOptions = {}): string {
  const { username = 'soylu', password = 'soylu123', includeLogos = true } = options

  let m3u = '#EXTM3U\n'

  for (const channel of channels) {
    const tvgId = channel.id || channel.name.replace(/\s+/g, '_')
    const tvgName = channel.name
    const tvgLogo = includeLogos && channel.logo ? ` tvg-logo="${channel.logo}"` : ''
    const group = channel.category || 'Uncategorized'

    m3u += `#EXTINF:-1${tvgLogo} group-title="${group}",${tvgName}\n`

    // If channel has URL, use it
    if (channel.url) {
      m3u += `${channel.url}\n`
    } else {
      // Otherwise use a placeholder that could be filled in
      m3u += `http://iptv.example.com/stream/${tvgId}\n`
    }
  }

  return m3u
}

/**
 * Generate Xtream Codes format playlist
 */
export function generateXtreamPlaylist(
  channels: Channel[],
  device: XtreamDevice
): string {
  const baseUrl = `http://${device.server}`
  const username = device.username || 'soylu'
  const password = device.password || 'soylu123'

  let playlist = '#EXTM3U\n'

  for (const channel of channels) {
    const tvgId = channel.id || channel.name.replace(/\s+/g, '_')
    const tvgName = channel.name
    const tvgLogo = channel.logo ? ` tvg-logo="${channel.logo}"` : ''
    const group = channel.category || 'Uncategorized'

    playlist += `#EXTINF:-1${tvgLogo} group-title="${group}",${tvgName}\n`
    playlist += `${baseUrl}/play/${username}/${password}/watching/${tvgId}\n`
  }

  return playlist
}

/**
 * Generate Xtream Codes device configuration
 */
export function generateXtreamConfig(
  username: string = 'soylu',
  password: string = 'soylu123'
): string {
  const config = {
    username,
    password,
    server: 'soyluiptv.github.io/intl',
    port: 80,
    protocol: 'https',
  }

  return JSON.stringify(config, null, 2)
}

/**
 * Format URL for API endpoint
 */
export function formatApiUrl(
  type: 'm3u' | 'xtream',
  username: string = 'soylu',
  password: string = 'soylu123',
  format: string = 'json'
): string {
  const baseUrl = 'https://soyluiptv.github.io/intl/api'

  if (type === 'm3u') {
    return `${baseUrl}/get.php?username=${username}&password=${password}&type=m3u`
  }

  if (type === 'xtream') {
    return `${baseUrl}/get.php?username=${username}&password=${password}&type=xtream&format=${format}`
  }

  return baseUrl
}

/**
 * Parse M3U URL to extract streams
 */
export function parseM3ULine(
  line: string
): { tvgId: string; tvgName: string; tvgLogo: string; group: string } | null {
  if (!line.startsWith('#EXTINF:')) return null

  const tvgIdMatch = line.match(/tvg-id="([^"]*)"/)
  const tvgNameMatch = line.match(/tvg-name="([^"]*)"/)
  const tvgLogoMatch = line.match(/tvg-logo="([^"]*)"/)
  const groupMatch = line.match(/group-title="([^"]*)"/)

  return {
    tvgId: tvgIdMatch?.[1] || '',
    tvgName: tvgNameMatch?.[1] || '',
    tvgLogo: tvgLogoMatch?.[1] || '',
    group: groupMatch?.[1] || 'Uncategorized',
  }
}
