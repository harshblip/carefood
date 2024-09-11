import { useRouter } from "next/router";
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { logout } from "../slices/signupSlice";
import axios from 'axios';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Comfortaa } from "next/font/google";
import { ChevronDown } from "lucide-react";

const comfortaa = Comfortaa({
    subsets: ['latin'],
    display: 'swap',
    weight: ['400', '700']
});

const AuthBtn = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const userName = useSelector(state => state.signup.name)
    const userEmail = useSelector(state => state.signup.email)
    console.log(userName);

    const handleLogout = async () => {
        try {
            const response = await axios.post('/api/logout', {
                email: userEmail,
            }, {
                withCredentials: true,
            });

            if (response.status >= 200 && response.status < 300) {
                dispatch(logout());
                console.log("User logged out");
                router.push('/Login');
            } else {
                console.error('Failed to log out');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleLoginClick = () => {
        router.push('/Login');
    };

    return (

        <div className="auth-btn mt-2 ">
            {
                userName ?
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button className="outline-none border-none flex items-center -mt-5">
                                <p className={`${comfortaa.className} text-[#2d5c3c] font-bold text-lg`}> Hey, {userName} </p>
                                <ChevronDown
                                    className="w-5 ml-2 text-[#2d5c3c]"
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-44 text-[#418a58] font-normal text-sm backdrop-blur-sm'>
                            <DropdownMenuLabel
                                className="hover:cursor-pointer hover:bg-[#418a58] hover:text-white transition-all rounded-sm"
                                onClick={() => handleLogout()}
                            >
                                Logout
                            </DropdownMenuLabel>
                            <DropdownMenuLabel
                                className="hover:cursor-pointer hover:bg-[#418a58] hover:text-white transition-all rounded-sm"
                                onClick={() => router.push('/Myorders')}
                            >
                                My orders
                            </DropdownMenuLabel>
                            <DropdownMenuLabel
                                className="hover:cursor-pointer hover:bg-[#418a58] hover:text-white transition-all rounded-sm"
                                onClick={() => router.push('/Cart')}
                            >
                                My cart
                            </DropdownMenuLabel>
                        </DropdownMenuContent>
                    </DropdownMenu> : <button onClick={handleLoginClick} className="text-xs">Login</button>
            }
        </div>
    );
};

export default AuthBtn;
