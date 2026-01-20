<script lang="ts">
  import { currentLang, translations } from '$lib/lang'
  import { onMount } from 'svelte'

  let lang: 'tr' | 'en' = 'tr'
  let isDismissed = $state(false)

  onMount(() => {
    currentLang.subscribe((value) => {
      lang = value
    })
    // Check if disclaimer was dismissed
    const dismissed = localStorage.getItem('disclaimerDismissed')
    if (dismissed === 'true') {
      isDismissed = true
    }
  })

  function dismissDisclaimer() {
    localStorage.setItem('disclaimerDismissed', 'true')
    isDismissed = true
  }
</script>

<div
  class="fixed bottom-0 left-0 right-0 bg-red-100 dark:bg-red-900 border-t-4 border-red-600 p-4 shadow-lg z-50 transform transition-transform {isDismissed
    ? 'translate-y-full'
    : 'translate-y-0'}"
>
  <div class="max-w-6xl mx-auto flex items-start gap-4">
    <div class="flex-1">
      <h4 class="font-bold text-red-800 dark:text-red-100 mb-2">
        {lang === 'tr' ? '⚠️ ÖNEMLİ UYARI' : '⚠️ IMPORTANT NOTICE'}
      </h4>
      <p class="text-sm text-red-700 dark:text-red-200 mb-2">
        {lang === 'tr'
          ? '✓ Bu platform EĞİTİM amaçlıdır. ✓ TİCARİ kullanım YASAKTIR. ✓ Telif hakkı yasalarına uyun. ✓ Tüm sorumluluğunuza aittir.'
          : '✓ This platform is for EDUCATIONAL purposes only. ✓ COMMERCIAL use is PROHIBITED. ✓ Comply with copyright laws. ✓ All responsibility is yours.'}
      </p>
      <a
        href="/help"
        class="text-xs underline text-red-700 dark:text-red-200 hover:text-red-900 dark:hover:text-red-100"
      >
        {lang === 'tr' ? 'Daha fazla bilgi' : 'Learn more'}
      </a>
    </div>
    <button
      onclick={dismissDisclaimer}
      class="flex-shrink-0 text-red-700 dark:text-red-200 hover:text-red-900 dark:hover:text-red-100 font-bold text-lg"
      title={lang === 'tr' ? 'Kapat' : 'Close'}
    >
      ✕
    </button>
  </div>
</div>
