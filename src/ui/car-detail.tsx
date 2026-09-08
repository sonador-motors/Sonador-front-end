// 'use client'
//
// import React from 'react'
// import {useCarContext} from "@/lib/car-context";
// import {useAuth} from "@/lib/auth-provider";
// import Image from "next/image";
// import MakeBid from "@/ui/make-bid";
//
// const CarDetail = () => {
// 	const {selectedCar} = useCarContext()
// 	const {
// 		modelName,
// 		modelGrade,
// 		brandName,
// 		chassisNumber,
// 		lotNumber,
// 		yearOfProduction,
// 		engineSizeCc,
// 		providerMileage,
// 		providerTransmissionTypeId,
// 		auctionScore,
// 		exteriorColorName,
// 		wheelDrive,
// 		providerAuctionAverageEndPrice,
// 		auctionStartPrice,
// 		auctionImages
// 	} = selectedCar
// 	const {user, isLoading, redirectToLogin} = useAuth()
// 	const [showMakeBid, setShowMakeBid] = React.useState(false)
// 	const [status, setStatus] = React.useState('idle')
// 	const [feedback, setFeedback] = React.useState('')
//
// 	React.useEffect(() => {
// 		if (!user && !isLoading && selectedCar) {
// 			redirectToLogin(`/car-search/${lotNumber}`)
// 		}
// 	}, [user, isLoading, redirectToLogin, selectedCar, lotNumber])
//
// 	const name = selectedCar && `${brandName} ${modelName} ${yearOfProduction}`
//
// 	let auctionDateStr;
// 	if (selectedCar) {
// 		auctionDateStr = selectedCar.auctionDate
// 	}
// 	const auctionDate = new Date(auctionDateStr)
//
// 	// Format the date
// 	const options = {
// 		weekday: 'long',
// 		year: 'numeric',
// 		month: 'long',
// 		day: 'numeric',
// 		hour: 'numeric',
// 		timezone: 'short'
// 	}
// 	const formattedDate = auctionDate.toLocaleDateString('en-US', options)
//
// 	// Make api call to the bid and point
// 	const handleSubmit = async (e , bid) => {
// 		e.preventDefault()
// 		const bidData = JSON.stringify({
// 			user,
// 			bid,
// 			images: [...auctionImages],
// 			carDetails: {
// 				chassisNo: chassisNumber,
// 				model: modelName,
// 				lotNo: lotNumber,
// 				auctionDate
// 			}
// 		})
// 		setStatus('submit')
// 		const res = await fetch('/api/bid', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: bidData
// 		})
// 		const response = await res.json()
// 		if (!response.success) {
// 			setStatus('error')
// 			setFeedback(response.error)
// 		} else {
// 			setStatus('success')
// 			setFeedback(response.message)
// 		}
// 	}
//
// 	return (
// 		<>
// 			{selectedCar &&
// 				<section className='content-grid mb-10 border-t-2 border-t-blue-600 pt-5'>
// 					{showMakeBid && status !== 'success' && (
// 						<MakeBid
// 							handleSubmit={handleSubmit}
// 							status={status}
// 							page='auctions'
// 						/>
// 					)}
// 					<button
// 						className='button bg-amber-700 text-amber-100 py-2 mb-5 rounded-full uppercase font-bold w-fit px-4 mx-auto'
// 						onClick={() => setShowMakeBid(prevState => !prevState)}
// 					>
// 						{showMakeBid ? 'Hide Bid Form' : 'Show Bid Form'}
// 					</button>
// 					{status === 'success' && (
// 						<p className='alert alert-success text-center font-bold'>{feedback}</p>
// 					)}
//
// 					{status === 'error' && (
// 						<p className='alert alert-error text-center font-bold'>{feedback}</p>
// 					)}
//
// 					<h1 className='text-xl text-center underline underline-offset-auto font-bold uppercase'>{name}</h1>
// 					<ul>
// 						<li>Model Name: <span className="font-semibold">{modelName}</span></li>
// 						<li>Model Grade: <span className="font-semibold">{modelGrade}</span></li>
// 						<li>Chassis Number - <span className="font-semibold">{chassisNumber}</span></li>
// 						<li>Lot Number - <span className="font-semibold">{lotNumber}</span></li>
// 						<li>Engine Size - <span className="font-semibold">{engineSizeCc}CC</span></li>
// 						<li>Mileage - <span className="font-semibold">{providerMileage}KM</span></li>
// 						<li>Transmission - <span
// 							className="font-semibold">{providerTransmissionTypeId === '2' ? 'Automatic' : 'Manual'}</span>
// 						</li>
// 						<li>Auction Grade - <span className="font-semibold">{auctionScore}</span></li>
// 						<li>Exterior Color - <span className="font-semibold">{exteriorColorName}</span></li>
// 						<li>Wheel Drive - <span className="font-semibold">{wheelDrive}</span></li>
// 						<li>Auction Date - <span className="font-semibold">{formattedDate}</span></li>
// 						<li>Auction Average End Price - <span
// 							className="font-semibold">{providerAuctionAverageEndPrice}¥</span></li>
// 						<li className="my-4">FOB price is: Car price + all charges in Japan. Shipping to your country
// 							not
// 							included.
// 						</li>
// 						<li className="mb-4">Regarding this car please contact us via the make order button above.</li>
// 						<li className="font-bold text-center">Auction Start Price: {auctionStartPrice}¥</li>
// 					</ul>
// 					<section>
// 						<div className="cars">
// 							{auctionImages.map((image, idx) => (
// 								<div className={`h-60 flex-shrink-0 relative`} key={idx}>
// 									<Image
// 										src={image}
// 										alt={name}
// 										fill
// 										className='object-cover'
// 									/>
// 								</div>
// 							))}
// 						</div>
// 					</section>
// 				</section>
// 			}
// 		</>
// 	)
// }
// export default CarDetail
