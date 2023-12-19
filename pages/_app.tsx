import '@/components/styles/globals.css'
import type {AppProps} from 'next/app'
import React from 'react'
import {Poppins} from 'next/font/google'

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
      <Component {...pageProps} />
    </main>
  )
}
