import { RefreshIcon } from "@heroicons/react/solid";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
const AuthBtn = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                console.log("User logged out")
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
            <div className="auth-btn mt-2 space-x-4">
                <button onClick={handleLoginClick}>Login</button>
                <button onClick={handleLogout} >Signout</button>
            </div>
        );
    }
    // {
    //     console.log(session.user.email)
    // }
    return (
        <div className="">
            <div className="flex space-x-2">
                <Image src={session.user.image} alt={session.user.name} width={30} height={30} className="rounded-full" />
                <p className="mt-2">Hi, {session.user.name}</p>
            </div>
        </div>
    );
};
export default AuthBtn;
