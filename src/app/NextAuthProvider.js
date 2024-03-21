// NextAuthProvider.js
"use client";

import { SessionProvider } from "next-auth/react";

export const NextAuthProvider = ({ children, session }) => {
    return <SessionProvider session={session}>{children}</SessionProvider>;
};
