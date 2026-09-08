import React from 'react'
import Image from "next/image";
import EnquiresForm from "@/ui/forms/enquiries-form";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Contact Sonador Motors Co., Ltd | Sales & Support Inquiries",
    description: "Need help buying a car or have a shipping question? Contact the Sonador Motors team for sales support, auction assistance, or general inquiries. We offer worldwide support.",
    keywords: "contact used car dealer, Sonador Motors address, customer support, sales inquiries, car import help",
    openGraph: {
        title: "Contact Sonador Motors Co., Ltd | Sales & Support Inquiries",
        description: "Get in touch with the Sonador Motors team for sales support, auction assistance, or general inquiries.",
        url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/contact.png`, // REMEMBER TO CHANGE THIS
    },
}

const Page = () => {
	return (
		<main className='space-y-4 mb-10'>
			<div className='relative w-full h-[50vh] flex justify-center items-center'>
				<Image
					src='/contact.png'
					alt='A phone booth'
					fill
					className='object-cover'
				/>
				<div className='absolute text-center p-2'>
					<h1 className='uppercase font-extrabold font-serif tracking-widest text-3xl md:text-6xl'>For any customer enquiries</h1>
					<p className='italic md:text-lg font-bold text-red-800 uppercase'>how to buy, invoices, shipping</p>
				</div>
			</div>
			<section className='content-grid'>
				<EnquiresForm/>
			</section>
		</main>
	)
}
export default Page
