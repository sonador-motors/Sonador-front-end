import {useMemo} from 'react'
import {useFavourites} from '@/context/favourite-context'
import {useCarContext} from '@/lib/car-context'

export const useFavouriteCars = () => {
    const {favourites, loading} = useFavourites()
    const {allStockCars} = useCarContext()
    
    const favouriteCars = useMemo(() => {
        if (!allStockCars.length || !favourites.size) return []
        
        return allStockCars.filter(car => favourites.has(car.id))
    }, [allStockCars, favourites])
    
    return {
        favouriteCars,
        loading,
        hasFavourites: favouriteCars.length > 0,
    }
}
