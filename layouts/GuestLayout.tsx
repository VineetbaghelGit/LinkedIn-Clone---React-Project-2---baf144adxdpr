import {useRouter} from 'next/navigation'
import React, {useEffect} from 'react'
import {IsUserAuthenticated} from '../utils/SelectorConfig'
import GuestHeader from '../shared/GuestHeader'

interface GuestLayoutProps {
  children: React.ReactNode
}
function GuestLayout({
  children,
}: Readonly<GuestLayoutProps>): React.JSX.Element {
  const isUserLoggedIn: boolean = IsUserAuthenticated()
  const router = useRouter()
  useEffect(() => {
    if (isUserLoggedIn) {
      router.push('/')
    }
  }, [isUserLoggedIn, router])
  return (
    <div>
      <GuestHeader />
      {children}
    </div>
  )
}

export default GuestLayout
