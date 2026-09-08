export const metadata = {
	title: "Timetable of Japanese Auctions",
	description: "View the timetable of Japanese auctions. We have a list of all the auctions in Japan and the days they take place. This will help you plan your car purchase from Japan.",
}

const Timetable = () => {
	return (
		<main className='content-grid mb-10 border-t border-blue-600 pt-4 space-y-4 overflow-hidden'>
			<h1 className='text-3xl text-center uppercase font-black'>Japanese Auctions Timetable</h1>
			<table className='border-collapse border border-slate-500 overflow-x-auto'>
				<tbody className='p-2'>
				<tr className='uppercase text-red-100'>
					<td className="bg-[#FF5555] px-2 border-y border-r border-blue-600 font-bold p-4 text-center">Week<br/>Day
					</td>
					<td className="bg-[#FF5555] px-2 border-y border-r border-blue-600 font-bold p-4 text-center">Auction</td>
					<td className="bg-[#FF5555] px-2 border-y border-r border-blue-600 font-bold p-4 text-center">Additional<br/>Transport
					</td>
					<td className="bg-[#FF5555] px-2 border-y border-r border-blue-600 font-bold p-4 text-center">Port</td>
					<td className="bg-[#FF5555] px-2 border-y border-r border-blue-600 font-bold p-4 text-center">Type
						of<br/>Auction
					</td>
				</tr>
				<tr className="border-t border-blue-500">
					<td rowSpan={9}
					    className="bg-[#FFFF99] px-2 border-y border-blue-600 border-r border-r-blue-600 text-center">Mon
					</td>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">USS-R NAGOYA</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">AUCNET</td>
					<td className="bg-yellow-500">CHECK CAR LOCATION</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe/Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">HONDA FUKUOKA</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600 ">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">HONDA KANSAI</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">HONDA NAGOYA</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">HONDA TOKYO</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">HONDA HOKKAIDO</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600 ">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">HONDA SENDAI</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">JU TOKYO</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr className='border-t border-blue-500'>
					<td rowSpan={36}
					    className='bg-[#CCFFCC] px-2 border-y border-blue-600 border-r border-r-blue-600 text-center '>Tue
					</td>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>CAA TOKYO</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>CAA GIFU</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>CAA TOHOKU</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>TAA KINKI</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>TAA KYUSHU</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>TAA SOUTH KYUSHU (Minami
						Kyushu)
					</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>TAA HIROSHIMA</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>TAA SHIKOKU</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>JU SAITAMA</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>JU SHIZUOKA</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>JU NAGANO</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>JU MIE</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>JU YAMAGUCHI</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>JU YAMANASHI</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>SLC KYUSHU</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className="bg-[#00B050] px-2 border-y border-r border-blue-600">TENDER</td>
				</tr>
				<tr>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>SLC TOKYO</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className="bg-[#00B050] px-2 border-y border-r border-blue-600">TENDER</td>
				</tr>
				<tr>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>GE NYUSATSU TOKYO</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className="bg-[#00B050] px-2 border-y border-r border-blue-600">TENDER</td>
				</tr>
				<tr>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>ORIX KOBE NYUSATSU</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className="bg-[#00B050] px-2 border-y border-r border-blue-600">TENDER</td>
				</tr>
				<tr>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>ORIX FUKUOKA NYUSATSU</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className="bg-[#00B050] px-2 border-y border-r border-blue-600">TENDER</td>
				</tr>
				<tr>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>NPS TOKYO NYUSATSU</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className="bg-[#00B050] px-2 border-y border-r border-blue-600">TENDER</td>
				</tr>
				<tr>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>NPS OSAKA NYUSATSU</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className="bg-[#00B050] px-2 border-y border-r border-blue-600">TENDER</td>
				</tr>
				<tr>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>NPS SENDAI NYUSATSU</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className="bg-[#00B050] px-2 border-y border-r border-blue-600">TENDER</td>
				</tr>
				<tr>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>NPS FUKUOKA NYUSATSU</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className="bg-[#00B050] px-2 border-y border-r border-blue-600">TENDER</td>
				</tr>
				<tr>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>NPS OYAMA NYUSATSU</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className="bg-[#00B050] px-2 border-y border-r border-blue-600">TENDER</td>
				</tr>
				<tr>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>SMAP NAGOYA NYUSATSU</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className="bg-[#00B050] px-2 border-y border-r border-blue-600">TENDER</td>
				</tr>
				<tr>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>SMAP FUKUOKA NYUSATSU</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className="bg-[#00B050] px-2 border-y border-r border-blue-600">TENDER</td>
				</tr>
				<tr>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>SHISUROKE TOKYO</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className="bg-[#00B050] px-2 border-y border-r border-blue-600">TENDER</td>
				</tr>
				<tr>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>SHISUROKE NCS TOKYO</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className="bg-[#00B050] px-2 border-y border-r border-blue-600">TENDER</td>
				</tr>
				<tr>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>SHISUROKE KYUSHU</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className="bg-[#00B050] px-2 border-y border-r border-blue-600">TENDER</td>
				</tr>
				<tr>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>SAKURA NYUSATSU</td>
					<td className="bg-yellow-500">CHECK CAR LOCATION</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe/Yokohama</td>
					<td className="bg-[#00B050] px-2 border-y border-r border-blue-600">TENDER</td>
				</tr>
				<tr>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>SAA SAPPORO</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>ZIP TOKYO</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>USS YOKOHAMA</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>ARAI SENDAI</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>NAA FUKUOKA</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className='bg-[#CCFFCC] px-2 border-y border-r border-blue-600'>USS KOBE</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr className='border-t border-blue-500'>
					<td rowSpan={21}
					    className="bg-[#FFFF99] px-2 border-y border-blue-600 border-r border-r-blue-600 text-center">Wed
					</td>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600 ">CAA CHUBU</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600 ">JAA TOKYO</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600 ">BAYAUC</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600 ">IAA OSAKA</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600 ">LAA SHIKOKU</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600 ">KAA KYOTO</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600 ">JAA</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600 ">KCAA EBINO</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600 ">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600 ">JU IBARAKI</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600 ">JU ISHIKAWA</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600 ">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600 ">GE NYUSATSU FUKUOKA</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600 ">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className="bg-[#00B050] px-2 border-y border-r border-blue-600 ">TENDER</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600 ">HERO</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600 ">ORIX ATSUGI NYUSATSU</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className="bg-[#00B050] px-2 border-y border-r border-blue-600 ">TENDER</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600 ">ORIX SENDAI NYUSATSU</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className="bg-[#00B050] px-2 border-y border-r border-blue-600 ">TENDER</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600 ">SMAP TOKYO NYUSATSU</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className="bg-[#00B050] px-2 border-y border-r border-blue-600 ">TENDER</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600 ">USS FUKUOKA</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600 ">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600 ">USS KOBE</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600 ">USS SAPPORO</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600 ">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600 ">USS NIIGATA</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600 ">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600 ">USS TOHOKU</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600 ">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600 ">ISUZU MAKUHARI</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr className="border-t border-blue-500">
					<td rowSpan={29}
					    className="bg-[#CCFFCC] px-2 border-y border-blue-600 border-r border-r-blue-600 text-center">Thu
					</td>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600 ">TAA KANTOU</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600 ">TAA CHUBU</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600 ">TAA TOHOKU</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600 ">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600 ">TAA HOKKAIDO</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600 ">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600 ">HAA OSAKA</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600 ">LAA KANSAI</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600 ">KCAA FUKUOKA</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600 ">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600 ">NAA OSAKA</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className="bg-[#00B050] px-2 border-y border-r border-blue-600 ">TENDER</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600 ">NAA NAGOYA</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className="bg-[#00B050] px-2 border-y border-r border-blue-600 ">TENDER</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600 ">SAA HAMAMATSU</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600 ">JU AICHI</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600 ">JU HIROSHIMA</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600 ">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600 ">JU SAPPORO</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600 ">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600 ">JU GUNMA</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600 ">JU FUKUSHIMA</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600 ">JU KANAGAWA</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600 ">JU TOYAMA</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600 ">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600 ">ARAI OYAMA</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600 ">ARAI FUKUOKA</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600 ">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600 ">ZIP OSAKA</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600 ">GE NYUSATSU KOBE</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className="bg-[#00B050] px-2 border-y border-r border-blue-600 ">TENDER</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600 ">SLC NAGOYA</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className="bg-[#00B050] px-2 border-y border-r border-blue-600 ">TENDER</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600 ">SLC KOBE</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className="bg-[#00B050] px-2 border-y border-r border-blue-600 ">TENDER</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600 ">SMAP SAPPORO NYUSATSU</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600 ">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className="bg-[#00B050] px-2 border-y border-r border-blue-600 ">TENDER</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600 ">SMAP KOBE NYUSATSU</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className="bg-[#00B050] px-2 border-y border-r border-blue-600 ">TENDER</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600 ">USS TOKYO</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600 ">USS-R TOKYO</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600">ORIX NAGOYA</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className="bg-[#00B050] px-2 border-y border-r border-blue-600">TENDER</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600">ISUZU KYUSHU</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr className="border-t border-blue-500">
					<td rowSpan={17}
					    className="bg-[#FFFF99] px-2 border-y border-blue-600 border-r border-r-blue-600 text-center">Fri
					</td>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">ARAI BAYSIDE</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">KCAA YAMAGUCHI</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">USS NAGOYA</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">USS HOKURIKU</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">USS OSAKA</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">USS SAITAMA</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">JU FUKUOKA</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">JU CHIBA</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">JU NIIGATA</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">JU OKAYAMA (LAA)</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">JU TOCHIGI</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">JU MIYAGI</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">JU OKINAWA (Inland Very
						Expensive)
					</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">JU SAPPORO</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">JAA TSUKUBA</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">NAA TOKYO</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className="bg-[#00B050] px-2 border-y border-r border-blue-600">TENDER</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">ISUZU KOBE</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr className="border-t border-blue-500">
					<td rowSpan={13} className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600 text-center">Sat
					</td>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600">HAA KOBE</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600">ARAI OYAMA VAN TRUCK</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600">NAA TOKYO NYUSATSU</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className="bg-[#00B050] px-2 border-y border-r border-blue-600">TENDER</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600">NAA NAGOYA NYUSATSU</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className="bg-[#00B050] px-2 border-y border-r border-blue-600">TENDER</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600">NAA OSAKA</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className="bg-[#00B050] px-2 border-y border-r border-blue-600">TENDER</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600">USS RYUTSU</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600">JU GIFU</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600">JU NARA</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600">TAA YOKOHAMA</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600">USS GUNMA</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600">USS SHIZUOKA</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600">USS OKAYAMA</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#CCFFCC] px-2 border-y border-r border-blue-600">USS KYUSHU</td>
					<td className="bg-[#8888FF] px-2 border-y border-r border-blue-600">YES</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr className="border-t border-blue-500">
					<td rowSpan={11} className="bg-[#FFFF99] px-2 border-y border-r border-blue-600 text-center">One
						Price
					</td>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">AUCNET SHARED INVENTORY</td>
					<td className="bg-yellow-500">CHECK CAR LOCATION</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe/Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">JAA SHARED INVENTORY</td>
					<td className='p-2 border-y border-r border-blue-600'>NO</td>
					<td className='p-2 border-y border-r border-blue-600'>Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">ISUZU SHARED
						INVENTORY&nbsp;</td>
					<td className="bg-yellow-500 border-y border-r border-blue-600">CHECK CAR LOCATION</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe/Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">TAA SHARED INVENTORY&nbsp;</td>
					<td className="bg-yellow-500 border-y border-r border-blue-600">CHECK CAR LOCATION</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe/Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">CAA SHARED INVENTORY</td>
					<td className="bg-yellow-500 border-y border-r border-blue-600">CHECK CAR LOCATION</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe/Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">AS MEMBERS</td>
					<td className="bg-yellow-500 border-y border-r border-blue-600">CHECK CAR LOCATION</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe/Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">AS ONE PRICE</td>
					<td className="bg-yellow-500 border-y border-r border-blue-600">CHECK CAR LOCATION</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe/Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">GAO STOCK</td>
					<td className="bg-yellow-500 px-2 border-y border-r border-blue-600">CHECK CAR LOCATION</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe/Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">IPPATSU Stock</td>
					<td className="bg-yellow-500 px-2 border-y border-r border-blue-600">CHECK CAR LOCATION</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe/Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">KYOUYUU STOCK</td>
					<td className="bg-yellow-500 px-2 border-y border-r border-blue-600">CHECK CAR LOCATION</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe/Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				<tr>
					<td className="bg-[#FFFF99] px-2 border-y border-r border-blue-600">ORIX IP STOCK</td>
					<td className="bg-yellow-500 px-2 border-y border-r border-blue-600">CHECK CAR LOCATION</td>
					<td className='p-2 border-y border-r border-blue-600'>Kobe/Yokohama</td>
					<td className='p-2 border-y border-r border-blue-600'>ONLINE</td>
				</tr>
				</tbody>
			</table>
			<table border={0} cellPadding="0" cellSpacing="0" width="100%" >
				<tbody className='grid gap-2'>
				<tr className='bg-yellow-500 text-yellow-950'>
					<td className='p-2 md:p-4'>Yellow colour marks mean exact car location need to check with
						Auction before purchase to see how much transport cost can be on it
					</td>
				</tr>
				<tr className="bg-[#8888FF] text-blue-950">
					<td className='p-2 md:p-4'>Blue colour marks mean from this area inland transport charges very
						expensive, and it can not be covered from our standart charges
					</td>
				</tr>
				<tr className="bg-[rgb(0,176,80)] text-green-950">
					<td className='p-2 md:p-4'>Green colour marks mean this Auctions is not play online such others.
						Bid need to send with special request before 12.00 PM at Auction Day.
					</td>
				</tr>
				</tbody>
			</table>
		</main>
	)
}

export default Timetable