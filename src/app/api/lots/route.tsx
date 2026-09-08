import {getAuthToken, getPostData} from "@/lib/utils";
import {NextRequest} from "next/server";

export const GET = async (req: NextRequest) => {
	const { searchParams } = new URL(req.url)
	const modelNames = searchParams.get('modelNames')
	const numberOfLots = searchParams.get('numberOfLots')
	const brand = searchParams.get('brand')
	const token = await getAuthToken()
	const apiUrl = `auctions/${brand}/lots?modelNames=${modelNames}&numberOfLots=${numberOfLots}`
	try {
		const lots = await getPostData(token, apiUrl)
		return Response.json({lots: lots, success: true})
	} catch (e) {
		console.log(e)
		return Response.json({error: 'There has been an internal server error, Try again!', success: false})
	}
}
