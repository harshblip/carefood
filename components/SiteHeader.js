import AuthBtn from "./AuthBtn"
import styles from '../src/app/SiteHeader.module.css'
import { Comfortaa } from 'next/font/google';
import { useSelector } from "react-redux";

const comfortaa = Comfortaa({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '600', '700']
});

const SiteHeader = () => {
  const userName = useSelector(state => state.signup.name)
  return (
    <header className={comfortaa.className}>
      <figure>
        <div className="wrapper flex">
          <div className={styles.logo}>
            <a href={`/`} className="text-xl md:ml-16">
              <span className="tracking-normal text-[#2d5c3c] text-2xl">
                carefood
              </span>
            </a>
          </div>

          <div className={`${styles.logo} invisible md:visible btngroup space-x-16 font-semibold mt-2 text-xs text-[#545a51]`}>
            <button>
              Home
            </button>
            <button>
              About us
            </button>
            <button>
              Services
            </button>
          </div>

          <div className={`${styles.logo} flex space-x-4 md:mr-0 -mt-2`}>
            <AuthBtn />
            {
              userName ? <></> : <button className={`${styles.logo} bg-[#216f3f] p-2 rounded-md text-white h-9 w-20  text-xs`}>Signup</button>
            }
          </div>

        </div>
      </figure>
    </header>
  )
}

export default SiteHeader
