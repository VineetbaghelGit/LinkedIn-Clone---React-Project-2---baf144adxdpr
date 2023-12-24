import {useRouter} from 'next/navigation'
import React, {useEffect} from 'react'
import {IsUserAuthenticated} from '../utils/SelectorConfig'
import AuthHeader from '../shared/AuthHeader'

interface AuthLayoutProps {
  children: React.ReactNode
}
function AuthLayout({children}: Readonly<AuthLayoutProps>): React.JSX.Element {
  const isUserLoggedIn: boolean = IsUserAuthenticated()
  const router = useRouter()

  useEffect(() => {
    if (!isUserLoggedIn) {
      router.push('/login')
    }
  }, [isUserLoggedIn, router])
  return (
    <div>
      <AuthHeader />
      {children}
    </div>
  )
}

export default AuthLayout
