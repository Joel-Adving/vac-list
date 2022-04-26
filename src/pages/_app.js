import '../styles/globals.css'
import Head from 'next/head'
import Header from '../components/layout/Header'
import { AuthContextProvider } from '../context/AuthContext'
import { RecoilRoot } from 'recoil'
import { useRouter } from 'next/router'
import ProtectedRoute from '../util/ProtectedRoute'

const authRequired = ['/test', '/add-suspect']

export default function App({ Component, pageProps }) {
    const router = useRouter()
    return (
        <AuthContextProvider>
            <RecoilRoot>
                <Head>
                    <title>VAC TRACKER</title>
                    <meta
                        name="description"
                        content="VAC TRACKER is an app for tracking suspects and cheaters VAC/ban status in Counter-Strike: Global Offensive"
                    />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Header />
                {!authRequired.includes(router.pathname) ? (
                    <>
                        <Component {...pageProps} />
                    </>
                ) : (
                    <ProtectedRoute>
                        <Component {...pageProps} />
                    </ProtectedRoute>
                )}
            </RecoilRoot>
        </AuthContextProvider>
    )
}
