export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/auction-sheet', '/timetable', '/year-made', '/car-search/', '/account/reset-password', '/account/reset-password-confirm', '/account/profile', '/api/'],
    },
    sitemap: 'https://www.sonadormotors.jp/sitemap.xml',
  }
}