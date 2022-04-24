import '../styles/globals.css'
import Head from 'next/head'
import Header from '../components/layout/Header'
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps }) {
    return (
        <SessionProvider session={pageProps.session}>
            <Head>
                <title>Vac List</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <Component {...pageProps} />
        </SessionProvider>
    )
}
