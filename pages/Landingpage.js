import React from 'react'
import Image from 'next/image'
import styles from '../src/app/Landingpage.module.css'

{/* <Image src="/coffiandmilk.png" alt="Coffi and Milk" width={500} height={500}
    className='absolute'
/> */}

export default function Landingpage() {
    return (
        <div>
            <div className='flex'>
                <div>
                    <Image src='/Polygon.png'
                        width={220}
                        height={220}
                        className={styles.polygon}
                    />
                    <Image src="/coffiandmilk.png" alt="Coffi and Milk" width={500} height={500}
                        className='overlay z-2'
                    />
                </div>
                <div className='text-[#5F5F5F] text-xl font-semibold flex flex-col justify-end'>
                    <p> ORDER WITH PURPOSE 🥘 </p>
                    <p> DONATE WITH HEART ❤ </p>
                </div>
            </div>
        </div>
    )
}
