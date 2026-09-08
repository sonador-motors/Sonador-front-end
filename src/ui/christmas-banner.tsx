'use client'

import React from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import Confetti from 'react-confetti'

const STORAGE_KEY = 'hide_christmas_banner'
const mediaType = 'video'
const mediaSrc = '/easter-wishes-sonador.mp4'
const holidayTitle = 'Happy Easter 🎄'
const holidayDescription = 'Thank You Our Customers for your continued support. We Promise to Provide you with even more reliable high quality japanese vehicles as we have always done it.'

const ChristmasBannerModal = () => {
    const [open, setOpen] = React.useState(false)
    const [showConfetti, setShowConfetti] = React.useState(false)
    const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 })

    React.useEffect(() => {
        const hidden = localStorage.getItem(STORAGE_KEY)
        if (!hidden) {
            setOpen(true)
            setShowConfetti(true)
        }
    }, [])

    // Stop confetti after a few seconds
    React.useEffect(() => {
        if (!showConfetti) return

        const timer = setTimeout(() => {
            setShowConfetti(false)
        }, 8000)

        return () => clearTimeout(timer)
    }, [showConfetti])

    // Track viewport size
    React.useEffect(() => {
        const updateSize = () =>
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            })

        updateSize()
        window.addEventListener('resize', updateSize)
        return () => window.removeEventListener('resize', updateSize)
    }, [])

    const closeModal = () => {
        localStorage.setItem(STORAGE_KEY, 'true')
        setOpen(false)
        setShowConfetti(false)
    }

    if (!open) return null

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center">
            {/* Confetti */}
            {showConfetti && (
                <Confetti
                    width={dimensions.width}
                    height={dimensions.height}
                    numberOfPieces={500}
                    gravity={0.15}
                    recycle={false}
                    colors={[
                        '#DC2626', // festive red
                        '#F59E0B', // gold
                        '#FFFFFF', // snow
                        '#1E3A8A', // deep blue
                    ]}
                />
            )}

            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={closeModal}
            />

            {/* Modal */}
            <div
                className="
                    relative z-10
                    w-[92%]
                    max-w-3xl
                    rounded-3xl
                    overflow-hidden
                    shadow-[0_30px_80px_rgba(0,0,0,0.6)]
                    bg-gradient-to-b md:bg-gradient-to-r
                    from-sky-200
                    via-gray-900
                    to-blue-950
                "
            >
                {/* Close button */}
                <button
                    onClick={closeModal}
                    className="absolute right-3 top-3 z-20 rounded-full bg-black/70 p-2 text-white hover:bg-black"
                    aria-label="Close banner"
                >
                    <X size={18} />
                </button>

                {/* Banner image */}
                <div className="relative aspect-[4/5] md:aspect-[16/9] w-full">
                    {mediaType === "video" ? (
                        <video
                            src={mediaSrc}
                            autoPlay
                            muted
                            controls={false}
                            loop
                            playsInline
                            className="w-full h-full object-contain rounded-t-3xl"
                        />
                    ) : (
                        <Image
                            src={mediaSrc}
                            alt='Holiday Wishes'
                            fill
                            priority
                            className='object-contain'
                        />
                    )}
                </div>

                {/* Optional text & CTA */}
                <div className="p-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide">
                        {holidayTitle}
                    </h2>
                    <p className="mt-2 text-sm md:text-base text-gray-200 capitalize">
                        {holidayDescription}
                    </p>

                    <a
                        href="/stock"
                        className="
                            inline-block mt-4
                            rounded-xl
                            bg-amber-400
                            px-6 py-3
                            font-bold
                            text-amber-950
                            hover:bg-amber-600
                            transition
                        "
                    >
                        View Stock
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ChristmasBannerModal
