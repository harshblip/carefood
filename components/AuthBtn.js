import { useRouter } from "next/router";
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { logout } from "../slices/signupSlice";
import axios from 'axios';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Comfortaa } from "next/font/google";

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
                            <Button className="outline-none border-none">
                                <p className={`${comfortaa.className} text-[#2d5c3c] font-bold text-lg`}> Hey, {userName} </p>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-44 text-[#2d5c3c] font-normal text-sm'>
                            <DropdownMenuLabel
                                className="hover:cursor-pointer hover:bg-[#f8f9fa] rounded-sm"
                                onClick={() => handleLogout()}
                            >
                                logout
                            </DropdownMenuLabel>
                            <DropdownMenuLabel
                                className="hover:cursor-pointer hover:bg-[#f8f9fa] rounded-sm"
                                onClick={() => router.push('/myorders')}
                            >
                                my orders
                            </DropdownMenuLabel>
                        </DropdownMenuContent>
                    </DropdownMenu> : <button onClick={handleLoginClick} className="text-xs">Login</button>
            }
        </div>
    );
};

export default AuthBtn;
