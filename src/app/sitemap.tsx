export default function sitemap() {
	return [
		{
			url: 'https://sonadormotors.jp',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1,
		},
		{
			url: 'https://sonadormotors.jp/how-to-buy',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1,
		},
		{
			url: 'https://sonadormotors.jp/stock',
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		},
		{
			url: 'https://sonadormotors.jp/contact',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.5,
		},
		{
			url: 'https://sonadormotors.jp/t&amp;s',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.5,
		},
		{
			url: 'https://sonadormotors.jp/timetable',
			lastModified: new Date(),
			changeFrequency: 'never',
			priority: 0.5,
		},
		{
			url: 'https://sonadormotors.jp/year-made',
			lastModified: new Date(),
			changeFrequency: 'never',
			priority: 0.5,
		},
		// {
		// 	url: 'https://sonadormotors.jp/car-search',
		// 	lastModified: new Date(),
		// 	changeFrequency: 'never',
		// 	priority: 0.5,
		// },
	]
}