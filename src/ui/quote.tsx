'use client'

import React from 'react'
import {CarType} from "@/lib/car-context";
import EnquiresForm from "@/ui/forms/enquiries-form";

const Quote = ({ car } : { car: CarType }) => {
    return (
        <>
            <h1 className='font-extrabold underline underline-offset-4 uppercase text-center text-xl text-black md:text-3xl'>Please Request For Invoice</h1>
            <section className='space-y-4 mb-2'>
                <EnquiresForm
                    address={true}
                    notificationMessage='All fields are required. Please fill in all fields to get a quote.'
                    car={car}
                />
            </section>
        </>
    )
}

export default Quote