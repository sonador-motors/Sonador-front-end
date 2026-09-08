import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {PosterType} from "@/lib/data";

function Posters({posters} : {posters: PosterType[]}) {
    return (
        <section className='content-grid mb-10'>
            <div className='grid w-full gap-2 sm:grid-cols-2 lg:grid-cols-4'>
                {posters.map((poster, idx: number) => (
                    <Link href={poster.href} key={idx} className='border-2 rounded border-gray-400 w-full'>
                        <Image
                            src={poster.image}
                            alt={poster.alt}
                            width={300}
                            height={200}
                            className='rounded  w-full h-full'
                        />
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default Posters;