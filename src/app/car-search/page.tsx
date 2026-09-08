import React from 'react'
import Image from "next/image"

export const metadata = {
    title: {
		default: 'Search for Cars',
	    template: '%s | Sonador Motors Co.,Ltd'
    },
    description: 'Buy quality used cars from Japan with Soandor Motors. Browse thousands of vehicles from the best Japanese auctions and find your perfect car. Fast and easy shipping worldwide.',
}

const Page = () => {
	return (
		<main className='mb-10'>
			<section className='bg-[url("/bmw.webp")] lg:bg-none bg-sky-950 h-[35vh] lg:h-auto content-grid w-full bg-contain bg-no-repeat bg-center py-4'>
				<h1 className='text-center text-sky-200 font-black lg:hidden text-3xl uppercase'>
					Search Auctions
				</h1>
				<section className='lg:grid lg:grid-cols-3 mb-5 hidden items-center'>
					<section className=''>
						<h2 className='h2 text-7xl font-black text-sky-200 flex items-center'>
							Search Auctions
						</h2>
					</section>
					<Image
						src='/bmw.webp'
						alt='Army Green BMW M4'
						width={1000}
						height={1000}
						className='col-span-2'
					/>
				</section>
			</section>
			{/*<Search/>*/}
			<p>This feature will be available when auctions are integrated into the website</p>
		</main>
	)
}
export default Page
