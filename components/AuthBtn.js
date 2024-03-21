import { RefreshIcon } from "@heroicons/react/solid";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
const AuthBtn = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

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
            <div className="auth-btn mt-2">
                <button onClick={handleLoginClick}>Login</button>
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
