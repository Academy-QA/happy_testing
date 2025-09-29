import { NextResponse } from 'next/server';

export async function POST() {
  // Elimina la cookie de sesión (ejemplo: 'session')
  const response = NextResponse.redirect('http://localhost:3000/login');
  response.cookies.set('session', '', { path: '/', expires: new Date(0) });
  return response;
}
