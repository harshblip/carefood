import { getSession } from "next-auth/react";
import HomeStyles from "../src/app/Home.module.css";
import SignupForm from "./Signup";

export async function getServerSideProps(context) {
    const session = await getSession(context);
    return {
        props: { session },
    };
}

export default function Home({ session }) {
    return (
        <>
            <div className={HomeStyles.container}>
                <SignupForm />
            </div>
        </>
    );
}
