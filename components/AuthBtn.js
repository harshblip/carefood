import { RefreshIcon } from "@heroicons/react/solid";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { logout } from "../slices/signupSlice";
import { LogOut } from "lucide-react";
import axios from 'axios';
import { TooltipProvider, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";
import { Tooltip } from "@/components/ui/tooltip";

const AuthBtn = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const dispatch = useDispatch();
    const userName = useSelector(state => state.signup.name)
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
    if (status === "loading") {
        return (
            <div className="auth-btn">
                <div className="auth-info">
                    <RefreshIcon className="icon animate-spin" />
                </div>
            </div>
        );
    }
    if (status === "unauthenticated") {
        return (
            <div className="auth-btn mt-2 ">
                {
                    userName ?
                        <div className="flex space-x-4 text-[#2d5c3c]"> <p> Hey, {userName} </p>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button variant="outline" className="-mt-1"> <LogOut /> </button>
                                    </TooltipTrigger>
                                    <TooltipContent className="border border-black mt- p-1 text-xs mr-8 rounded-md transition-all">
                                        <button>signout</button>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                        </div> : <button onClick={handleLoginClick} className="text-xs">Login</button>
                }
            </div>
        );
    }
    // {
    //     console.log(session.user.email)
    // }
    return (
        <div className="">
        </div>
    );
};
export default AuthBtn;
