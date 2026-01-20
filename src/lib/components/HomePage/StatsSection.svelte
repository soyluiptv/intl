<script lang="ts">
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

<section class="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
  <div class="max-w-6xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="text-center">
        <div class="text-5xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent mb-2">
          {isLoading ? '...' : `${(stats.channels / 1000).toFixed(1)}K+`}
        </div>
        <p class="text-gray-600 dark:text-gray-400">Canlı TV Kanalı</p>
        <p class="text-sm text-gray-500 dark:text-gray-500 mt-1">Dünya çapında</p>
      </div>
      <div class="text-center">
        <div class="text-5xl font-bold bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent mb-2">
          {isLoading ? '...' : stats.countries}
        </div>
        <p class="text-gray-600 dark:text-gray-400">Ülke Desteği</p>
        <p class="text-sm text-gray-500 dark:text-gray-500 mt-1">Her kıtadan</p>
      </div>
      <div class="text-center">
        <div class="text-5xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent mb-2">
          {isLoading ? '...' : `${(stats.feeds / 1000).toFixed(1)}K+`}
        </div>
        <p class="text-gray-600 dark:text-gray-400">Yayın Kaynağı</p>
        <p class="text-sm text-gray-500 dark:text-gray-500 mt-1">Güvenilir akışlar</p>
      </div>
    </div>
  </div>
</section>
