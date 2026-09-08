'use client'

import React from 'react'
import Image from "next/image"
import Link from "next/link"
import {links} from "@/lib/data"
import {usePathname} from "next/navigation"
import clsx from "clsx"
import {useAuth} from "@/lib/auth-provider"
import Script from "next/script"
import CurrencySelector from "@/ui/currency-selector"
import {useFavourites} from "@/context/favourite-context"
import {
    HeartIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline"

const Header = () => {
    const [showMenu, setShowMenu] = React.useState(false)
    const navbarRef = React.useRef<HTMLElement>(null)
    const pathname = usePathname()
    const {user, logout} = useAuth()
    const {favourites} = useFavourites()
    const favouritesCount = favourites?.size ?? 0
    const menuId = React.useId()
    
    /* Close menu on outside click */
    React.useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (
                navbarRef.current &&
                !navbarRef.current.contains(target) &&
                !target.closest('[data-toggle="menu"]')
            ) {
                setShowMenu(false)
            }
        }
        document.addEventListener('mousedown', handleOutsideClick)
        return () => document.removeEventListener('mousedown', handleOutsideClick)
    }, [])
    
    const handleShowMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setShowMenu(prev => !prev)
    }
    
    return (
        <header className="z-50">
            {/* GTranslate config */}
            <Script
                id="gtranslate-config"
                dangerouslySetInnerHTML={{
                    __html: `window.gtranslateSettings = {
                        default_language: "en",
                        native_language_names: true,
                        detect_browser_language: true,
                        languages: ["en","pt","fr","sw","es","ru","ar","ja"],
                        wrapper_selector: ".gtranslate_wrapper",
                        flag_size: 24,
                        switcher_horizontal_position: "right",
                        switcher_vertical_position: "top"
                    }`
                }}
            />
            <div className="gtranslate_wrapper"></div>
            
            {/* Floating currency (mobile) */}
            <div className="fixed top-0 left-3 z-[999] md:hidden">
                <CurrencySelector/>
            </div>
            
            <div className="content-grid">
                <div className="md:flex items-center justify-between md:pt-10 md:pb-5">
                    
                    {/* LOGO + MOBILE ICONS */}
                    <section className="z-50 flex items-center justify-between gap-3 relative pb-4 pt-8 md:py-0">
                        <Link href="/" className="block">
                            <Image
                                src="/header-logo.png"
                                alt="Sonador Motors Co.,ltd"
                                width={40}
                                height={40}
                                className="object-contain"
                            />
                        </Link>
                        
                        {/* MOBILE ICONS */}
                        <div className="flex items-center py-2 gap-3 md:hidden">
                            
                            {/* USER */}
                            <Link href={user ? "/account/profile" : "/account/login"}
                                  className="flex flex-col justify-center items-center">
                                <UserCircleIcon className={`w-8 h-8 ${user ? 'text-green-700' : 'text-blue-700'}`}/>
                                {!user ? <span className='text-xs capitalize'>Login</span> :
                                    <span className='text-xs capitalize'>Profile</span>}
                            </Link>
                            
                            {/* FAVOURITES */}
                            <Link href="/favourites" className="relative flex flex-col justify-center items-center">
                                <HeartIcon className="w-8 h-8 text-amber-600"/>
                                {favouritesCount > 0 && (
                                    <span
                                        className="absolute flex items-center justify-center w-4 h-4 bg-red-600 text-white text-xs font-bold p-1.5 rounded-full">
                                        {favouritesCount}
                                    </span>
                                )}
                                <span className='text-xs capitalize'>Favourites</span>
                            </Link>
                            
                            {/* HAMBURGER */}
                            <button
                                data-toggle="menu"
                                onClick={handleShowMenu}
                                aria-expanded={showMenu}
                                aria-controls={menuId}
                                className="focus:outline-none flex flex-col justify-center items-center"
                            >
                                {!showMenu ? (
                                    <svg className="w-8 h-8 border-2 rounded-full text-blue-500 border-blue-500 p-1"
                                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M4 6h16M4 12h16M4 18h16"/>
                                    </svg>
                                ) : (
                                    <svg className="w-8 h-8 border-2 rounded-full text-blue-500 border-blue-500 p-1"
                                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                )}
                                <span className='text-xs capitalize'>Menu</span>
                            </button>
                        </div>
                    </section>
                    
                    {/* DESKTOP NAV */}
                    <nav>
                        <ul className="hidden md:flex items-center uppercase space-x-4">
                            <div className="flex items-center gap-3 font-bold" data-toggle="menu" aria-expanded={showMenu}>
                            {links.map((link, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={link.href}
                                        className={clsx(
                                            pathname === link.href ? "text-orange-400" : "text-blue-700"
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                            </div>
                            <div className="flex items-center gap-3">
                                {/* FAVOURITES */}
                                <li className="relative">
                                    <Link href="/stock/favourites" className='flex items-center'>
                                        <HeartIcon className="w-8 h-8 text-amber-700"/>
                                        {favouritesCount > 0 && (
                                            <span
                                                className="absolute flex items-center justify-center w-4 h-4 bg-red-600 text-white text-xs font-bold p-1.5 rounded-full">
                                            {favouritesCount}
                                        </span>
                                        )}
                                        <span className='text-xs md:text-base capitalize  text-blue-700 '>Favourites</span>
                                    </Link>
                                </li>
                                
                                {/* USER */}
                                {!user ? (
                                    <li>
                                        <Link href="/account/login" className='flex items-center '>
                                            <UserCircleIcon className="w-8 h-8 text-blue-700"/>
                                            <span className='text-sm capitalize text-blue-700'>Login</span>
                                        </Link>
                                    </li>
                                ) : (
                                    <>
                                        <li>
                                            <Link href="/account/profile"
                                                  className='flex items-center'>
                                                <UserCircleIcon className="w-8 h-8 text-green-700"/>
                                                <span className='text-sm capitalize md:text-base text-blue-700'>Profile</span>
                                            </Link>
                                        </li>
                                        <li
                                            onClick={logout}
                                            className="text-sm font-semibold text-amber-700 hover:text-amber-900"
                                        >
                                            Logout
                                        </li>
                                    </>
                                )}
                                <li>
                                    <CurrencySelector/>
                                </li>
                            </div>
                        </ul>
                    </nav>
                </div>
                
                {/* MOBILE MENU */}
                <section className="md:hidden">
                    <nav
                        ref={navbarRef}
                        className={clsx(
                            "fixed top-0 left-0 w-full bg-blue-100 bg-opacity-95 pt-20 z-20 transition-all",
                            showMenu ? "translate-y-0" : "-translate-y-full"
                        )}
                    >
                        <ul className="divide-y divide-blue-900 uppercase font-bold pt-4 pb-8 px-4 text-right">
                            {links.map((link, idx) => (
                                <li key={idx} className="py-2">
                                    <Link href={link.href}
                                          onClick={() => setShowMenu(false)}
                                          className={clsx(
                                              pathname === link.href ? "text-orange-400" : "text-blue-700"
                                          )}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        {user && (
                            <button
                                onClick={logout}
                                className="block border w-full border-amber-800 text-right px-6 py-4 text-amber-800 font-bold"
                            >
                                Logout
                            </button>
                        )}
                    </nav>
                </section>
            </div>
            
            <Script src="https://cdn.gtranslate.net/widgets/latest/dwf.js" strategy='lazyOnload'/>
        </header>
    )
}

export default Header
