// 'use client'
// import React from 'react'
// import AucCars from "@/ui/auc-cars"
// import clsx from 'clsx'
// import {useCarContext} from "@/lib/car-context"
// import SvgLoading from "@/ui/svgs/svg-loading"
//
// const Search = () => {
// 	const [brands, setBrands] = React.useState([])
// 	const [selectedBrand, setSelectedBrand] = React.useState('')
// 	const [models, setModels] = React.useState([])
// 	const [selectedModel, setSelectedModel] = React.useState('')
// 	const {setSearchResults} = useCarContext()
// 	const [status, setStatus] = React.useState('')
// 	const [feedback, setFeedback] = React.useState('')
//
// 	const fetchBrands = async () => {
// 		const res = await fetch('/api/brands')
// 		const data = await res.json()
// 		if (data.success) {
// 			setBrands(data.data)
// 			setStatus('')
// 		} else {
// 			setStatus('error')
// 			setFeedback(data.error)
// 		}
// 	}
// 	const handleBrandChange = e => {
// 		setSelectedModel('')
// 		setSelectedBrand(e.target.value)
// 	}
//
// 	// USE EFFECT HOOKS
// 	React.useEffect(() => {
// 		fetchBrands()
// 	}, [])
//
// 	React.useEffect(() => {
// 		const fetchModels = async () => {
// 			if (brands.length > 0 && selectedBrand) {
// 				const res = await fetch(`/api/models?brand=${selectedBrand}`)
// 				if (res.ok) {
// 					const data = await res.json()
// 					if (data.success) {
// 						// Assuming data.data contains the models
// 						setModels(data.data)
// 					} else {
// 						setStatus('error')
// 						setFeedback(data.error)
// 					}
// 				} else {
// 					console.error(`Failed to fetch models. HTTP status: ${res.status}`)
// 					setStatus('error')
// 					setFeedback('An error occurred while fetching models. Please try again.')
// 				}
// 			} else {
// 				setModels([])
// 			}
// 		}
//
// 		fetchModels()
// 	}, [brands, selectedBrand])
//
//
// 	// Fetch the cars
// 	const getLots = async (model, brand, lots) => {
// 		if (selectedBrand && selectedModel) {
// 			setStatus('submit')
// 			const res = await fetch(`/api/lots?modelNames=${model}&numberOfLots=${lots}&brand=${brand}`)
// 			if (!res.ok) return new Error(`Failed to fetch the lots of the model ${res.status}`)
// 			const data = await res.json()
// 			setSearchResults(data.lots.data)
// 			setStatus('')
// 		}
// 	}
//
// 	const handleSelectedModel = e => {
// 		const selected = e.target.value
// 		const selected_model = models.find(model => model.modelName === selected)
// 		return setSelectedModel(selected_model)
// 	}
//
// 	// bg-[url("https://images.pexels.com/photos/4709467/pexels-photo-4709467.jpeg?auto=compress&cs=tinysrgb&w=400")]
//
// 	return (
// 		<>
// 			<section className='flex flex-col -top-7 px-4 gap-4 mx-auto py-10 bg-zinc-200 md:shadow-xl bg-no-repeat bg-cover'>
// 				<h2 className='uppercase text-center font-bold'>Find you perfect car today</h2>
// 				<div className="flex-1 flex flex-col gap-2 sm:flex-row">
// 					<div className="flex flex-1 flex-col gap-2">
// 						<label htmlFor="make" className="label">Make</label>
// 						<select
// 							id="make"
// 							name="make"
// 							className="pl-1 py-2 border border-blue-600 rounded-md"
// 							onChange={handleBrandChange}
// 							onFocus={() => setModels([])}
// 							// defaultValue={brands ? brands[0].brandName : ''}
// 						>
// 							<option value="">Brand</option>
// 							{brands.length > 0 && brands.map((brand, idx) => (
// 								<option value={brand.brandName} key={idx}>{brand.brandName}</option>
// 							))}
// 						</select>
// 					</div>
// 					<div className="flex flex-1 flex-col gap-2">
// 						<label htmlFor="model" className="label">Model</label>
// 						<select
// 							id="model"
// 							name="model"
// 							className={`pl-1 py-2 border border-blue-600 rounded-md ${models.length === 0 && selectedBrand ? 'text-green-800 font-bold uppercase' : ''}`}
// 							onChange={handleSelectedModel}
// 						>
// 							<option
// 								value="">{models.length === 0 && selectedBrand ? 'Loading models...' : 'Model'}</option>
// 							{models && models.map((model, idx) => (
// 								<option
// 									value={model.modelName} key={idx}>{model.modelName} ({model.totalQty})
// 								</option>
// 							))}
// 						</select>
// 					</div>
// 				</div>
// 				<div
// 					className={clsx('w-full py-2 rounded-full text-center bg-blue-500 text-blue-100 uppercase cursor-pointer',
// 						{
// 							['cursor-not-allowed bg-blue-300']: models.length === 0
// 						}
// 					)}
// 					onClick={() =>
// 						getLots(
// 							selectedModel.modelName,
// 							selectedBrand,
// 							selectedModel.totalQty
// 						)
// 					}
// 				>
// 					{status === 'submit' ? <SvgLoading/> : 'Search'}
// 				</div>
// 			</section>
// 		</>
// 	)
// }
// export default Search
