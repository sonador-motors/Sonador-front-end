'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/auth-provider'
import { useFavouriteCars } from '@/lib/hooks/use-favourites-cars'
import Car from '@/ui/car'

const FavouriteSection = () => {
    const { user } = useAuth()
    const { favouriteCars, loading, hasFavourites } = useFavouriteCars()

    if (loading) {
        return (
            <section className="content-grid py-10">
                <p className="text-center text-gray-500">
                    Loading favourites…
                </p>
            </section>
        )
    }

    const count = favouriteCars.length
    
    // bg-gradient-to-br from-amber-50 via-orange-50 to-white

    return (
        <section className="gap-8 py-10 md:gap-12 content-grid">
            <div className="space-y-8">
            {/* Header + Counter */}
            <h2 className="uppercase text-center font-extrabold text-xl md:text-2xl text-amber-800 flex items-center justify-center gap-3">
                <span className='underline'>Your Favourite Vehicles</span>
            </h2>

            {/* Guest warning */}
            {!user && hasFavourites && (
                <div className="max-w-2xl mx-auto bg-yellow-50 border border-yellow-400 p-4 rounded text-center">
                    <p className="font-semibold text-yellow-800">
                        You are not logged in. Your liked cars may disappear anytime.
                    </p>
                    <Link
                        href="/account/login"
                        className="inline-block mt-3 bg-gradient-to-r from-black to-gray-700 text-white px-5 py-2 rounded font-bold transition hover:opacity-90"
                    >
                        Login To Save Your Liked Vehicles
                    </Link>
                </div>
            )}

            {/* No favourites */}
            {!hasFavourites && (
                <div className="text-center space-y-3">
                    <p className="text-gray-600">
                        You haven’t liked any cars yet.
                    </p>
                    <Link
                        href="/stock"
                        className="inline-block uppercase text-amber-700 font-semibold underline underline-offset-4"
                    >
                        Browse cars
                    </Link>
                </div>
            )}
            </div>

            {/* Favourite cars grid */}
            {hasFavourites && (
                <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {favouriteCars.map(car => (
                        <Car key={car.id} car={car} />
                    ))}
                </section>
            )}
        </section>
    )
}

export default FavouriteSection
