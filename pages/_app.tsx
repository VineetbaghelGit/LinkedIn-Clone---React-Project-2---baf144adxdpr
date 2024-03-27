import '@/components/styles/globals.css'
import type {AppProps} from 'next/app'
import React from 'react'
import {Poppins} from 'next/font/google'
import {Provider} from 'react-redux'
import {store} from '../store/store'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loader from './loader'
import Head from 'next/head'
const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})
export default function App({
  Component,
  pageProps,
}: AppProps): React.JSX.Element {
  return (
    <main className={`${poppins.className}`}>
      <Head>
        <title>LinkedIn</title>
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
        <ToastContainer />
      </Provider>
      <Loader />
    </main>
  )
}
