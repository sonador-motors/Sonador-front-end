import { getAuthToken, getPostData } from "@/lib/utils";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	// Grab the brand from the request URL
	const brand = searchParams.get('brand')
	const token = await getAuthToken()
	try {
		const data =  await getPostData(token, `auctions/${brand}/models`)
		return NextResponse.json({ data, success: true })
	} catch (e) {
		console.log(e)
		return NextResponse.json({success: false, error: 'There has been an internal server error! please! try again.'})
	}
}
