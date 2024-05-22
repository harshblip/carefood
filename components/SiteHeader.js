import AuthBtn from "./AuthBtn"
import '../src/app/SiteHeader.module.css'
import { useSession, signOut } from "next-auth/react";
import DropdownMenu from "./Dropdownbtn";
import { useSelector } from "react-redux";

const SiteHeader = () => {
  const userName = useSelector(state => state.signup.name)
  return (
    <header>
      <figure>
        <div className="wrapper flex">
          <div className="logo font-semibold">
            <a href={`/`} className="text-xl md:ml-16">
              <span className="text-white bg-green-400 rounded-md mr-2 px-2 py-1 ">
                C
              </span>
              <span className="tracking-widest text-[#70EA5C]">
                AREFOOD
              </span>
            </a>
          </div>

          <div className="invisible md:visible btngroup space-x-16 font-semibold mt-2">
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

          <div className="md:hidden">
            <DropdownMenu />
          </div>

          <div className="hidden md:flex space-x-4 md:mr-0">
            <AuthBtn />
            {
              userName ? <></> : <button className=" bg-green-400 p-2 rounded-md text-white h-10 w-20">Signup</button>
            }
          </div>

        </div>
      </figure>
    </header>
  )
}

export default SiteHeader
