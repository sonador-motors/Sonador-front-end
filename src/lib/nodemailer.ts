import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.GMAIL_ACCOUNT,
		pass: process.env.GMAIL_ACCOUNT_APP_PWD
	}
})

export const mailOptions = {
	from: process.env.GMAIL_ACCOUNT,
	to: process.env.INFO_EMAIL_ENQUIRIES
	// to: 'kennethmtv.km@gmail.com'
}

export const bidTransporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.GMAIL_ACCOUNT,
		pass: process.env.GMAIL_ACCOUNT_APP_PWD
	}
})

export const bidMailOptions = {
	from: process.env.GMAIL_ACCOUNT,
	to: process.env.INFO_EMAIL_ENQUIRIES
	// to: 'kennethmtv.km@gmail.com'
}