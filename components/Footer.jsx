import { Comfortaa, Kanit } from "next/font/google"
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import Image from "next/image";

const comfortaa = Comfortaa({
    subsets: ['latin'],
    display: 'swap',
    weight: ['300', '600', '700']
});

const kanit = Kanit({
    weight: ['200', '300'],
    subsets: ['latin']
})

export default function Footer() {
    return (
        <>
            <div className='w-[100vw] sm:w-[100vw] p-8 absolute mt-40 bottom-footer'>
                <div className='flex justify-around mr-4 ml-4 '>
                    <Image
                        src='/plants/plant.png'
                        height={0}
                        width={120}
                        alt='plants-image'
                    />
                    <Image
                        src='/plants/flour.png'
                        height={0}
                        width={250}
                        alt='plants-image'
                    />
                    <Image
                        id="mb-img"
                        src='/plants/plant.png'
                        height={0}
                        width={120}
                        alt='plants-image'
                    />
                </div>
            </div>
            <div className='w-[130vw] sm:w-[100vw] p-8 mt-12'>
                <div className='flex space-x-6 justify-around sm:p-12'>
                    <div className='flex flex-col space-y-4'>
                        <p className={`tracking-normal text-[#2d5c3c] text-2xl font-bold ${comfortaa.className}`}> carefood</p>
                        <div className='flex flex-col'>
                            <p> Find us on </p>
                            <div className='flex space-x-4 mt-2 '>
                                <Instagram />
                                <Twitter />
                                <Facebook />
                                <Mail />
                            </div>
                        </div>
                    </div>
                    <div className={`${kanit.className} flex flex-col`}>
                        <p className='text-xl'> Company </p>
                        <div className='space-y-4 mt-2'>
                            <p> About Us </p>
                            <p> Contact Us </p>
                            <p> Careers </p>
                        </div>
                    </div>
                    <div className={`${kanit.className} hidden sm:visible sm:flex flex-col`}>
                        <p className='text-xl'> Assistance </p>
                        <div className='space-y-4 mt-2'>
                            <p> Terms and Conditions </p>
                            <p> Privacy Policy </p>
                        </div>
                    </div>
                    <div className={`${kanit.className} flex flex-col`}>
                        <p className='text-xl'> Services </p>
                        <div className='space-y-4 mt-2'>
                            <p> Find a restaurant </p>
                            <p> Contact our god </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}