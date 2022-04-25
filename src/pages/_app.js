import '../styles/globals.css'
import Head from 'next/head'
import Header from '../components/layout/Header'
import { AuthContextProvider } from '../context/AuthContext'
import { RecoilRoot } from 'recoil'

export default function App({ Component, pageProps }) {
    return (
        <AuthContextProvider>
            <RecoilRoot>
                <Head>
                    <title>VAC TRACKER</title>
                    <meta
                        name="description"
                        content="App for tracking suspects and cheaters in counter-strike: global offensive"
                    />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Header />
                <Component {...pageProps} />
            </RecoilRoot>
        </AuthContextProvider>
    )
}
