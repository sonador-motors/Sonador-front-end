// import React from 'react'
// import {getAuthToken, getPostData} from "@/lib/utils";
//
// const getBrands = async () => {
// 	const token = await getAuthToken()
// 	return getPostData(token, 'auctions/brands')
// }
//
// const Auctions = async () => {
// 	const brands = await getBrands()
//
// 	return (
// 		<section>
// 			<section className='grid'>
// 				<label htmlFor="brand-choice">Select car brand:</label>
// 				<input
// 					type="text"
// 					id='brand-choice'
// 					name='brand-choice'
// 					className='border-blue-600 border'
// 					list='brand-list'
// 				/>
// 				<datalist id='brand-list'>
// 					{ brands.map((brand: {  brandName: string }, idx: number) => (
// 						<option value={brand.brandName} key={idx}></option>
// 					))}
// 				</datalist>
// 			</section>
// 		</section>
// 	)
// }
//
// export default Auctions
