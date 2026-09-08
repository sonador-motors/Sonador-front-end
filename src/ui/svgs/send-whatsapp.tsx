import React from 'react';
import Image from "next/image";

const SendWhatsapp = () => (
    <a className='flex items-center justify-center gap-1  py-2 bg-green-600 rounded text-sky-100 uppercase font-bold'
       href='https://wa.me/819048508833'
    >
        <Image
            src='/whatsapp.png'
            alt='Whatsapp Icon'
            width={30} height={30}
        />
        Whatsapp Chat
    </a>
);

export default SendWhatsapp;