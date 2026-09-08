export const localBrands = [
    {image: '/car-brands/abarth.jpg', name: 'Abarth'},
    {image: '/car-brands/alpine.jpg', name: 'Alpine'},
    {image: '/car-brands/aston-martin.jpg', name: 'Aston Martin'},
    {image: '/car-brands/audi.jpg', name: 'Audi'},
    {image: '/car-brands/bentley.jpg', name: 'Bentley'},
    {image: '/car-brands/benz.jpg', name: 'Merc Benz'},
    {image: '/car-brands/bmw.jpg', name: 'BMW'},
    {image: '/car-brands/byd.jpg', name: 'BYD'},
    {image: '/car-brands/citroen.jpg', name: 'Citroën'},
    {image: '/car-brands/cupra.jpg', name: 'CUPRA'},
    {image: '/car-brands/dacia.jpg', name: 'Dacia'},
    {image: '/car-brands/ds-auto.jpg', name: 'DS Automobiles'},
    {image: '/car-brands/ferrari.jpg', name: 'Ferrari'},
    {image: '/car-brands/fiat.jpg', name: 'Fiat'},
    {image: '/car-brands/ford.jpg', name: 'Ford'},
    {image: '/car-brands/gwm.jpg', name: 'GWM'},
    {image: '/car-brands/hillman.jpg', name: 'Hillman'},
    {image: '/car-brands/honda.jpg', name: 'Honda'},
    {image: '/car-brands/hyundai.jpg', name: 'Hyundai'},
    {image: '/car-brands/jaguar.jpg', name: 'Jaguar'},
    {image: '/car-brands/jeep.jpg', name: 'Jeep'},
    {image: '/car-brands/kgm.jpg', name: 'KGM'}, // formerly SsangYong
    {image: '/car-brands/kia.jpg', name: 'Kia'},
    {image: '/car-brands/lada.jpg', name: 'Lada'},
    {image: '/car-brands/lamborghini.jpg', name: 'Lamborghini'},
    {image: '/car-brands/landrover.jpg', name: 'Land Rover'},
    {image: '/car-brands/lexus.jpg', name: 'Lexus'},
    {image: '/car-brands/lotus.jpg', name: 'Lotus'},
    {image: '/car-brands/maserati.jpg', name: 'Maserati'},
    {image: '/car-brands/maxus.jpg', name: 'Maxus'},
    {image: '/car-brands/mazda.jpg', name: 'Mazda'},
    {image: '/car-brands/mclaren.jpg', name: 'McLaren'},
    {image: '/car-brands/mg.jpg', name: 'MG'},
    {image: '/car-brands/mini.jpg', name: 'MINI'},
    {image: '/car-brands/mitsubshi.jpg', name: 'Mitsubishi'}, // Note: filename typo fixed in name
    {image: '/car-brands/nissan.jpg', name: 'Nissan'},
    {image: '/car-brands/omoda.jpg', name: 'Omoda'},
    {image: '/car-brands/peugeot.jpg', name: 'Peugeot'},
    {image: '/car-brands/polestar.jpg', name: 'Polestar'},
    {image: '/car-brands/porsche.jpg', name: 'Porsche'},
    {image: '/car-brands/rbw.jpg', name: 'RBW'},
    {image: '/car-brands/renault.jpg', name: 'Renault'},
    {image: '/car-brands/rolls-royce.jpg', name: 'Rolls Royce'},
    {image: '/car-brands/romero.jpg', name: 'Romero'},
    {image: '/car-brands/seat.jpg', name: 'SEAT'},
    {image: '/car-brands/skoda.jpg', name: 'Škoda'},
    {image: '/car-brands/subaru.jpg', name: 'Subaru'},
    {image: '/car-brands/suzuki.jpg', name: 'Suzuki'},
    {image: '/car-brands/tesla.jpg', name: 'Tesla'},
    {image: '/car-brands/toyota.jpg', name: 'Toyota'},
    {image: '/car-brands/vauxhall.jpg', name: 'Vauxhall'},
    {image: '/car-brands/volkswagen.jpg', name: 'Volkswagen'},
    {image: '/car-brands/volvo.jpg', name: 'Volvo'},
    {image: '/car-brands/isuzu.png', name: 'Isuzu'},
    {image: '/car-brands/daihatsu.svg', name: 'Daihatsu'},
    {image: '/car-brands/hino.png', name: 'Hino'},
    {image: '/car-brands/smart.jpg', name: 'Smart'},
]

export const desc = 'If you are looking for a reliable and affordable used car from Japan, you have come to the right place. At Sonador Motors, we have a huge selection of vehicles from the best Japanese auctions, all inspected and certified by our experts. You can choose from a variety of makes, models, years, prices, and colors, and find the car that suits your needs and budget. We also offer fast and easy shipping to any destination in the world, and we handle all the paperwork and customs clearance for you. You can also enjoy our excellent customer service and after-sales support, and get access to our online tracking system and email updates. With Sonador Motors, buying a used car from Japan is simple, convenient, and hassle-free. Browse our inventory today and find your dream car.'

export const links = [
    {
        name: 'Home',
        href: '/',
    },
    {
        name: 'how to buy',
        href: '/how-to-buy'
    },
    // {
    // 	name: 'Auctions and Stock Cars',
    // 	href: '/car-search'
    // },
    {
        name: 'Stock',
        href: '/stock'
    },
    {
        name: 'contact',
        href: '/contact'
    },
]
export const points = [
    {
        id: 1,
        text: 'Price & quality combination',
        desc: 'We offer the best price for the quality you get. We are not the cheapest, but we are the best.',
    },
    {
        id: 2,
        text: 'Best Service',
        desc: 'We provide smooth communication and personal sales agent, who will answer all the questions and help you in choosing, buying and any other services.',
    },
    {
        id: 3,
        text: 'Safety',
        desc: 'We are registered car exporter, member of Japanese car export associations (JUMVEA), member of Osaka Chamber of Commerce. We always follow the contract and stay against fraud',
    },
    {
        id: 4,
        text: 'Fast and safe delivery',
        desc: 'We have well established shipping process, which allows us to deliver cars to any port in the world in the shortest time.',
    },
    {
        id: 5,
        text: 'Quality Inspection',
        desc: 'We provide quality inspection service, which allows you to be sure in the quality of the car you buy.',
    },
    {
        id: 6,
        text: 'Smooth transaction',
        desc: 'Whole process of buying a car is fully automatic and takes just a few seconds. You can buy a car from your home, office or even from the beach.',
    }
]

export type PosterType = {
    image: string,
    alt: string,
    href: string
}

export const postersSetOne: PosterType[] = [
    {
        image: '/posters/swahili-english-call.jpeg',
        alt: 'Swahili & English Whatsapp Calls- Poster 4',
        href: 'https://wa.me/+819048508833'
    },
    {
        image: '/posters/new-arrivals-rv.jpeg',
        alt: 'Explore Our Stock - Poster 1',
        href: '/stock'
    },
    {
        image: '/posters/get-auction-access.png',
        alt: 'Used cars from Japan - Poster 3',
        href: '/account/profile'
    },
    {
        image: '/posters/signup-for-an-account.png',
        alt: 'Buy a premium used car from Japan - Poster 2',
        href: '/account/signup'
    },
]

export const postersSetTwo: PosterType[] = [
    {
        image: '/posters/new-arrivals.png',
        alt: 'New Arrivals',
        href: '/stock'
    },
    {
        image: '/posters/swahili-english-call.jpeg',
        alt: 'Swahili & English Whatsapp Calls',
        href: 'https://wa.me/+819048508833'
    },
    {
        image: '/posters/buying-from-japan.png',
        alt: 'Explore Our Stock',
        href: '/stock'
    },
    {
        image: '/posters/get-auction-access.png',
        alt: 'Used cars from Japan',
        href: '/account/profile'
    }
]
