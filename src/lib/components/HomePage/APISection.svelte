<script lang="ts">
</script>

<section class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-4xl sm:text-5xl font-bold text-white mb-4">
        🔌 API Dokümantasyonu
      </h2>
      <p class="text-xl text-gray-300">
        Geliştiriciler için RESTful API dokümantasyonu
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- M3U Endpoint -->
      <div class="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-8">
        <div class="text-2xl font-bold text-blue-300 mb-4">📺 M3U Endpoint</div>
        <div class="space-y-4">
          <div>
            <p class="text-sm font-mono text-gray-400 mb-2">GET /api/get.php</p>
            <div class="bg-slate-900 rounded p-3 text-sm text-gray-200 font-mono overflow-auto">
              /api/get.php?username=soylu&password=soylu123&type=m3u
            </div>
          </div>
          <div>
            <p class="text-gray-300 font-semibold mb-2">Parametreler:</p>
            <ul class="space-y-1 text-sm text-gray-400">
              <li><span class="text-blue-300">username</span> - Kullanıcı adı</li>
              <li><span class="text-blue-300">password</span> - Şifre</li>
              <li><span class="text-blue-300">type</span> - "m3u" (M3U format)</li>
            </ul>
          </div>
          <div>
            <p class="text-gray-300 font-semibold mb-2">Response:</p>
            <p class="text-sm text-gray-400">M3U format playlist dosyası (.m3u)</p>
          </div>
        </div>
      </div>

      <!-- Xtream Codes Endpoint -->
      <div class="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-8">
        <div class="text-2xl font-bold text-purple-300 mb-4">🔌 Xtream Codes API</div>
        <div class="space-y-4">
          <div>
            <p class="text-sm font-mono text-gray-400 mb-2">POST /api/get.php</p>
            <div class="bg-slate-900 rounded p-3 text-sm text-gray-200 font-mono overflow-auto">
              Portal: https://soyluiptv.github.io/intl
            </div>
          </div>
          <div>
            <p class="text-gray-300 font-semibold mb-2">Kimlik Bilgileri:</p>
            <ul class="space-y-1 text-sm text-gray-400">
              <li><span class="text-purple-300">Username:</span> soylu</li>
              <li><span class="text-purple-300">Password:</span> soylu123</li>
              <li><span class="text-purple-300">Port:</span> 80</li>
            </ul>
          </div>
          <div>
            <p class="text-gray-300 font-semibold mb-2">Destekleyen Uygulamalar:</p>
            <p class="text-sm text-gray-400">Perfect Player, IPTV Smarters, Kodi, Stalker</p>
          </div>
        </div>
      </div>

      <!-- Stream URL Endpoint -->
      <div class="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-8">
        <div class="text-2xl font-bold text-green-300 mb-4">▶️ Stream URL</div>
        <div class="space-y-4">
          <div>
            <p class="text-sm font-mono text-gray-400 mb-2">GET /api/stream.php</p>
            <div class="bg-slate-900 rounded p-3 text-sm text-gray-200 font-mono overflow-auto">
              /api/stream.php?channel_id=trt1&format=m3u8
            </div>
          </div>
          <div>
            <p class="text-gray-300 font-semibold mb-2">Parametreler:</p>
            <ul class="space-y-1 text-sm text-gray-400">
              <li><span class="text-green-300">channel_id</span> - Kanal ID'si</li>
              <li><span class="text-green-300">format</span> - "m3u8", "ts", vb.</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Channels Endpoint -->
      <div class="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-8">
        <div class="text-2xl font-bold text-orange-300 mb-4">📋 Kanallar Listesi</div>
        <div class="space-y-4">
          <div>
            <p class="text-sm font-mono text-gray-400 mb-2">GET /api/channels.php</p>
            <div class="bg-slate-900 rounded p-3 text-sm text-gray-200 font-mono overflow-auto">
              /api/channels.php?country=tr&category=sports
            </div>
          </div>
          <div>
            <p class="text-gray-300 font-semibold mb-2">Parametreler:</p>
            <ul class="space-y-1 text-sm text-gray-400">
              <li><span class="text-orange-300">country</span> - Ülke kodu (isteğe bağlı)</li>
              <li><span class="text-orange-300">category</span> - Kategori (isteğe bağlı)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Kod Örnekleri -->
    <div class="mt-12 bg-white/10 backdrop-blur border border-white/20 rounded-xl p-8">
      <h3 class="text-2xl font-bold text-white mb-6">💻 Kod Örnekleri</h3>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <p class="text-sm font-mono text-gray-400 mb-2">JavaScript/Fetch:</p>
          <pre class="bg-slate-900 rounded p-4 text-sm text-green-300 font-mono overflow-auto"><code>{`fetch('https://soyluiptv.github.io/intl/api/get.php?type=m3u')
  .then(res => res.text())
  .then(data => console.log(data))`}</code></pre>
        </div>
        <div>
          <p class="text-sm font-mono text-gray-400 mb-2">Python:</p>
          <pre class="bg-slate-900 rounded p-4 text-sm text-green-300 font-mono overflow-auto"><code>{`import requests
url = 'https://soyluiptv.github.io/intl/api/get.php?type=m3u'
response = requests.get(url)
print(response.text)`}</code></pre>
        </div>
      </div>
    </div>
  </div>
</section>
