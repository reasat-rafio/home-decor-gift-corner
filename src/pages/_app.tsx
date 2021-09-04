import Head from 'next/head'
import '../styles/global.css'
import NProgress from 'nprogress'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from '../store/store'
import type { AppProps } from 'next/app'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { UserProvider } from '@auth0/nextjs-auth0'

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter()
    let persistor = persistStore(store)

    // page route changing loading bar
    useEffect(() => {
        let routeChangeStart = () => NProgress.start()
        let routeChangeComplete = () => NProgress.done()

        router.events.on('routeChangeStart', routeChangeStart)
        router.events.on('routeChangeComplete', routeChangeComplete)
        router.events.on('routeChangeError', routeChangeComplete)
        return () => {
            router.events.off('routeChangeStart', routeChangeStart)
            router.events.off('routeChangeComplete', routeChangeComplete)
            router.events.off('routeChangeError', routeChangeComplete)
        }
    }, [])

    return (
        <UserProvider>
            <main className="font-jost bg-antiFlashWhite">
                <Head>
                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
                    />
                </Head>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <Component {...pageProps} />
                    </PersistGate>
                </Provider>
            </main>
        </UserProvider>
    )
}

export default MyApp
