import React, {Suspense} from 'react';
import StockDetail from "@/ui/stock-detail";
import {carsBaseUrl} from "@/lib/utils";
import Link from 'next/link'; // Import Link
import {Metadata} from "next";
import { getCar } from "@/lib/utils";
import { notFound } from 'next/navigation'
import LoadingSkeleton from "@/ui/loading-skeleton";

// No need to manually define PageProps or RouteParams if we rely on inference
// For clarity, we'll keep RouteParams for internal use, but PageProps for component signature

// 1. Define the specific route params for clarity within the component logic
type Params = Promise<{ slug: string }>

// Next.js generateMetadata function
// Let Next.js infer the type for the argument directly
export const generateMetadata = async ({params}: { params: Params }): Promise<Metadata> => {
    const { slug } = await params;
    // console.log(slug)
    try {
        // const response = await fetch(`${carsBaseUrl}${slug}`);
        const car = await getCar(slug)
        
        const make = car.car_name?.make?.car_make ?? 'Unknown Make';
        const model = car.car_name?.model ?? 'Unknown Model';
        const year = car.car_name?.year?.year || 'N/A';
        const features = car.features || '';
        const imageUrl = car.images?.[0]?.image || '/default-image.png'; // Consistent fallback image URL
        
        return {
            title: `${make} ${model} ${year}`,
            description: `View the ${year} ${make} ${model} in our stock.`,
            openGraph: {
                title: `${make} ${model} ${year}`,
                description: `View the ${year} ${make} ${model} in our stock. ${features}`,
                type: 'website',
                images: [
                    {
                        url: imageUrl,
                        width: 800,
                        height: 600,
                        alt: `${make} ${model} ${year}`,
                    },
                ],
            },
        };
    } catch (e) {
        console.error('Error fetching car data for metadata:', e);
        return {
            title: 'Car Details - Not Found',
            description: 'Unable to fetch car details at this moment.',
            openGraph: {
                title: 'Car Details - Not Found',
                description: 'Unable to fetch car details at this moment.',
                type: 'website',
                images: [
                    {
                        url: '/car-placeholder.png',
                        width: 800,
                        height: 600,
                        alt: 'Default Car Image',
                    },
                ],
            },
        };
    }
};

// Page component
// Let Next.js infer the type for the argument directly
const Page = async (
    { params}: { params: Params; }) => {
    const { slug } = await params
    const car = await getCar(slug);
     // params will be inferred as { slug: string }
    // const year = car.car_name?.year?.year; // Use optional chaining
    
    return (
        <main>
            <StockDetail
                // id={slug}
                car={car}
            />
            {/* Using Link component */}
            <article className="text-center p-4">
                <Link
                    href="/stock"
                    className="mt-10 inline-block text-sky-700 font-bold border-2 border-sky-700 hover:bg-sky-700 hover:text-sky-100 hover:border-0 transition-colors duration-300 px-4 py-2 rounded"
                >
                    ← Back To Stock
                </Link>
            </article>
        </main>
    );
};

export default Page;