// 'use client'
//
// import React from 'react'
// import Link from "next/link";
// import Image from "next/image";
// import {useCarContext} from "@/lib/car-context";
// import clsx from "clsx";
//
// type CarType = {
// 	lotNumber: string,
//
// }
//
// const AucCars = () => {
// 	const {setCar, searchResults} = useCarContext()
// 	const [currentPage, setCurrentPage] = React.useState(1)
// 	const itemsPerPage = 20
//
// 	// Pagination function
// 	const handlePageChange = newPage => setCurrentPage(newPage)
//
// 	// Client side pagination
// 	const startIndex = (currentPage - 1) * itemsPerPage
// 	const endIndex = startIndex + itemsPerPage
// 	const paginatedLots = searchResults.slice(startIndex, endIndex)
//
//
// 	return (
// 		<section className='content-grid'>
// 			{searchResults && searchResults.length > 0 ?
// 				<>
// 					<h2 className='h2'>CARS ON AUCTION</h2>
// 					<section className={paginatedLots.length === 1 ? 'w-fit': 'car-grid'}>
// 						{paginatedLots.map(car) => (
// 							(car && <Link
// 									href={`/car-search/${car.lotNumber}`}
// 									key={car.lotNumber}
// 									className='car border border-gray-300 rounded hover:scale-105 transition-all ease-in-out'
// 									// onClick={() => setCar(car)}
// 								>
// 									<div className="relative">
// 										<Image
// 											src={car.auctionImages.length > 1 ? car.auctionImages[1] : car.auctionImages[0]}
// 											alt={`${car.brandName} ${car.modelName}`}
// 											width={400}
// 											height={200}
// 										/>
// 										{car.auctionStatus && <span
// 											className="text-red-500 font-bold absolute left-0 bottom-0 bg-red-50 px-4 bg-opacity-80">{car.auctionStatus}</span>}
// 									</div>
// 									<p className='font-bold'>{`${car.brandName} ${car.modelName}`}</p>
// 									<p>{car.yearOfProduction}</p>
// 									<p>Start Price: ¥{car.auctionStartPrice}</p>
// 								</Link>)
// 							)
// 						)}
// 					</section>
// 					{searchResults.length > 20 && <div className="flex justify-center mt-4">
// 						<button
// 							// onClick={() => handlePageChange(currentPage - 1)}
// 							disabled={currentPage === 1}
// 							className={clsx(
// 								'px-4 py-2 text-amber-100 bg-amber-700 hover:bg-amber-600 rounded-l',
// 								{['opacity-50 cursor-not-allowed']: currentPage === 1}
// 							)}
// 						>
// 							Prev
// 						</button>
// 						<span className="px-4 py-2 bg-sky-700 text-white">{currentPage}</span>
// 						<button
// 							onClick={() => handlePageChange(currentPage + 1)}
// 							disabled={endIndex >= searchResults.length}
// 							className={clsx(
// 								'px-4 py-2 text-amber-100 bg-amber-700 hover:bg-amber-600 rounded-r',
// 								{['opacity-50 cursor-not-allowed']: endIndex >= searchResults.length}
// 							)}
// 						>
// 							Next
// 						</button>
// 					</div>}
// 				</>
// 				: <section className='bg-sky-700 text-sky-100 full md:py-8 lg:py-10'>
// 					<div className='pb-4'>
// 						<h2 className='h2 text-sky-300'>WHY Auto Auctions Japan</h2>
// 						<p>Auction is the most convenient source to buy a car from Japan. Tens of thousands of cars are
// 							selling on more than 100 auctions all over Japan. The benefits of buying from auctions are
// 							the price, most of auctions provide Live Auction enabling us to monitor the current bid on
// 							LIVE and buy for the best price possible. The auction system also provides three months auction history where we can find a market price for any model. The auctions offer massive choice, there is up to 40000cars selling everyday and there is no limit to the number of cars you can bid to purchase just one car. They also provide auction sheets wherein we can check car descriptions and condition reports. All auctions allot quality grade to each car on the scale of 0 to S with S being the highest quality. More about grading <Link href='/auction-sheet' className='text-amber-300 underline'>HERE</Link>. There are also cars selling (as is conditions) that are usually with damages. And finally, every bid ends in 20-30 seconds on average so you will not need to wait weeks for auctions to end</p>
// 					</div>
// 				</section>
// 			}
// 		</section>
// 	)
// }
// export default AucCars
