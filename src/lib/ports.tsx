// const ports = [
// 	{
// 		name: 'Mombasa',
// 		countries: new Set (['Kenya', 'Uganda', 'South Sudan', 'Rwanda'])
// 	},
// 	{
// 		name: 'Dar Es Salaam',
// 		countries: new Set(['Tanzania', 'Uganda', 'Zimbabwe', 'South Sudan', 'Rwanda', 'Zambia', "Democratic Republic Of Congo", "Malawi"])
// 	},
// 	{
// 		name: 'Durban',
// 		countries: new Set (['Botswana', 'South Africa'])
// 	}
// ]
//
// const countryPorts = [
// 	{
// 		name: 'South Africa',
// 		ports: ['Durban', 'Port Elizabeth', 'Cape Town', 'Johannesburg']
// 	},
// 	{
// 		name: 'Malaysia',
// 		ports: ['Port Kelang', 'Port Kuching', 'Bintulu', 'Tnajung Pelepas', 'Kota Kinabaru', 'Kuantan', 'Pasir Gudang', 'Penang', 'Tawau']
// 	},
// 	{
// 		name: 'United Kingdom',
// 		ports: ['New Castle', 'Southampton', 'Bristol', 'Immingham', 'Grimsby', 'Felixstowe', 'Liverpool', 'Sheerness', 'Tilbury']
// 	},
// 	{
// 		name: 'United Arab Emirates' || 'UAE',
// 		ports: ['Abu Dhabi', 'Jebel Ali', 'Sharjah', 'Port Rashid', 'Dubai']
// 	}
// ]
//
// export const getPortsForCountry = (country) => {
// 	if (!country.isString()) return 'Invalid Country!'
//     const countryPorts = ports.filter(portDetails => portDetails.countries.has(country)).map(portDetails => portDetails.name)
//     if (countryPorts.length === 0) {
//         return 'Country Ports Data Not Available Yet!'
//     }
//     return countryPorts
// }