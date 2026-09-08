import React from 'react'
import Image from "next/image";

const Footer = () => {
	const copyrightDate = new Date().getFullYear()
	return (
		<footer className='content-grid pb-10 border-t-2 bg-sky-200 text-sky-900 border-blue-600 py-4'>
			<section
				className='divide-dotted divide-y-2 divide-sky-700 grid md:grid-cols-2 gap-8 lg:grid-cols-3 md:divide-y-0 items-center'>
				<section className='flex gap-2 items-center'>
					<Image
						src='/footer-logo.png'
						alt='Sonador Motors co.,ltd Company Logo'
						width={100}
						height={100}
						className='w-auto h-auto'
					/>
					<section className='location'>
						<p>
							〒461-0005 Tokan Nagoya Castle #1052, 2 Chome-3-7 Higashiku Higashisakura
						</p>
						<p>
							〒461-0005 <span
							className='font-bold'>愛知県東区東桜２丁目３−7 　東カン名古屋キャステール</span> 1052号室
						</p>
					</section>
				</section>
				<section className='sm:pl-2 pt-2 sm:pt-0 md:border-l-2 grid gap-2 md:border-sky-700'>
					<p className='text-xl font-black flex items-center justify-between  text-sky-700'>MOB: <span>
						<a href="tel:+819048508833" className=''>+8190-4850-8833</a>
					</span></p>
                    <p className='text-xl font-black flex items-center justify-between  text-amber-700'>TEL: <span>
						<a href="tel:+81527187669" className=''>+8152-718-7669</a>
					</span></p>
                    <p className='text-xl font-black flex items-center justify-between text-green-700'>FAX: <span>
						<a href="tel:+81527187669" className=''>+8152-718-7669</a>
					</span></p>
                    <div className='grid gap-2 text-xs'>
                        <p className='md:float-right font-bold'>土日祝・当社指定休日を除く</p>
                        <p className='md:float-right font-bold'>受付時間 9:00～18:00</p>
                    </div>
				</section>
				<section
					className='grid grid-cols-2 gap-2 md:col-span-2 lg:col-span-1 lg:grid-cols-1 lg:border-l-2 lg:border-sky-700 sm:pl-2 items-center'>
					<a href="mailto:sales@sonadormotors.jp"
					   className='flex items-center font-bold text-xs md:text-xl md:font-normal'>
						<Image src='/social-media-icons/email.png' alt='Email Icon'
						       width={46} height={46}
						/>
						sales@sonadormotors.jp
					</a>
					<section className='flex justify-between items-center'>
						<a href="ttps://www.facebook.com/sonadormotors" target='_blank'
						   className='flex items-center font-bold'>
							<Image src='/social-media-icons/facebook.svg' alt='Facebook Icon'
							       width={40} height={40}
							/>
						</a>
						<a href="https://instagram.com/sonadormotors" target='_blank'
						   className='flex items-center font-bold'>
							<Image src='/social-media-icons/instagram.svg' alt='Instagram Icon'
							       width={40} height={40}
							/>
						</a>
						<a href="https://twitter.com/soandormotors" target='_blank'
						   className='flex items-center font-bold'>
							<Image src='/social-media-icons/x.svg' alt='X | Twitter Icon'
							       width={40} height={40}
							/>
						</a>
						<a href="https://line.me/ti/p/ZL22onfsa-" target='_blank' className='flex items-center font-bold'>
							<Image src='/social-media-icons/line.svg' alt='Line Social media app Icon'
							       width={40} height={40}
							/>
						</a>
					</section>
				</section>
			</section>
			<small className='text-center font-bold uppercase'>&copy; {copyrightDate} Sonador Motors Co.,Ltd™️. All Rights Reserved.</small>
		</footer>
	)
}
export default Footer
