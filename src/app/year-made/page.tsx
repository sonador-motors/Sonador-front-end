import Image from "next/image";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Get the difference between Registration and Manufacturer Year from Sonador Motors Co., Ltd",
    description: "Learn the difference between the registration year and the manufacturer year of a car from Sonador Motors Co., Ltd. This information is important because customs departments in many countries are calculating import duty based on car age from the manufacture date. Our staff has databases to check the actual manufacture date for many makers (Japanese and foreign also). So if import duty in your country is calculating based on the actual age of the car - all you need to do is to ask us to check the manufacture date of interesting cars for you, we will gladly help.",
}

const YearMade = () => {
    return (
        <main className='content-grid mb-10 space-y-4 border-t border-blue-600 pt-4'>
            <h1 className='text-3xl text-center uppercase font-black mb-10'>Registration- Manufacturer Year
                Difference</h1>
            <section className='grid gap-8 md:grid-cols-2'>
                <div className='space-y-4'>
                    <Image src='/year-made.jpg'
                           alt='Japanese Auction Sheet'
                           width={800}
                           height={800}
                    />
                    <div className='space-y-2 hidden md:block'>
                        <p className='font-bold text-amber-800 underline underline-offset-2'>How To Check Year Of Manufacture On The Cars On Our Website</p>
                        <section className='grid md:grid-cols-2 gap-4'>
                            <Image
                                src='/yop-fone.png'
                                alt='A screenshot of how to check year of production on phone'
                                width={500}
                                height={500}
                                className='border-2 border-gray-400 rounded'
                            />
                            <Image
                                src='/yop-desktop.jpeg'
                                alt='A screenshot of how to check year of production on desktop'
                                width={500}
                                height={500}
                                className='border-2 border-gray-400 rounded'
                            />
                        </section>
                    </div>
                </div>
                <section className='grid gap-4'>
                    <p>Dear Customer, please note, for all vehicle registration and export documents Japanese Transport
                        Bureau is using first registration date, not date of manufacture. This examples will help you
                        better understand it.</p>
                    <p>This information is important because customs departments in many countries are calculating
                        import duty based on car age from manufacture date.</p>
                    <p className='bg-blue-200 p-2 md:p-4'><span className='font-bold text-blue-700'>Example 1: </span>Car
                        is manufactured in December 2009, but it was selling in dealer&apos;s showroom for 6 month, then
                        sold in June 2010. So first registration happened in June 2010 and registration certificate of
                        this car will be dated June 2010. And if we bought this car, export certificate will also have
                        June 2010.</p>
                    <p className='bg-blue-100 p-2 md:p-4'><span className='font-bold text-blue-700'>Example 2: </span>Imported
                        cars will also have first registration date in certificate. As example in January 2011 japanese
                        buyer imported vintage car manufactured in 1960 from USA. He registered this car in January
                        2011, so this date will be in registration certificate. And if we bought this car, export
                        certificate will also have January 2011 although this is vintage car from 1960s!</p>
                    <p>Our staff has databases to check actual manufacture date for many makers (Japanese and foreign
                        also). So if import duty in your country is calculating based on actual age of the car - all you
                        need to do is to ask us to check manufacture date of cars you are interested in, we will gladly
                        help. Or use our inbuilt solution for the cars available on our website (Reference the photos
                        attached below and this can be found on every car you click on)</p>
                    <div className='space-y-2 md:hidden'>
                        <p className='font-bold text-amber-800 underline underline-offset-2'>How To Check Year Of Manufacture On The Cars On Our Website</p>
                        <section className='grid md:grid-cols-2 gap-4'>
                            <Image
                                src='/yop-fone.png'
                                alt='A screenshot of how to check year of production on phone'
                                width={500}
                                height={500}
                                className='border-2 border-gray-400 rounded'
                            />
                            <Image
                                src='/yop-desktop.jpeg'
                                alt='A screenshot of how to check year of production on desktop'
                                width={500}
                                height={500}
                                className='border-2 border-gray-400 rounded'
                            />
                        </section>
                    </div>
                </section>
            </section>
        </main>
    )
}

export default YearMade