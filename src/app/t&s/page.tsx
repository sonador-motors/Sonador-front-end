import React from 'react'
import Link from "next/link";

export const metadata = {
	title: "Terms and Conditions",
	description: "More than a thousand vehicles are available for your purchase online under Sonador motors co.,ltd Inventory. All our prices are negotiable and inquiries are welcome. FOB or CIF rates can also be negotiated upon request. Payment of deposits is required within seven days of confirmation via Telegraphic Transfer (TT), direct credit, or confirmation of L/C or other arrangements. Please be advised that we only sell Used Cars unless if it is Advertised as Brand New. The used cars are usually having marginal Defects, and the Customer should realize that Claims will not be paid due to the Vehicle not being in Brand New Condition. Sonador motors co.,ltd guarantees that the vehicles are described on our website as accurately as possible. The guarantee is not a warranty; it only guarantees the customer against misrepresentation of the vehicle(s). However Minato does recognize that vehicles pass through many different hands in transit to our customers; ports in Japan, stevedores loading and unloading ships, ship’s crew, ports at destination, storage and transporters etc. and we do not guarantee that vehicles will arrive in the same condition when inspected. Sonador motors co.,ltd will not take any responsibility regarding any meter wind-up issues that may occur after arrival to your country. The only guarantee we can provide regarding the mileage is the information we receive from the auction data, and if there were any mismatches between the actual mileage and the data provided by the auction we do not take any responsibility for that. If you want a certificate of guarantee you can contact ATL directly for the Odo meter check service and they will provide you with a certificate of guarantee for the mileage. If more than one customer are interested in same vehicle, we will sell to those, who will pay first and for others we will send similar vehicle with same specs. The vehicle will be sent first available ship; we send all documents about shipment as bill of lading, by speedy post, after all the dues confirmation in our account. Please note that some time delay may occur by the shipping company, there are some reasons beyond our control. For this we are not responsible to pay any claim. Product of Sonador motors co.,ltd Japan is sold based on FOB or C&F Terms. If export inspection is required at the buyer's country due to the import regulation, the inspection type & requirement must be implied from the buyer before the export. Minimum of 50% ~ 100% deposits of the Total",
}

const Page = () => {
	return (
		<main className='content-grid'>
			<section className="py-10 bg-sky-700 space-y-4 text-sky-100 full">
				<Link href="/how-to-buy" className="text-sm font-bold md:w-2/12 lg:w-1/12 text-center bg-sky-200 rounded-full p-2 text-sky-700 mb-10 inline-block">
					HOW TO BUY</Link>
				<h1 className="h2 text-sky-200 uppercase border-y-blue-800 border-y text-xl md:text-2xl">Our Policy</h1>

				<article id="terms-conditions" className="grid gap-4">
					<h2 id="terms-conditions" className="step text-sky-300 md:text-xl">TERMS AND CONDITIONS</h2>
					<p>More than a thousand vehicles are available for your purchase online under Sonador motors co.,ltd
						Inventory. All our prices are negotiable and inquiries are welcome. FOB or CIF rates can also be
						negotiated upon request.</p>
					<p>Payment of deposits is required within seven days of confirmation via Telegraphic Transfer (TT),
						direct credit, or confirmation of L/C or other arrangements.</p>
					<p>Please be advised that we only sell Used Cars unless if it is Advertised as Brand New. The used
						cars are usually having marginal Defects, and the Customer should realize that Claims will not
						be paid due to the Vehicle not being in Brand New Condition.</p>
					<p>Sonador motors co.,ltd guarantees that the vehicles are described on our website as accurately as
						possible. The guarantee is not a warranty; it only guarantees the customer against
						misrepresentation of the vehicle(s). However Minato does recognize that vehicles pass through
						many different hands in transit to our customers; ports in Japan, stevedores loading and
						unloading ships, ship’s crew, ports at destination, storage and transporters etc. and we do not
						guarantee that vehicles will arrive in the same condition when inspected.</p>
					<p>Sonador motors co.,ltd will not take any responsibility regarding any meter wind-up issues that
						may occur after arrival to your country. The only guarantee we can provide regarding the mileage
						is the information we receive from the auction data, and if there were any mismatches between
						the actual mileage and the data provided by the auction we do not take any responsibility for
						that.</p>
					<p>If you want a certificate of guarantee you can contact ATL directly for the Odo meter check
						service and they will provide you with a certificate of guarantee for the mileage. If more than
						one customer are interested in same vehicle, we will sell to those, who will pay first and for
						others we will send similar vehicle with same specs. The vehicle will be sent first available
						ship; we send all documents about shipment as bill of lading, by speedy post, after all the dues
						confirmation in our account. Please note that some time delay may occur by the shipping company,
						there are some reasons beyond our control. For this we are not responsible to pay any claim.</p>
				</article>

				<article id="company-export-terms" className="grid gap-4">
					<h2 id="company-export-terms" className="step text-sky-300 md:text-xl">COMPANY EXPORT TERMS AND CONDITIONS</h2>
					<p>Product of Sonador motors co.,ltd Japan is sold based on FOB or C&F Terms. If export inspection
						is required at the buyer&apos;s country due to the import regulation, the inspection type &
						requirement must be implied from the buyer before the export. Minimum of 50% ~ 100% deposits of
						the Total C&F is required for the shipment to be processed.</p>
					<p>All transaction fee must be paid fully from the Buyer&apos;s side.</p>
					<p>Once the Shipment has been ordered, an SO (Shipping Order, BL draft) will be supplied to the
						customer, the customer is responsible to inform any change of consignee at this point of the
						stage.</p>
					<p>Once Shipment has departed, Original BL Scan will be supplied within 2-3 business days after the
						Departure date.</p>
					<p>The final balance of the total C&F price must be paid within 1 week time after the Departure
						date.</p>
					<p>Once final balance is confirmed at our account, all necessary documentation for the import
						process will be supplied via DHL to the appointed address given from the buyer. The DHL tracking
						Number will be supplied when dispatched.</p>
					<p>The DHL will include,</p>
					<ul className="list-disc list-inside">
						<li>Original Invoice</li>
						<li>Original Export Certificate (Japanese)</li>
						<li>Translated Export Certificate (English)</li>
						<li>Two copies of original Bill of Lading (BL)</li>
						<li>Original Export Inspection Certificate (If required)</li>
						<li>Declaration Certificate (if required)</li>
					</ul>
					<p>If the Customer shall fail to pay the balance in full after 10days after the vehicle arrival date
						at the Importer&apos;s Country, Sonador motors co.,ltd Japan will have the full rights to forfeit the
						original deposit and to have the unit sold to a different customer to ensure the full collection
						for Sonador motors co.,ltd Japan’s security.</p>
				</article>

			</section>
		</main>
	)
}
export default Page
