import Cookies from 'js-cookie'
import {CarBase, CarType} from "@/lib/car-context";
import { cache } from "react";

// Function to get Axios with common configurations
export const getPostData = async (token: string, url: string, method='GET') => {
	try {
		const res = await fetch(`https://api.japanauto.io/${url}`, {
			method: method,
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`
			}
		})
		if (!res.ok) return new Error(`Error fetching Data ${res.status}`)
		return res.json()
	} catch (e) {
		// console.log(e)
		throw e
	}
}

export const getAuthToken = async () => {
	const data = {
		'email': process.env.API_EMAIL,
		'password': process.env.API_PASSWORD
	}
	try {
		const res = await fetch('https://api.japanauto.io/auth/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		if (!res.ok) return new Error(`Error getting auth token ${res.status}`)
		const resData = await res.json()
		return resData.token
	} catch (e: unknown) {
		// console.log('Error getting the authentication token', e)
		return e instanceof Error && e.message || 'Error getting the authentication token'
	}
}

// ------------- JS COOKIES ----------------------- //
export const setCookie = (key: string, value: string, options?:Cookies.CookieAttributes) => {
	Cookies.set(key, value, {
		secure: true,
		sameSite: 'Lax',
		// httpOnly: true,
		...options
	})
}
export const getCookie = (key: string) => Cookies.get(key)

export const removeCookie = (key: string) => Cookies.remove(key)


// Define base URLs based on environment
export const baseUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8000/api/auth/'
  : 'https://sonador-back.onrender.com/api/auth/'

export const carsBaseUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8000/api/vehicles/'
  : 'https://sonador-back.onrender.com/api/vehicles/'

const countriesBaseUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8000/api/shipping/countries/'
  : 'https://sonador-back.onrender.com/api/shipping/countries/'


// Price with Commas Function

// export const priceWithCommas = (price: string | number) => {
// 	price = Number(price)
// 	const regex = /^0\.0{1,2}$/
// 	const zeroPrice = '0.0'
// 	if (regex.test(zeroPrice)) {
// 		return price.toLocaleString('en-US')
// 	} else if ( price < 0 ) {
// 		return new Error('Price must be positive')
// 	}
// 	return price
// }

// Seeded function to shuffle an array
function mulberry32(seed: number) {
	return function () {
		let t = seed += 0x6D2B79F5
		t = Math.imul(t ^ (t >>> 15), t | 1)
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296
	}
}

const getJSTDateString = () => {
	const now = new Date()
	const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000)
	return jst.toISOString().slice(0, 10)
}

export const shuffleStock = (array: CarBase[]) => {
	const today = getJSTDateString()
	const seed = Number(today.replace(/-/g, ''))
	const random = mulberry32(seed)

	const shuffled = [...array]
	let currentIndex = shuffled.length

	while (currentIndex !== 0) {
		const randomIndex = Math.floor(random() * currentIndex)
		currentIndex--
		;[shuffled[currentIndex], shuffled[randomIndex]] =
			[shuffled[randomIndex], shuffled[currentIndex]]
	}

	return shuffled
}

// Randomize cars order
// export const shuffleStock = (array: CarBase[]) => {
// 	let currentIndex = array.length, randomIndex
// 	while (currentIndex !== 0) {
// 		randomIndex = Math.floor(Math.random() * currentIndex)
// 		currentIndex--
// 		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
// 	}
// 	return array
// }

const apiKey = process.env.BACKEND_API_KEY
//
// console.log(apiKey)

export async function getStockData() {
	/*
	Fetches the cars from the backend
	* If fetch is successful but no data returns success: false
	* Any other Error returns Failed to fetch data please try Again
	* Else return success: true and the data.
	*/

	// TODO: Always try out revalidate to see if it happens to work

	try {
		const res = await fetch(`${carsBaseUrl}`
            , {
            next: {
				// tags: ['stock'],
				revalidate: 60 * 10, // Revalidate every 30 minutes
				},
				// headers: {
				//   'Content-Type': 'application/json',
				//   'Authorization': `Api-Key m7AlKpRz.XgnehD71EHQsG9Kg0qfPr0OwUoAHsRAy`
				// }
			}
        ) // Removed revalidate
		// console.log(res)
		const contentType = res.headers.get('Content-Type')
		if (!res.ok || !contentType || !contentType.includes('application/json')) {
			return {success: false, data: []}
		}
		const data = await res.json()
        // console.log(data.length)
		return {success: true, data: data}
	} catch (e) {
		// console.log(`Failed to fetch cars: ${e}`)
		return { success: false, data: []}
	}
}

export const getCar = cache(async (slug: string): Promise<CarType> => {
	const res = await fetch(`${carsBaseUrl}${slug}`, {
		cache: 'force-cache' // Cache the response
	})
	if (!res.ok) {
		throw new Error('Failed to fetch car data')
	}
	return res.json()
})

export const getNewArrivals = async () => {
	try {
		const res = await fetch(`${carsBaseUrl}new-arrivals`, {
            // next: {
            //     revalidate: 60 * 30, // Revalidate every 10 minutes
            // }
        })
		if (!res.ok) {
			return {success: false, data: []}
		}
		const data: CarBase[] = await res.json()
		return {success: true, data: data}
	} catch (e) {
		return { success: false, data: []}
	}
}

export const getFeatured = async () => {
	try {
		const res = await fetch(`${carsBaseUrl}featured`, {
            // next: {
            //     revalidate: 86400, // Revalidate every 24 hours
            // }
        })
		if (!res.ok) {
			return {success: false, data: []}
		}
		const data: CarBase[] = await res.json()
		return {success: true, data: data}
	} catch (e) {
		return { success: false, data: []}
	}
}

export const getBrands = async () => {
	try {
		const res = await fetch(`${carsBaseUrl}brands`)
		if (!res.ok) {
			return {success: false, data: []}
		}
		const data: { brands: String[] } = await res.json()
		return {success: true, data: data.brands}
	} catch (e) {
		return { success: false, data: []}
	}
}

export const getCountriesData = async () => {
    const res = await fetch(countriesBaseUrl)
    return await res.json()
}

export async function getRates() {
	const res = await fetch("https://open.er-api.com/v6/latest/USD", {
		// Revalidate every 12 hours (43200 seconds)
		next: {revalidate: 86400},
	});
	
	if (!res.ok) {
		throw new Error("Failed to fetch currency rates");
	}
	
	const data = await res.json();
	return data.rates;
}

// export const getUserCountryName = async () => {
// 	const res = await fetch('https://ipapi.co/json/')
// 	const data = await res.json()
// 	return data.country_name
// }