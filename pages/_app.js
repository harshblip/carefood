import "../src/app/globals.css";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "../store";

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function App({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <div>
            <SessionProvider session={session}>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                            <Component {...pageProps} />
                    </PersistGate>
                </Provider>
            </SessionProvider>
        </div>
    );
}
