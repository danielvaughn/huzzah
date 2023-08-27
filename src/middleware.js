import { NextResponse } from 'next/server'

export function middleware(req) {
  const cookie = req.cookies.get('hzp')

  if (!req.cookies.has('hzp')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  if (!cookie) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  if (cookie.value !== process.env.PASSWORD) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/editor'
}
