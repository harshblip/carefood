import { getSession } from "next-auth/react";
import HomeStyles from "../src/app/Home.module.css";
import Landingpage from "./Landingpage";

export async function getServerSideProps(context) {
    const session = await getSession(context);
    return {
        props: { session },
    };
}

export default function Home({ }) {
    return (
        <>
            <div className={HomeStyles.container}>
                <Landingpage />
            </div>
        </>
    );
}
