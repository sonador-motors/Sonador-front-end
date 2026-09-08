import { bidTransporter, bidMailOptions } from "@/lib/nodemailer";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page');

    const { user, bid, carDetails, images } = await req.json()
    if (!user?.name || !bid || !carDetails) {
        return NextResponse.json({
            error: 'Please fill in all the fields',
            success: false
        });
    }

    const isStockEnquiry = page === 'stock';
    const title = isStockEnquiry ? 'Car Enquiry' : `Bid: ${bid}¥`;
    const subject = isStockEnquiry ? `Enquiry on ${carDetails.model}` : `Bid Submission: ${bid}¥ on ${carDetails.model}`

    const carDetailsHtml = Object.entries(carDetails)
        .map(([key, value]) => {
            // camelCase to Title Case
            const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
            return `<p style="margin: 5px 0; font-size: 14px; color: #555;"><strong>${label}:</strong> ${value}</p>`
        })
        .join('')

    const imageGalleryHtml = images && images.length > 0
        ? `
            <h2 style="font-size: 18px; color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-top: 30px;">Vehicle Images</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 15px; margin-top: 15px;">
                ${images.map((src: string) => `<img src="${src}" alt="${carDetails.model}" style="width: 100%; height: auto; border-radius: 8px; border: 1px solid #ddd;">`).join('')}
            </div>
        `
        : '';

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                padding-bottom: 20px;
                border-bottom: 2px solid #eee;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
                color: #003366;
            }
            .section {
                padding: 20px 0;
            }
            .section h2 {
                font-size: 18px;
                color: #333;
                border-bottom: 2px solid #eee;
                padding-bottom: 10px;
                margin-top: 0;
            }
            .user-details p, .car-details p {
                margin: 5px 0;
                font-size: 14px;
                color: #555;
            }
            .user-details strong, .car-details strong {
                color: #333;
            }
            .footer {
                text-align: center;
                margin-top: 20px;
                font-size: 12px;
                color: #999;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>${title}</h1>
                <p style="margin-top: 5px; font-size: 16px;">Submitted by: ${user.name}</p>
            </div>
            <div class="section user-details">
                <h2>Client Details</h2>
                <p><strong>Name:</strong> ${user.name}</p>
                <p><strong>Country:</strong> ${user.country}</p>
                <p><strong>Destination Port:</strong> ${user.port}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Mobile:</strong> ${user.mobile_no || 'N/A'}</p>
            </div>
            <div class="section car-details">
                <h2>Vehicle Details</h2>
                ${carDetailsHtml}
            </div>
            ${imageGalleryHtml}
            <div class="footer">
                <p>This is an automated notification. Please do not reply directly to this email.</p>
            </div>
        </div>
    </body>
    </html>`;

    try {
        await bidTransporter.sendMail({
            ...bidMailOptions,
            subject,
            text: `A new ${isStockEnquiry ? 'enquiry' : 'bid'} has been submitted for the ${carDetails.model} by ${user.name}.`,
            html: htmlContent,
        });
        return NextResponse.json({
            message: `Your ${isStockEnquiry ? 'enquiry' : 'bid'} has been submitted successfully. We will contact you shortly with more details.`,
            success: true,
        });
    } catch (e) {
        console.error("Error sending email:", e);
        return NextResponse.json({
            error: 'An internal server error occurred. Please try again later.',
            success: false,
        });
    }
}