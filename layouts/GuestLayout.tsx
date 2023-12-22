import {useRouter} from 'next/navigation'
import React, {useEffect} from 'react'
import {IsUserAuthenticated} from '../utils/SelectorConfig'

interface GuestLayoutProps {
  children: React.ReactNode
}
function GuestLayout({
  children,
}: Readonly<GuestLayoutProps>): React.JSX.Element {
  const isUserLoggedIn: boolean = IsUserAuthenticated()
  console.log('isUserLoggedIn', isUserLoggedIn)
  const router = useRouter()
  useEffect(() => {
    if (isUserLoggedIn) {
      router.push('/')
    }
  }, [isUserLoggedIn, router])
  return <div>{children}</div>
}

export default GuestLayout
