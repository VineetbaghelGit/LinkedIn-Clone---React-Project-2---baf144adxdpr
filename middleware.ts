/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable indent */
import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import {USER_TOKEN} from './utils/AppConfig'
import {PROTECTED_ROUTES} from './utils/protected-routes'

function isAuthenticated(token: any): boolean {
  if (!token) {
    return true
  }
  return false
}

export default function middleware(
  req: NextRequest,
): NextResponse<unknown> | undefined {
  const cookie = req.cookies.get(USER_TOKEN)

  if (
    isAuthenticated(cookie?.value) &&
    PROTECTED_ROUTES.includes(req.nextUrl.pathname)
  ) {
    const absoluteURL = new URL('/login', req.nextUrl.origin)
    return NextResponse.redirect(absoluteURL.toString())
  }
}
