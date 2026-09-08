import { NextResponse } from 'next/server'

export function proxy() {
    const response = NextResponse.next()
    
    // Set headers as array of key-value pairs to avoid type errors
    const headers = new Headers({
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_VERCEL_URL || '*',
        'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT',
        'Access-Control-Allow-Headers': 'Accept, Content-Type, Authorization, X-CSRF-Token, X-CSRFToken',
        'X-DNS-Prefetch-Control': 'on',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin'
    })
    
    // Copy all headers to the response
    headers.forEach((value, key) => {
        response.headers.set(key, value)
    })
    
    return response
}

export const config = {
    matcher: '/:path*'
}