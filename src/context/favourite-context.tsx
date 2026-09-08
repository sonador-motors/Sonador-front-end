'use client'

import React from 'react'
import axios from 'axios'
import { carsBaseUrl } from '@/lib/utils'
import { useAuth } from '@/lib/auth-provider'
import Cookies from 'js-cookie'

type FavouriteContextType = {
  favourites: Set<number>
  isFavourite: (id: number) => boolean
  toggleFavourite: (id: number) => Promise<void>
  loading: boolean
    mounted: boolean
}

const FavouriteContext = React.createContext<FavouriteContextType | null>(null)
const LS_KEY = 'vehicle_ids'

export const FavouriteProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, loading: authLoading } = useAuth()

  const [favourites, setFavourites] = React.useState<Set<number>>(new Set())
  const [loading, setLoading] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  /* ------------------ MOUNT ------------------ */
  React.useEffect(() => {
    setMounted(true)
  }, [])

  /* ------------------ INIT ------------------ */
  React.useEffect(() => {
    if (!mounted || authLoading) return

    // Guest
    if (!user) {
      try {
        const raw = localStorage.getItem(LS_KEY)
        setFavourites(raw ? new Set(JSON.parse(raw)) : new Set())
      } catch {
        setFavourites(new Set())
      }
      return
    }

    // Authenticated
    const fetchFavourites = async () => {
      setLoading(true)

      try {
        const csrfToken = Cookies.get('csrftoken')
        const accessToken = Cookies.get('accessToken')

        const res = await axios.get(`${carsBaseUrl}favourites/`, {
          headers: {
            Authorization: `JWT ${accessToken}`,
            'X-CSRFToken': csrfToken ?? '',
          },
        })

        setFavourites(new Set(res.data?.favourites ?? []))
      } catch {
        // fail silently — do NOT block render
      } finally {
        setLoading(false)
      }
    }

    fetchFavourites()
  }, [user, authLoading, mounted])

  /* ------------------ TOGGLE ------------------ */
  const toggleFavourite = async (id: number) => {
    if (loading) return

    // Guest
    if (!user) {
      setFavourites(prev => {
        const next = new Set(prev)
        next.has(id) ? next.delete(id) : next.add(id)
        localStorage.setItem(LS_KEY, JSON.stringify([...next]))
        return next
      })
      return
    }

    try {
      const csrfToken = Cookies.get('csrftoken')
      const accessToken = Cookies.get('accessToken')

      const res = await axios.post(
        `${carsBaseUrl}favourites/toggle/`,
        { vehicle_id: id },
        {
          headers: {
            Authorization: `JWT ${accessToken}`,
            'X-CSRFToken': csrfToken ?? '',
          },
        },
      )

      setFavourites(prev => {
        const next = new Set(prev)
        res.data.liked ? next.add(id) : next.delete(id)
        return next
      })
    } catch {
      // silent fail
    }
  }

  return (
    <FavouriteContext.Provider
      value={{
        favourites,
        isFavourite: id => favourites.has(id),
        toggleFavourite,
        loading,
          mounted
      }}
    >
      {children}
    </FavouriteContext.Provider>
  )
}

export const useFavourites = () => {
  const ctx = React.useContext(FavouriteContext)
  if (!ctx) throw new Error('useFavourites must be used inside FavouriteProvider')
  return ctx
}
