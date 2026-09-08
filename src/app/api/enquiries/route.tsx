import {transporter, mailOptions} from "@/lib/nodemailer";
import {NextResponse, NextRequest} from "next/server";

export async function POST(req: NextRequest) {
	const {name, email, phoneNo, country, port, enquiry, address, car, isAddress, totalCIF} = await req.json()

	if(!name || !email || !phoneNo || !country || !port) {
		return NextResponse.json({ error: 'empty fields', success: false })
	}

	const html = `
        <div>
            <h1 class="h1">You have a new message from your website enquiries form</h1>
            <h2 class="text-blue-200">Message Details</h2>
            <ul>
                <li>Name: ${name} from ${country}</li>
                <li>Tel: +${phoneNo} from ${country}</li>
                <li>Destination Port: ${port}</li>
                <li>Email: ${email}</li>
            </ul>
            <h2>Enquiry:</h2>
            <p>${enquiry}</p>
        </div>
    `
    
    const quoteHtml = `
        <div>
            <h1 style="color: #007bff;">✅ New Vehicle Quote Request Received</h1>
            <h2 class="text-blue-200">Message Details</h2>
            <ul>
                <li>Name: ${name} from ${country}</li>
                <li>Tel: +${phoneNo} from ${country}</li>
                <li>Destination Port: ${port}</li>
                <li>Email: ${email}</li>
                <li>Address: ${address}</li>
            </ul>
            <h2>Enquiry:</h2>
            <p>https://www.sonadormotors.jp/stock/${car.id}</p>
            ${totalCIF && `<p>${totalCIF}</p>`}
        </div>
    `

	try {
		await transporter.sendMail({
			...mailOptions,
			subject: 'Website Enquiry',
			text: `${isAddress ? address : enquiry } \n\n ${name} \n ${email} - ${phoneNo}`,
			html: isAddress ? quoteHtml : html,
		})
		return NextResponse.json({ success: true, message: 'Your enquiry has been sent' })
	} catch (e) {
		console.log(e)
		return NextResponse.json({ success: false, error: 'There has been an internal server error please try again later.'})
	}
}
