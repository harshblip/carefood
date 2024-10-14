import AuthBtn from "./AuthBtn"
import { useSelector } from "react-redux"
import { Comfortaa } from 'next/font/google';
import styles from '../src/app/resturants.module.css'
import { useRouter } from "next/router";

const comfortaa = Comfortaa({
    subsets: ['latin'],
    display: 'swap',
    weight: ['300']
});

export default function Header() {

    const router = useRouter()
    const userName = useSelector(state => state.signup.name)

    return (
        <>
            <div className={`${comfortaa.className} flex justify-between sm:mt-0 mt-12 p-8 ml sm:mr-24 z-10`}>
                <div className="heavy-weight -ml-6">
                    <p className={`tracking-normal text-[#2d5c3c] text-4xl sm:text-2xl`}>
                        carefood
                    </p>
                </div>
                <div className={`heavy-weight flex space-x-4 md:mr-0`}>
                    <AuthBtn />
                    {
                        userName ? <></> : <button 
                        className={`${styles.logo} bg-[#216f3f] p-2 rounded-md text-white h-9 w-20  text-xs`}
                        onClick={() => router.push('/Signup')}
                        >Signup</button>
                    }
                </div>
            </div>
        </>
    )
}