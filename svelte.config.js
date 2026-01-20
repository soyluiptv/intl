import adapter from '@sveltejs/adapter-static'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'docs',
      assets: 'docs',
      precompress: false,
      strict: false
    }),
    paths: {
      base: '/intl'
    }
  }
}

export default config
