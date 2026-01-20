import adapter from '@sveltejs/adapter-static'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    paths: {
      base: '/intl'
    },
    prerender: {
      entries: ['/', '*']
    }
  }
}

export default config
