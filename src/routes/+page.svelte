<script lang="ts">
  import { NavBar, BottomBar, CountryList, SearchField, SearchSyntaxPopup } from '$lib/components'
  import store, { searchResults, query, downloadMode, updateSearchResults } from '$lib/store'
  import { setPageTitle, setSearchParam } from '$lib/navigation'
  import type { Context } from 'svelte-simple-modal'
  import { afterNavigate } from '$app/navigation'
  import { onMount, getContext } from 'svelte'
  import { Country } from '$lib/models'
  import { page } from '$app/state'
  import * as api from '$lib/api'

  const { open } = getContext<Context>('simple-modal')

  let countries: Country[] = $state([])
  let isLoading = $state(true)
  let showHero = $state(true)
  let stats = $state({
    channels: 0,
    countries: 0,
    feeds: 0
  })

  onMount(async () => {
    isLoading = true

    const data = await api.loadData()

    countries = data.countries

    stats = {
      channels: data.channels.length,
      countries: data.countries.length,
      feeds: data.feeds.length
    }

    store.init(data)

    isLoading = false

    updateSearchResults()
  })

  afterNavigate(() => {
    const searchQuery = page.url.searchParams.get('q')

    if (searchQuery) {
      query.set(decodeURIComponent(searchQuery))
      setPageTitle(searchQuery)
    } else {
      setPageTitle(null)
    }

    if (isLoading) return

    setTimeout(() => {
      updateSearchResults()
    }, 0)
  })

  let scrollY = $state(0)

  function showSearchSyntax(event) {
    event.preventDefault()
    open(
      SearchSyntaxPopup,
      {},
      { transitionBgProps: { duration: 0 }, transitionWindowProps: { duration: 0 } }
    )
  }

  let searchField: SearchField
  function focusOnSearchField() {
    if (searchField) searchField.focus()
  }

  function onSearch() {
    setSearchParam('q', $query)
    updateSearchResults()
  }

  function resetSearch() {
    query.set('')
    focusOnSearchField()
  }</script>

<svelte:window bind:scrollY />
<svelte:head>
  <title>Soylu IPTV - Profesyonel IPTV Platformu</title>
  <meta name="description" content="Soylu IPTV: M3U playlists, Xtream Codes API, Perfect Player desteği ile profesyonel IPTV hizmeti. Türkiye'nin en iyi IPTV platformu." />
  <meta name="keywords" content="IPTV, M3U, Xtream Codes, Perfect Player, TV Kanalları, Canlı Yayın, Türk Kanalları" />
  <meta property="og:title" content="Soylu IPTV - Profesyonel IPTV Platformu" />
  <meta property="og:description" content="Türkiye'nin en iyi IPTV platformu. M3U ve Xtream Codes API desteği. 38K+ canlı kanal." />
  <meta property="og:type" content="website" />
</svelte:head>

<header
  class:absolute={scrollY <= 150}
  class:fixed={scrollY > 150}
  class="z-20 w-full min-w-[360px] flex items-center"
  style="top: {scrollY > 150 && scrollY <= 210 ? scrollY - 210 : 0}px"
>
  <NavBar onSearchButtonClick={focusOnSearchField} />
</header>

<main class="bg-slate-50 dark:bg-primary-850 min-h-screen min-w-[360px]">
  {#if showHero}
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-24 px-4 sm:px-6 lg:px-8">
      <!-- Dekoratif elementler -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style="animation-delay: 2s;"></div>
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
              {isLoading ? '...' : `${(stats.channels / 1000).toFixed(1)}K+`}
            </div>
            <div class="text-gray-300">Tv Kanalı</div>
          </div>
          <div class="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-6">
            <div class="text-4xl font-bold text-purple-400 mb-2">
              {isLoading ? '...' : stats.countries}
            </div>
            <div class="text-gray-300">Ülke</div>
          </div>
          <div class="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-6">
            <div class="text-4xl font-bold text-green-400 mb-2">
              {isLoading ? '...' : `${(stats.feeds / 1000).toFixed(1)}K+`}
            </div>
            <div class="text-gray-300">Yayın Kaynağı</div>
          </div>
        </div>

        <!-- CTA Butonları -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <button 
            onclick={() => showHero = false}
            class="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-lg transition-all transform hover:scale-105"
          >
            🎬 Kanalları Gözat
          </button>
          <a href="#howto" class="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg border border-white/30 transition-all">
            📱 Nasıl Kurulur?
          </a>
          <a href="#api" class="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg border border-white/30 transition-all">
            🔌 API Dokümantasyonu
          </a>
        </div>
      </div>
    </section>

    <!-- Özellikler Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            ✨ Özellikler
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400">
            Soylu IPTV'nin sunduğu güçlü özellikler
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- M3U Playlists -->
          <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div class="text-4xl mb-4">📺</div>
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-3">M3U Playlists</h3>
            <p class="text-gray-700 dark:text-gray-300">
              VLC, Kodi ve diğer IPTV oynatıcıları ile uyumlu M3U playlist dosyaları.
            </p>
          </div>

          <!-- Xtream Codes API -->
          <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800 rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div class="text-4xl mb-4">🔌</div>
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-3">Xtream Codes API</h3>
            <p class="text-gray-700 dark:text-gray-300">
              Perfect Player, IPTV Smarters ile tamamen uyumlu API desteği.
            </p>
          </div>

          <!-- HD Logolar -->
          <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-800 rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div class="text-4xl mb-4">🎨</div>
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-3">HD Logolar</h3>
            <p class="text-gray-700 dark:text-gray-300">
              Tüm kanallar için yüksek çözünürlüklü logolar ve profesyonel görünüm.
            </p>
          </div>

          <!-- Kategorilere Göre Filtreleme -->
          <div class="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border border-orange-200 dark:border-orange-800 rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div class="text-4xl mb-4">🎯</div>
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-3">Kategoriler</h3>
            <p class="text-gray-700 dark:text-gray-300">
              Kanalları kategorilere göre filtrele. Hızlı ve kolay arama.
            </p>
          </div>

          <!-- Responsive Tasarım -->
          <div class="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border border-red-200 dark:border-red-800 rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div class="text-4xl mb-4">📱</div>
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-3">Responsive Tasarım</h3>
            <p class="text-gray-700 dark:text-gray-300">
              Mobil, tablet ve masaüstü cihazlarda mükemmel uyum.
            </p>
          </div>

          <!-- Açık Kaynak -->
          <div class="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div class="text-4xl mb-4">🔓</div>
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-3">Açık Kaynak</h3>
            <p class="text-gray-700 dark:text-gray-300">
              Tamamen ücretsiz ve açık kaynak. GitHub'da kaynak kodu inceleyebilir.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Nasıl Kurulur Section -->
    <section id="howto" class="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            📖 Nasıl Kurulur?
          </h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- M3U -->
          <div class="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-lg">
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">📺 M3U Kurulumu</h3>
            <div class="bg-slate-100 dark:bg-slate-800 rounded p-3 font-mono text-sm text-gray-800 dark:text-gray-200 overflow-auto mb-4">
              https://soyluiptv.github.io/intl/api/get.php?username=soylu&password=soylu123&type=m3u
            </div>
            <ul class="space-y-2 text-gray-600 dark:text-gray-400">
              <li>✅ VLC: Media → Açık Ağ Akışı → Yapıştır</li>
              <li>✅ Kodi: Addons → PVR Clients → Ekle</li>
              <li>✅ IPTV-M3U: Dosyayı doğrudan import et</li>
            </ul>
          </div>

          <!-- Xtream Codes -->
          <div class="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-lg">
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">🔌 Xtream Codes (Perfect Player)</h3>
            <div class="bg-slate-100 dark:bg-slate-800 rounded p-3 text-sm space-y-2 mb-4">
              <div class="text-gray-800 dark:text-gray-200"><span class="font-bold">Portal:</span> https://soyluiptv.github.io/intl</div>
              <div class="text-gray-800 dark:text-gray-200"><span class="font-bold">Username:</span> soylu</div>
              <div class="text-gray-800 dark:text-gray-200"><span class="font-bold">Password:</span> soylu123</div>
            </div>
            <ul class="space-y-2 text-gray-600 dark:text-gray-400">
              <li>✅ Perfect Player: Add Playlist → Xtream Codes</li>
              <li>✅ Bilgileri gir ve kaydet</li>
              <li>✅ Kanallar otomatik yüklenir</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- API Section -->
    <section id="api" class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl sm:text-5xl font-bold text-white mb-4">
            🔌 API Endpoints
          </h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-8">
            <div class="text-2xl font-bold text-blue-300 mb-4">📺 M3U Playlist</div>
            <div class="bg-slate-900 rounded p-3 text-sm text-green-300 font-mono overflow-auto mb-4">
              /api/get.php?type=m3u&country=TR
            </div>
            <p class="text-gray-300 text-sm">Türkiye'deki tüm kanalların M3U listesi</p>
          </div>

          <div class="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-8">
            <div class="text-2xl font-bold text-purple-300 mb-4">🔌 Xtream Codes</div>
            <div class="bg-slate-900 rounded p-3 text-sm text-green-300 font-mono overflow-auto mb-4">
              Portal: https://soyluiptv.github.io/intl
            </div>
            <p class="text-gray-300 text-sm">Perfect Player ile doğrudan bağlantı</p>
          </div>
        </div>
      </div>
    </section>
  {/if}

  <section class="max-w-[960px] mx-auto px-2 {showHero ? 'pt-4' : 'pt-16 sm:pt-20'} pb-20 overflow-hidden min-h-full">
    <SearchField onSubmit={onSearch} onClear={resetSearch} />
    <div class="pt-2 pb-6 flex justify-between px-1">
      <span class="inline-flex text-sm text-gray-500 dark:text-gray-400 font-mono pt-0.5"
        >Bulundu&nbsp;
        <span class:animate-spin={isLoading}
          >{!isLoading ? $searchResults.length.toLocaleString() : '/'}</span
        >
        &nbsp;kanal</span
      >
      <button
        type="button"
        onclick={showSearchSyntax}
        class="inline-flex text-sm text-gray-500 dark:text-gray-400 font-mono hover:underline hover:text-blue-500 dark:hover:text-blue-400 pt-0.5 cursor-pointer"
      >
        Arama sözdizimi
      </button>
    </div>
    {#if isLoading}
      <div
        class="flex items-center justify-center w-full pt-1 pb-6 tracking-tight text-sm text-gray-500 dark:text-gray-400 font-mono"
      >
        yükleniyor...
      </div>
    {/if}
    <CountryList {countries} />
  </section>
</main>

{#if $downloadMode}
  <BottomBar />
{/if}
