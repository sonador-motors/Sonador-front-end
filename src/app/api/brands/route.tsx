import {getAuthToken, getPostData} from "@/lib/utils";

export async function GET() {
	try {
		const token = await getAuthToken()
		const data =  await getPostData(token, 'auctions/brands')
		return Response.json({data: data, success: true})
	} catch (e) {
		console.log(e)
		return Response.json({error: `There has been an internal server error, Please try again.`, success: false})
	}
}