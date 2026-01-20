<script lang="ts">
  import { navigate } from '$lib/navigation'

  interface Props {
    stats: {
      channels: number
      countries: number
      feeds: number
    }
    isLoading: boolean
  }

  let { stats, isLoading }: Props = $props()
</script>

<section class="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-24 px-4 sm:px-6 lg:px-8">
  <!-- Dekoratif elementler -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
    <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
  </div>

  <div class="relative max-w-6xl mx-auto text-center">
    <!-- Logo/Başlık -->
    <div class="mb-8">
      <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4">
        Soylu <span class="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">IPTV</span>
      </h1>
      <p class="text-xl text-gray-300 max-w-2xl mx-auto">
        Profesyonel IPTV platformu. M3U playlists, Xtream Codes API ve Perfect Player desteği ile kesintisiz yayın izleme.
      </p>
    </div>

    <!-- İstatistikler -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
      <div class="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-6">
        <div class="text-4xl font-bold text-blue-400 mb-2">
          {isLoading ? '...' : stats.channels.toLocaleString()}
        </div>
        <div class="text-gray-300">Tv Kanalı</div>
      </div>
      <div class="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-6">
        <div class="text-4xl font-bold text-purple-400 mb-2">
          {isLoading ? '...' : stats.countries.toLocaleString()}
        </div>
        <div class="text-gray-300">Ülke</div>
      </div>
      <div class="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-6">
        <div class="text-4xl font-bold text-green-400 mb-2">
          {isLoading ? '...' : stats.feeds.toLocaleString()}
        </div>
        <div class="text-gray-300">Yayın Kaynağı</div>
      </div>
    </div>

    <!-- CTA Butonları -->
    <div class="flex flex-col sm:flex-row gap-4 justify-center mt-12">
      <a href="/browse" class="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-lg transition-all transform hover:scale-105">
        🎬 Kanalları Gözat
      </a>
      <a href="/setup" class="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg border border-white/30 transition-all">
        📱 Nasıl Kurulur?
      </a>
      <a href="/api" class="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg border border-white/30 transition-all">
        🔌 API Dokümantasyonu
      </a>
    </div>
  </div>
</section>

<style>
  @keyframes blob {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
  }

  :global(.animate-blob) {
    animation: blob 7s infinite;
  }

  :global(.animation-delay-2000) {
    animation-delay: 2s;
  }
</style>
