import styles from '../src/app/Landingpage.module.css'
import Image from 'next/image'

export default function Homepageimg() {
    return (
        <>
            <div>
                <Image src='/Polygon.png'
                    width={220}
                    height={180}
                    className={styles.polygon}
                    alt='polygon'
                />
                <Image
                    src="/coffiandmilk.png"
                    alt="Coffi and Milk"
                    width={420}
                    height={420}
                    className='absolute z-10 -ml-60 mt-6'
                />
            </div>
        </>
    )
}
