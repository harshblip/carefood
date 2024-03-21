import AuthBtn from "./AuthBtn"
import '../src/app/SiteHeader.module.css'
import { useSession, signOut } from "next-auth/react";
import DropdownMenu from "./Dropdownbtn";

const SiteHeader = () => {
  const { data: session, status } = useSession();
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
          
          <div className="invisible md:visible btngroup space-x-16 font-semibold">
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
            <button className=" bg-green-400 p-2 rounded-md text-white h-10 w-20">
              {
                status === "authenticated" ? <p onClick={() => signOut()}> Logout </p> : <p> Signup </p>
              }
            </button>
          </div>
        
        </div>
      </figure>
    </header>
  )
}

export default SiteHeader
