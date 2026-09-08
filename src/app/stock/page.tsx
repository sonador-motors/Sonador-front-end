import StockCars from "@/ui/stock-cars";
import {Metadata} from "next";

export const metadata: Metadata = {
	title: "Toyota, Honda & More | Quality Japanese Stock Cars for Sale - Sonador Motors",
    description: "Browse Sonador Motors' ready stock of high-quality used cars imported directly from Japan. Find popular models like Toyota, Honda, and Nissan with transparent pricing and worldwide shipping.",
    keywords: "used cars Japan, Japanese used cars, stock cars, imported cars, Toyota, Honda, Nissan, buy used cars online, RHD cars for sale",
    openGraph: {
        title: "Quality Japanese Stock Cars for Sale - Sonador Motors",
        description: "Browse Sonador Motors' ready stock of high-quality used cars imported directly from Japan. Find popular models with transparent pricing and worldwide shipping.",
        url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/stock`, // REMEMBER TO CHANGE THIS
        images: [
            {
                url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/posters/stock-hero.jpg`, // Use a relevant stock photo
                alt: 'Inventory of Japanese used cars',
            },
        ],
    }
}

const Stock = async () => {

	return (
        <StockCars />
	)
}

export default Stock