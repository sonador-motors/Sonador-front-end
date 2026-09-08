import axios from "axios";

export async function POST() {
	const urlList = [
		'https://sonadormotors.jp',
		'https://sonadormotors.jp/how-to-buy',
		'https://sonadormotors.jp/stock',
		'https://sonadormotors.jp/contact',
		'https://sonadormotors.jp/t&amp;s',
	]

	if(!urlList || !Array.isArray(urlList) || urlList.length === 0) {
		return Response.json({error: 'Url list is required', success: false})
	}

	const payload = {
		host: process.env.NEXT_PUBLIC_VERCEL_URL,
		key: process.env.BING_API_KEY,
		keyLocation: `${process.env.NEXT_PUBLIC_VERCEL_URL}/index-now.txt`,
		urlList
	}

	if (process.env.ENVIRONMENT === 'production') {
		try {
			const res = await axios.post(
				'https://api.index.org',
				payload,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			return Response.json(
				{
					success: true, message: res.data.message},
					{
						status: 200,
						headers: {'Content-Type': 'application/json'}
				}
			)
		} catch (e: unknown) {
			return Response.json({error: e instanceof Error ? e.message : 'An unknown error occurred', success: false})
		}
	}
}