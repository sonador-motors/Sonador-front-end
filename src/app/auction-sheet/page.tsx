import Image from 'next/image'

const InspectionSheet = () => {
	return (
		<main className='content-grid'>
			<section className='full bg-sky-700 py-10 text-sky-200 space-y-4'>
				<h1 className='text-3xl text-center uppercase'>Auction Inspection Sheet</h1>
				<p>Every car selling from auction has inspection report. Japanese auction inspectors are strict, that&apos;s why inspection report usually is quite trusted. Even such small moments like grime inside or door mirrors scratches are marking in report. Of course full translation of auction sheet will be provided by our staff by your request. </p>
			</section>
			<section className='grid gap-6 md:grid-cols-2 my-10'>
				<Image
					src='/auc_sheet.jpg'
					alt='Japanese Auction Sheet'
					width={557}
					height={490}
				/>
				<section className='grid gap-6'>
					<section>
						<u>Interior condition grades:</u>
						<p>A — very clean or new</p>
						<p>B — good condition</p>
						<p>C — medium condition</p>
						<p>D — bad condition</p>
						<p>E — very bad condition</p>
					</section>
					<p>Here you can see base information about auction grading system:</p>
					<section>
						<u>Total grades:</u>
						<p>6 or S — brand new car</p>
						<p>5 — very good condition car, very low mileage</p>
						<p>4,5 - very good condition car, low mileage, minor deffects </p>
						<p>4 — good condition car, medium mileage, medium deffects </p>
						<p>3,5 — good condition car, medium mileage, serious deffects </p>
						<p>3 — medium condition car, any mileage, serious deffects</p>
						<p>2 — bad condition car, any mileage, heavy deffects</p>
						<p>1 — very bad condition car, possible water flud or fire damage</p>
						<p>R or 0 — car with crush repair history, any mileage, any condition</p>
						<p>*** or * - ungraded car, possible salvage or very old</p>
					</section>
					<section>
						<u>Marks on map:</u>
						<p>A1 - Small Scratch,  A2 - Scratch,  A3 - Big Scratch</p>
						<p>B - Dent with scratch</p>
						<p>E1 - Few Dimples,  E2 - Several Dimples,  E3 - Many Dimples</p>
						<p>U1 - Small Dent,  U2 - Dent, U3 - Big Dent</p>
						<p>W1 - Small Repair Mark/Wave, W2 - Repair Mark/Wave</p>
						<p>W3 - Obvious Repair Mark/Wave</p>
						<p>S1 - Rust, S2 - Heavy Rust</p>
						<p>C1 - Corrosion, C2 - Heavy Corrosion</p>
						<p>P - Paint mark</p>
						<p>X - Panel need to be replaced</p>
						<p>XX - Replaced</p>
						<p>Y1 - Small Hole or Crack, Y2 - Hole or Crack</p>
						<p>Y3 - Big Hole or Crack</p>
						<p>X1 - Small Crack on Windshield</p>
						<p>X - Crack on Windshield (needs to be replaced)</p>
						<p>G - Stone chip in glass</p>
					</section>
				</section>
			</section>
		</main>
	)
}

export default InspectionSheet