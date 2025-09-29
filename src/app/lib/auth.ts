import { cookies } from 'next/headers';

export async function requireSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  if (!session || !session.value) {
    throw new Error('NO_SESSION');
  }
  // Aquí podrías validar el token/cookie si es necesario
  return session.value;
}
