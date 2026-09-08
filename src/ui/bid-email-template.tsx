import Image from 'next/image'

type EmailType = {
	user: {
		name: string,
		country: string,
		phoneNo: string,
		port: string,
		email: string
	},
	carDetails: {
		model: string,
		chassisNo: string,
		lotNo: string,
		auctionDate: string
	},
	bid: number,
	images: string[]
}

const BidEmailTemplate = ({user, carDetails, bid, images}: EmailType) => {
	return (
		<main className='content-grid'>
			<section className='full bg-sky-200 text-sky-950 space-y-4'>
				<h1 className="h1">{user.name} has submitted a bid on {carDetails.model} and below are the Client details.</h1>
				<hr/>
				<ul className="grid gap-2">
					<li>Country: {user.country}</li>
					<li>Tel: {user.phoneNo}</li>
					<li>Destination Port: {user.port}</li>
					<li>Email: {user.email}</li>
					<li>Subject: BID ON ${carDetails.model}</li>
				</ul>
				<h2 className='uppercase font-bold my-4'>Bid: {bid}¥</h2>
				<hr/>
				<p className='font-bold uppercase'>Car Details</p>
				<section>
					<p>Chassis: {carDetails.chassisNo}</p>
					<p>Lot Number: {carDetails.lotNo}</p>
					<p>Auction Date: {carDetails.auctionDate}</p>
					<section className='grid grid-cols-3 gap-1'>
						{images.map((image: string, index: number)=> (
							<Image
								key={index}
								src={image}
								alt={carDetails.model}
								width={400}
								height={400}
							/>
						))}
					</section>
				</section>
			</section>
		</main>
	)
}

export default BidEmailTemplate