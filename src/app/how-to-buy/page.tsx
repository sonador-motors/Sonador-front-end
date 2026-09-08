import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { CheckCircleIcon, CurrencyDollarIcon, ShoppingCartIcon, TruckIcon } from '@heroicons/react/24/outline';
import {Metadata} from "next";
import Posters from "@/ui/posters";
import {postersSetOne, postersSetTwo} from "@/lib/data";

export const metadata: Metadata = {
    title: "How to Buy a Car from Japan | Stock & Auction Process - Sonador Motors",
    description: "Learn the easy, two-step process to buy a car from Sonador Motors: choose from our private stock or bid directly at Japanese auctions. Get transparent, step-by-step guidance for safe import.",
    keywords: "how to buy used cars from Japan, Japanese auction guide, import car process, car buying steps, safe car import",
    openGraph: {
        title: "How to Buy a Car from Japan | Stock & Auction Process - Sonador Motors Co.,Ltd",
        description: "Learn the easy, two-step process to buy a car from Sonador Motors: choose from our private stock or bid directly at Japanese auctions.",
        url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/tristan-bridge.jpeg`, // REMEMBER TO CHANGE THIS
    },
}

// ---------------------------------
// Data for the unified process steps
// ---------------------------------
const unifiedSteps = [
    {
        icon: ShoppingCartIcon,
        title: "Choose Your Path",
        description: "Choose from our Private Stock (ready to ship) or place a bid on cars from 120+ Japanese Auctions.",
    },
    {
        icon: CurrencyDollarIcon,
        title: "Secure Your Purchase",
        description: "Place a 50% deposit or 100% full payment (required for stock cars) or a refundable auction security deposit for bidding.",
    },
    {
        icon: CheckCircleIcon,
        title: "Finalize & Certify",
        description: "Upon receiving your car (or winning the auction), we provide complete pictures and the Export Certificate (Japanese & English).",
    },
    {
        icon: TruckIcon,
        title: "Shipment & Documents",
        description: "The car is moved to the port. Once shipped, you receive the B/L copy, tracking link, and final invoice for the balance payment.",
    },
];

// ---------------------------------
// Component
// ---------------------------------
const Page = () => {
    return (
        <main>
            {/* 1. HERO SECTION (Visual Impact) */}
            <div className="relative h-[31.25rem] lg:h-[40.625rem] w-full bg-cover bg-center" style={{ backgroundImage: 'url("/triton-bridge.jpeg")' }}>
                <div className="absolute inset-0 bg-black/45 flex justify-center">
                    <div className="text-center text-orange-100 p-4 flex flex-col justify-between">
                        <h1 className="text-4xl md:text-6xlgit lg:text-8xl font-extrabold tracking-widest font-serif uppercase mb-2">
                            We’re the Bridge Connecting Car Dealers to Japan
                        </h1>
                        <p className="text-xl md:text-3xl">
                            Buying a car from Japan is simple with Sonador Motors Co., Ltd.
                        </p>
                    </div>
                </div>
            </div>

            <div className='content-grid py-12'>
                <section className='space-y-6 mb-10 text-center'>
                    <h2 className='text-3xl font-extrabold uppercase'>
                        The Sonador Motors Advantage
                    </h2>
                    <p className='text-lg max-w-4xl mx-auto'>
                        We offer two flexible ways to purchase vehicles: from our vast <strong>Private Stock</strong> (over 200 ready vehicles) or directly from **Japan's Live Auctions** (100,000+ cars weekly).
                    </p>
                    <p className='mt-2'>
                        Please check and agree to our
                        <Link
                            href="/t&s"
                            className='cursor-pointer text-amber-600 hover:text-amber-950 font-semibold ml-1'>
                            'TERMS AND CONDITIONS'
                        </Link> before proceeding.
                    </p>
                </section>

                {/* 2. UNIFIED PROCESS VISUAL (Using icons instead of a single image) */}
                <section className="py-12">
                    <h3 className="text-3xl font-bold text-center mb-10 uppercase">How It Works: 4 Simple Steps</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {unifiedSteps.map((step, index) => (
                            <div key={index} className="flex flex-col bg-white items-center text-center p-6 border-b-4 border-blue-600/50 rounded shadow-lg">
                                <span className="text-blue-600 mb-4">
                                    <step.icon className="h-10 w-10"/>
                                </span>
                                <p className="text-4xl font-extrabold text-blue-600 mb-3">{index + 1}</p>
                                <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. DUAL-COLUMN DETAIL SECTION (Keeping the original structure for detail) */}
                <div className='lg:grid lg:grid-cols-2 mt-12 gap-8'>
                    {/* LEFT COLUMN: STOCK CARS */}
                    <section id="buy-cars-from-stock" className="space-y-6 p-8 rounded-lg border border-blue-200">
                        <h3 className="text-2xl font-extrabold uppercase text-blue-600 border-b pb-2">
                           Option 1: Private Stock Cars
                        </h3>
                        <p className="font-semibold text-lg">Procedure of buying cars from our ready inventory:</p>

                        <div className='space-y-4'>
                            <h4 className="font-bold text-lg border-l-4 border-amber-600 pl-3">Step 1: Reservation & Payment</h4>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>**50% or 100% payment required** to book a stock car.</li>
                                <li>We reserve cars for 3 days for existing customers with a deposit.</li>
                                <li>Complete car pictures and Export Certificates (Japanese & English) are sent.</li>
                            </ul>
                        </div>
                        {/* ... (Continue with Step 2, 3, 4, 5, 6 as originally listed, using <h4> and <ul> for structure) ... */}
                        <h4 className="font-bold text-lg border-l-4 border-amber-600 pl-3">Step 2: Shipment Booking</h4>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Once 50% or 100% payment is received, shipment booking is done.</li>
                            <li>*Note: Buyer covers all Bank or additional costs not included in C&F/CIF charges.*</li>
                        </ul>
                        
                        <h4 className="font-bold text-lg border-l-4 border-amber-600 pl-3">Step 3: Port Loading</h4>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Vehicle is moved towards the port for loading.</li>
                        </ul>

                        <h4 className="font-bold text-lg border-l-4 border-amber-600 pl-3">Step 4: Shipment Confirmation</h4>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Once shipped, **BL copy** and the **Vessel / Shipment tracking link** are sent via email along with the balance payment invoice.</li>
                        </ul>

                        <h4 className="font-bold text-lg border-l-4 border-amber-600 pl-3">Step 5: Document Release (After Final Payment)</h4>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>After 100% payment is received, all Original documents are sent to customer via DHL courier service.</li>
                        </ul>

                        <h4 className="font-bold text-lg border-l-4 border-amber-600 pl-3">Step 6: Tracking</h4>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>DHL tracking number is sent to the customer for document monitoring.</li>
                        </ul>
                        <p className='mt-8 p-3 border border-blue-600 bg-blue-50 uppercase font-semibold text-center rounded'>
                            <Link href="/account/signup" className="text-blue-600 hover:text-blue-800 underline">
                                Register for an account
                            </Link> and get access to live auctions.
                        </p>
                    </section>
                    
                    {/* RIGHT COLUMN: AUCTION CARS */}
                    <section className="space-y-6 p-8 rounded-lg bg-gray-50 border border-gray-200">
                        <h3 className="text-2xl font-extrabold uppercase text-blue-600 border-b pb-2">
                            Option 2: Live Auction Cars
                        </h3>
                        <p className="font-semibold text-lg">Procedure for buying cars directly from auction:</p>
                        <p className='italic'>
                            Purchasing from auction provides a wide range of choice (100,000+ cars weekly) at the best competitive prices with genuine information.
                        </p>

                        <div className='space-y-4'>
                            <h4 className="font-bold text-lg border-l-4 border-amber-600 pl-3">Step 1: Auction Deposit</h4>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Send the **Auction Deposit** (security deposit based on car price OR 100% upfront payment).</li>
                                <li>*Deposit is 100% Refundable or Adjustable.*</li>
                            </ul>
                        </div>
                        {/* ... (Continue with Step 2 through 9 as originally listed, using <h4> and <ul> for structure) ... */}
                        
                        <h4 className="font-bold text-lg border-l-4 border-amber-600 pl-3">Step 2: Bid & Win</h4>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Bid on cars. If lost, we rebid. If won, proceed to payment.</li>
                        </ul>

                        <h4 className="font-bold text-lg border-l-4 border-amber-600 pl-3">Step 3: Initial Payment & Shipping Prep</h4>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Car initial payment (50% or 100%) required to arrange shipping upon car arrival in the yard.</li>
                        </ul>

                        <h4 className="font-bold text-lg border-l-4 border-amber-600 pl-3">Step 4: Yard Inspection & Certification</h4>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Car arrives from auction to Yard. Complete car pictures (including engine number) are taken.</li>
                            <li>Export Certificate (English and Japanese) is processed and shipment is booked.</li>
                        </ul>

                        <h4 className="font-bold text-lg border-l-4 border-amber-600 pl-3">Step 5: Port Loading</h4>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Cars are moved to the port for loading to their destination.</li>
                        </ul>

                        <h4 className="font-bold text-lg border-l-4 border-amber-600 pl-3">Step 6 & 7: BL & Final Invoice</h4>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>BL copy is received from the shipping company (within 7 to 10 days) and sent to the customer along with the **balance payment invoice**.</li>
                        </ul>

                        <h4 className="font-bold text-lg border-l-4 border-amber-600 pl-3">Step 8: Document Release</h4>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Once 100% payment is received, Original documents are sent via DHL.</li>
                            <li>Documents include: ORIGINAL INVOICE, EXPORT CERTIFICATE (JP/EN), ORIGINAL BILL OF LADING, DECLARATION CERTIFICATE, and other regional documents.</li>
                        </ul>

                        <h4 className="font-bold text-lg border-l-4 border-amber-600 pl-3">Step 9: DHL Tracking</h4>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>DHL tracking number is sent to the customer.</li>
                        </ul>
                    </section>
                </div>

                {/* 4. BANK DETAILS (Kept clean and accessible) */}
                {/*<section id="bank-details" className="space-y-4 max-w-2xl mx-auto mt-12 pt-8 border-t border-gray-300">*/}
                {/*   <h2 className="text-2xl font-bold uppercase text-center text-green-700">Payment Details</h2>*/}
                {/*   <section className='border-green-600 border-2 p-4 rounded-lg bg-green-50 text-sm'>*/}
                {/*      <p className='flex justify-between border-b pb-1'>Bank Name: <span className='font-bold text-right'>WISE PAYMENTS JAPAN K.K, TOKYO, JAPAN</span></p>*/}
                {/*      <p className='flex justify-between border-b py-1'>Account Number: <span*/}
                {/*         className='font-bold'>IBAN: BE28905051896320</span></p>*/}
                {/*      <p className='flex justify-between border-b py-1'>Swift Code: <span className='font-bold'>TRWIBEBBXXX (OR) TRWIBEB1XXX</span></p>*/}
                {/*      <p className='flex justify-between pt-1'>Beneficiary Name: <span className='uppercase font-bold text-right'>Sonador Motors co.,ltd</span></p>*/}
                {/*      <p className='mt-4 text-xs italic text-gray-700'>**NB for T/T:** Use the Wise address for Swift Code lookup: Wise, Rue du Trône 100, 3rd floor, Brussels, 1050, Belgium.</p>*/}
                {/*   </section>*/}
                {/*   <em className="font-bold mt-4 block text-center">Please remit your deposit into our bank account by:</em>*/}
                {/*   <ol className="list-decimal list-inside space-y-2 text-center text-sm">*/}
                {/*      <li>T/T (Telegraphic Transfer) or</li>*/}
                {/*      <li>Pay directly on our website using PayPal or Credit Card Online</li>*/}
                {/*   </ol>*/}
                {/*</section>*/}
            </div>
            <Posters posters={postersSetTwo} />
        </main>
    )
}
export default Page;