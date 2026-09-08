'use client'

import React from 'react'
import { Heart } from 'lucide-react'
import { useFavourites } from '@/context/favourite-context'

type Props = {
    vehicleId: number
    className?: string
}

const FavouriteHeart = ({ vehicleId, className }: Props) => {
    const { isFavourite, toggleFavourite, loading, mounted } = useFavourites()
    const liked = React.useMemo(() => isFavourite(vehicleId), [isFavourite, vehicleId])
    
    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (loading) return
        await toggleFavourite(vehicleId)
    }

    return (
        <button
            onClick={handleClick}
            aria-label="Toggle favourite"
            disabled={loading}
            className={`
                absolute bottom-2 right-2 z-10
                rounded-full p-2
                bg-white/80 backdrop-blur
                transition
                hover:scale-110
                ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                ${className ?? ''}
            `}
        >
            <Heart
                className={`
                    w-4 h-4
                    transition-colors
                    ${liked ? 'fill-red-500 stroke-red-500' : 'stroke-gray-600'}
                `}
            />
        </button>
    )
}

export default FavouriteHeart
