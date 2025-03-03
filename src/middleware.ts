import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log(`Path: ${path}`);

  const isPublicPath = path === '/signin' || path === '/signup' || path === '/forgotpassword' || path === '/resetpassword';
  console.log(`Is Public Path: ${isPublicPath}`);

  const token = request.cookies.get('token')?.value || '';
  console.log(`Token: ${token}`);



  if (isPublicPath && token) {
    console.log('Redirecting to home because user is authenticated and trying to access a public path');
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (!isPublicPath && !token && path !== '/') {
    console.log('Redirecting to login because user is not authenticated and trying to access a protected path');
    return NextResponse.redirect(new URL('/signin', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/signin',
    '/signup',
    '/resetpassword',
    '/forgotpassword',
    '/admin'
  ]
};