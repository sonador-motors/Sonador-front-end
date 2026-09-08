import './globals.css'
import Footer from "@/ui/footer";
import {Inter} from "next/font/google";
// import dynamic from "next/dynamic";
import {desc} from '@/lib/data'
import NagoyaTime from "@/ui/japan-time";
// import {Analytics} from "@vercel/analytics/react"
// import {SpeedInsights} from "@vercel/speed-insights/next"
import React from "react";
import WhatsAppWidget from "@/ui/whatsapp-widget";
import Header from "@/ui/header";
import {getCountriesData, getRates} from "@/lib/utils";
import { AuthProvider } from '@/lib/auth-provider'
import {Metadata} from "next";
import LoadingSkeleton from "@/ui/loading-skeleton";
import {CurrencyProvider} from "@/context/currency-context";
import {CifProvider} from "@/context/cif-context";
import {FavouriteProvider} from "@/context/favourite-context";
// import ChristmasBanner from "@/ui/christmas-banner";

interface RootLayoutProps {
    children: React.ReactNode
}

const url = new URL('https://' + process.env.NEXT_PUBLIC_VERCEL_URL)

export const metadata: Metadata = {
    metadataBase: url,
    title: {
        default: 'Sonador Motors Co.,Ltd: Your Trusted Source For Quality Used Cars From Japan',
        template: '%s | Sonador Motors Co.,Ltd',
    },
    description: desc,
    keywords: "Japanese used cars, import cars, buy cars from Japan, JDM cars, used car dealer, car export, RHD cars, worldwide shipping, Japanese automobiles, stock cars, auction cars",
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'en_GB',
        title: 'Sonador Motors Co.,Ltd',
        description: desc,
        url: url + '/opengraph-image.jpg',
        siteName: 'Sonador Motors Co.,Ltd'
    },
    twitter: {
        site: 'https://sonadormotors.jp',
        title: 'Sonador Motors Co.,Ltd',
        description: desc,
    },
    category: 'Used Cars & Spare Parts Dealer From Japan',
    // override the viewport tag
    other: {
        viewport: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no',
    }
}

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
    display: 'swap',
})

// Note: importing providers directly ensures Next handles client boundaries consistently
export default async function RootLayout({children}: RootLayoutProps) {
    const countries = await getCountriesData();

    const rates = await getRates();
    
    return (
        <html lang="en">
        <body
            className={`${inter.className} bg-sky-100 text-blue-950 scroll-smooth flex flex-col min-h-screen justify-between`}>
        <NagoyaTime/>
        {/*<ChristmasBanner />*/}
        <React.Suspense fallback={<LoadingSkeleton/>}>
            <AuthProvider>
                <CurrencyProvider rates={rates}>
                    <FavouriteProvider>
                        <Header/>
                        <div className='flex-1'>
                            <CifProvider initialCountries={countries}>
                                {children}
                            </CifProvider>
                        </div>
                    </FavouriteProvider>
                </CurrencyProvider>
            </AuthProvider>
        </React.Suspense>
        <Footer/>
        <WhatsAppWidget/>
        {/*<Analytics/>*/}
        {/*{process.env.NODE_ENV === 'production' && window !== undefined && <SpeedInsights/>}*/}
        </body>
        </html>
    )
}