import {ClipboardIcon, CheckIcon} from '@heroicons/react/24/solid'
import React, {useState} from 'react'
import Link from 'next/link'

const AuctionAccess = () => {
    const [copiedField, setCopiedField] = useState<string | null>(null)
    
    const handleCopy = async (text: string, field: string) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopiedField(field)
            setTimeout(() => setCopiedField(null), 2000)
        } catch (err) {
            console.error('Failed to copy text: ', err)
        }
    }
    
    const auctionID = 'W602006'
    const auctionPassword = 'Eddie819048508833'
    const auctionLink = 'https://www.iauc.co.jp/service/login'
    
    return (
        <section
            className="grid gap-4 bg-white rounded-lg shadow-sm border border-gray-300 p-6 max-w-screen-md mx-auto my-10 text-center">
            <h2 className="text-lg font-bold uppercase text-sky-600 border-b-2 border-sky-500 pb-2">
                Access All Japanese Auctions
            </h2>
            <p className="text-gray-700 font-semibold">
                Click below to log in and browse live Japanese auctions. When you see a car you want to bid on, record its LOT NO. and send it to us via WhatsApp or Contact Form. We will contact you to confirm your bid.
            </p>
            <Link
                href={auctionLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-sky-700 uppercase text-white py-2 rounded font-bold hover:bg-sky-900 transition"
            >
                Click to Access Auction Site
            </Link>
            
            <div className="bg-gray-100 p-3 rounded-md text-left mt-4 space-y-2">
                <div className="flex items-center justify-between">
                    <p>
                        <strong>USERNAME/ID:</strong> {auctionID}
                    </p>
                    <button
                        onClick={() => handleCopy(auctionID, 'id')}
                        className="p-1 hover:bg-gray-200 rounded transition"
                        aria-label="Copy ID"
                    >
                        {copiedField === 'id' ? (
                            <CheckIcon className="w-5 h-5 text-green-500"/>
                        ) : (
                            <ClipboardIcon className="w-5 h-5 text-gray-600"/>
                        )}
                    </button>
                </div>
                <div className="flex items-center justify-between">
                    <p>
                        <strong>Password:</strong> {auctionPassword}
                    </p>
                    <button
                        onClick={() => handleCopy(auctionPassword, 'password')}
                        className="p-1 hover:bg-gray-200 rounded transition"
                        aria-label="Copy Password"
                    >
                        {copiedField === 'password' ? (
                            <CheckIcon className="w-5 h-5 text-green-500"/>
                        ) : (
                            <ClipboardIcon className="w-5 h-5 text-gray-600"/>
                        )}
                    </button>
                </div>
            </div>
            
            <small className="text-sm text-gray-500 font-medium">
                Copy and paste the credentials above to access your auction account.
            </small>
        </section>
    )
}

export default AuctionAccess
