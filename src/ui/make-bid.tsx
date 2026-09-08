import React from "react";
import SvgLoading from "@/ui/svgs/svg-loading";

type MakeBidType = {
	handleSubmit: (e: React.FormEvent<HTMLFormElement>, bid: string) => Promise<void>,
	status: string,
	page: string,
	placeholder: string
}

const MakeBid = ({handleSubmit, status, page, placeholder}: MakeBidType) => {
	const [bid, setBid] = React.useState('');

	return (
		<form className='grid gap-2 mb-5 md:w-5/6 lg:w-full mx-auto' onSubmit={e => handleSubmit(e, bid)}>
			<label htmlFor="bid-info" className='text-center uppercase font-bold'>
				{page === 'auctions' ? 'Enter your bid' : 'Enquire About this Car'}
			</label>
			<textarea
				name="bid-information"
				id="bid-info"
				rows={6}
				value={bid}
				placeholder={placeholder}
				className='border border-sky-700 bg-transparent rounded p-2 resize-none'
				onChange={e => setBid(e.target.value)}
			></textarea>
			<button
				className='button bg-sky-700 text-sky-100 py-2 rounded uppercase font-bold hover:bg-sky-950 focus:outline-offset-2 active:scale-105 disabled:bg-sky-500 disabled:cursor-not-allowed'
				disabled={!bid}
			>
				{status === 'submit' ? <SvgLoading/> : page === 'auctions' ? 'Make Bid' : 'SUBMIT ENQUIRY | GET QUOTE'}
			</button>
		</form>
	);
};

export default MakeBid;
