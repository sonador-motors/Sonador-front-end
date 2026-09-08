import React from 'react'
import Image from "next/image";
import EnquiresForm from "@/ui/forms/enquiries-form";
import {Metadata} from "next";
import FavouriteSection from "@/ui/favourites-section";

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
		<main className='border-t-2 border-sky-500'>
			<FavouriteSection />
		</main>
	)
}
export default Page
