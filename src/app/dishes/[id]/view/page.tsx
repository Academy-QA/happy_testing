import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ViewDishDetail from './ViewDishDetail';

export default async function ViewDishPage({ params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  if (!session || !session.value) {
    redirect('/login');
  }
  const { id } = await params;
  return <ViewDishDetail id={id} />;
}
