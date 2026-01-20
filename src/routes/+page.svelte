<script lang="ts">
  import { onMount } from 'svelte'
  import * as api from '$lib/api'

  let stats = $state({
    channels: 0,
    countries: 0,
    feeds: 0
  })

  let isLoading = $state(true)

  onMount(async () => {
    const data = await api.loadData()
    stats = {
      channels: data.channels.length,
      countries: data.countries.length,
      feeds: data.feeds.length
    }
    isLoading = false
  })
</script>

<svelte:head>
  <title>Soylu IPTV - Profesyonel IPTV Platformu</title>
  <meta name="description" content="Soylu IPTV: 38K+ TV kanalı, M3U ve Xtream Codes API. VLC, Kodi, Perfect Player uyumlu. Tamamen ücretsiz." />
</svelte:head>

<div class="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white min-h-screen overflow-hidden">
  <!-- Animated Background -->
  <div class="fixed inset-0 overflow-hidden pointer-events-none">
    <div class="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
  </div>

  <!-- Navigation -->
  <nav class="relative z-10 max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center font-bold text-lg">
        📺
      </div>
      <h1 class="text-2xl font-bold">Soylu IPTV</h1>
    </div>
    <div class="flex gap-4">
      <a href="https://github.com/soyluiptv/intl" target="_blank" class="hover:text-blue-400 transition">GitHub</a>
      <a href="#docs" class="hover:text-blue-400 transition">Dokümantasyon</a>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
    <h2 class="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
      Profesyonel IPTV Platformu
    </h2>
    <p class="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
      38,964 TV kanalı. M3U ve Xtream Codes API. VLC, Kodi, Perfect Player uyumlu. Tamamen ücretsiz.
    </p>

    <!-- Stats -->
    <div class="grid grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto">
      <div class="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-6">
        <div class="text-4xl font-bold text-blue-400 mb-2">
          {isLoading ? '...' : (stats.channels / 1000).toFixed(0) + 'K'}
        </div>
        <div class="text-gray-300">Kanal</div>
      </div>
      <div class="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-6">
        <div class="text-4xl font-bold text-purple-400 mb-2">
          {isLoading ? '...' : stats.countries}
        </div>
        <div class="text-gray-300">Ülke</div>
      </div>
      <div class="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-6">
        <div class="text-4xl font-bold text-green-400 mb-2">
          ✅
        </div>
        <div class="text-gray-300">Canlı</div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex gap-4 justify-center flex-wrap mb-12">
      <a href="#setup" class="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-bold transition transform hover:scale-105">
        🚀 Hemen Başla
      </a>
      <a href="https://github.com/soyluiptv/intl" target="_blank" class="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg font-bold transition">
        ⭐ GitHub
      </a>
    </div>
  </section>

  <!-- Setup Section -->
  <section id="setup" class="relative z-10 max-w-7xl mx-auto px-4 py-16">
    <h3 class="text-4xl font-bold mb-12 text-center">📖 Nasıl Kurulur?</h3>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- VLC -->
      <div class="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-8 hover:bg-white/20 transition">
        <h4 class="text-2xl font-bold mb-4">📺 VLC Media Player</h4>
        <ol class="space-y-3 text-sm text-gray-300">
          <li>1. VLC'yi indir: videolan.org</li>
          <li>2. Medya → Açık Ağ Akışı</li>
          <li>3. Bu URL'yi yapıştır:</li>
          <li class="bg-slate-900 p-2 rounded text-green-300 font-mono text-xs break-all">
            https://soyluiptv.github.io/intl/playlist-tr.m3u
          </li>
          <li>4. Play ▶️</li>
        </ol>
      </div>

      <!-- Perfect Player -->
      <div class="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-8 hover:bg-white/20 transition">
        <h4 class="text-2xl font-bold mb-4">📱 Perfect Player</h4>
        <ol class="space-y-3 text-sm text-gray-300">
          <li>1. Perfect Player aç</li>
          <li>2. Add Playlist</li>
          <li>3. Xtream Codes seçim yap</li>
          <li class="bg-slate-900 p-2 rounded space-y-1 text-xs">
            <div><span class="text-blue-300">Portal:</span> <span class="text-green-300">https://soyluiptv.github.io/intl</span></div>
            <div><span class="text-blue-300">User:</span> <span class="text-green-300">soylu</span></div>
            <div><span class="text-blue-300">Pass:</span> <span class="text-green-300">soylu123</span></div>
          </li>
          <li>4. OK ✅</li>
        </ol>
      </div>

      <!-- Kodi -->
      <div class="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-8 hover:bg-white/20 transition">
        <h4 class="text-2xl font-bold mb-4">🎮 Kodi</h4>
        <ol class="space-y-3 text-sm text-gray-300">
          <li>1. Add-ons → PVR Clients</li>
          <li>2. IPTV Simple Client</li>
          <li>3. Install</li>
          <li class="bg-slate-900 p-2 rounded text-green-300 font-mono text-xs break-all">
            https://soyluiptv.github.io/intl/playlist-tr.m3u
          </li>
          <li>4. Kaydet ✅</li>
        </ol>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="relative z-10 max-w-7xl mx-auto px-4 py-16">
    <h3 class="text-4xl font-bold mb-12 text-center">✨ Özellikler</h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="flex gap-4 p-6 bg-white/10 backdrop-blur border border-white/20 rounded-lg hover:bg-white/20 transition">
        <div class="text-4xl flex-shrink-0">🎬</div>
        <div>
          <h4 class="font-bold mb-2">38K+ Canlı Kanal</h4>
          <p class="text-gray-300 text-sm">Tüm dünyadan binlerce TV kanalı. Türkçe, İngilizce, Arapça ve daha fazlası.</p>
        </div>
      </div>

      <div class="flex gap-4 p-6 bg-white/10 backdrop-blur border border-white/20 rounded-lg hover:bg-white/20 transition">
        <div class="text-4xl flex-shrink-0">📡</div>
        <div>
          <h4 class="font-bold mb-2">M3U & Xtream API</h4>
          <p class="text-gray-300 text-sm">VLC, Kodi, Perfect Player ve tüm IPTV oynatıcıları uyumlu.</p>
        </div>
      </div>

      <div class="flex gap-4 p-6 bg-white/10 backdrop-blur border border-white/20 rounded-lg hover:bg-white/20 transition">
        <div class="text-4xl flex-shrink-0">⚡</div>
        <div>
          <h4 class="font-bold mb-2">Ücretsiz & Hızlı</h4>
          <p class="text-gray-300 text-sm">Tamamen ücretsiz, hiçbir reklam yok, hiçbir gizli ücret yok.</p>
        </div>
      </div>

      <div class="flex gap-4 p-6 bg-white/10 backdrop-blur border border-white/20 rounded-lg hover:bg-white/20 transition">
        <div class="text-4xl flex-shrink-0">🔓</div>
        <div>
          <h4 class="font-bold mb-2">Açık Kaynak</h4>
          <p class="text-gray-300 text-sm">GitHub'da tamamen açık. Herkes kontrol edebilir ve geliştirebilir.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- API Section -->
  <section id="docs" class="relative z-10 max-w-7xl mx-auto px-4 py-16">
    <h3 class="text-4xl font-bold mb-12 text-center">🔌 API Endpoints</h3>

    <div class="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-8 space-y-6">
      <div>
        <h4 class="text-xl font-bold mb-3 text-blue-300">📥 M3U Playlist</h4>
        <div class="bg-slate-900 p-4 rounded font-mono text-sm text-green-300 overflow-auto">
          https://soyluiptv.github.io/intl/playlist-tr.m3u
        </div>
        <p class="text-gray-300 text-sm mt-2">Tüm Türkçe kanallar - anında indir ve oynat</p>
      </div>

      <div>
        <h4 class="text-xl font-bold mb-3 text-purple-300">🔌 Xtream Codes</h4>
        <div class="bg-slate-900 p-4 rounded space-y-2 text-sm">
          <div><span class="text-blue-300">Portal:</span> <span class="text-green-300">https://soyluiptv.github.io/intl</span></div>
          <div><span class="text-blue-300">Username:</span> <span class="text-green-300">soylu</span></div>
          <div><span class="text-blue-300">Password:</span> <span class="text-green-300">soylu123</span></div>
        </div>
        <p class="text-gray-300 text-sm mt-2">Perfect Player ve IPTV Smarters ile uyumlu</p>
      </div>

      <div>
        <h4 class="text-xl font-bold mb-3 text-green-300">📊 Tüm Ülkeler</h4>
        <div class="bg-slate-900 p-4 rounded font-mono text-sm text-green-300 overflow-auto">
          https://soyluiptv.github.io/intl/playlists/{'<country-code>'}.m3u
        </div>
        <p class="text-gray-300 text-sm mt-2">Örn: us.m3u, gb.m3u, de.m3u... 231 ülke</p>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="relative z-10 max-w-7xl mx-auto px-4 py-16 border-t border-white/10 text-center text-gray-400">
    <p class="mb-4">Made with ❤️ for everyone</p>
    <p class="text-sm">Educational Purpose Only | Open Source | Free Forever</p>
    <p class="text-xs mt-4">Telif hakkı yasalarına uyun • Sorumluluğu siz taşıyorsunuz</p>
  </footer>
</div>

<style>
  :global(body) {
    background: #0f172a;
    color: white;
  }
</style>
