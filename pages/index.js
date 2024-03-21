import { useState } from "react";
import NotesList from "../components/NotesList";
import Editor from "../components/Editor";
import Head from "next/head";
import { getSession } from "next-auth/react";
import HomeStyles from "../src/app/Home.module.css";
import Landingpage from "./Landingpage";
import SignupForm from "./Signup";

export async function getServerSideProps(context) {
    const session = await getSession(context);
    return {
        props: { session },
    };
}

{/* <NotesList session={session}/> */ }
export default function Home({ session }) {
    const [showEditor, setShowEditor] = useState(true);
    return (
        <>
            <Head>
                <title>Notes app</title>
                <meta name="description" content="Food app built with Next.js, Prisma & MongoDB" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={HomeStyles.container}>
                <SignupForm />
            </div>
        </>
    );
}
