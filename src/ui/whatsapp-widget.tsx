'use client'

/*import Script from "next/script";
import {useEffect} from "react";
// import Cookies from 'js-cookie';

const WhatsAppWidget = () => {
	useEffect(() => {
		window.nchatFields = {
			service: 'whatsapp',
			external_id: '819048508833',
			image_url: 'https://sonador.vercel.app/logo.jpg',
			company_name: 'Sonador Motors Co.,Ltd',
			button_text: 'Chat with us',
			call_to_action: 'Start Chat',
			greeting_message: 'Hello there! How can I help you?',
			position: 'right',
			display: 'everywhere',
			active: true,
		}

		// Get the existing chat_app_cookie
		// const existingCookie = Cookies.get('_chat_app_session')
		//
		// const generateRandValue = () => {
		// 	return Math.random().toString(36).substring(7)
		// }
		//
		// // If the cookie is already set, return new value
		// const cookieValue = existingCookie ? existingCookie : generateRandValue()
		//
		// // Set the cookie with SameSite=None and secure attributes
		// Cookies.set('_chat_app_session', cookieValue, {
		// 	sameSite: 'None',
		// 	secure: true,
		// })
	}, []);

	return (
		<div id='single-widgetpage'>
			<Script
				id="novochat-widget"
				strategy="lazyOnload"
				src="https://app.novochat.co/api/v1/widgets/single"
			/>
		</div>
	)
}*/


import React from 'react';
import { Fab } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const WhatsAppWidget = () => {
	const phoneNumber = '819048508833'
	const handleClick = () => {
		window.open(`https://wa.me/${phoneNumber}`, '_blank', 'noopener noreferrer');
	}

	return (
		<div
			className='fixed bottom-28 right-8 z-50 flex justify-items-center drop-shadow-4xl'
		>
			<Fab
				color="success"
				aria-label="whatsapp"
				onClick={handleClick}
				className='bg-green-500 md:hover:bg-green-600 transition-all ease-in-out rounded-full p-2 md:p-6 hover:shadow-lg'
			>
				<WhatsAppIcon className='font-bold md:text-4xl'/>
			</Fab>
		</div>
	)
}


export default WhatsAppWidget