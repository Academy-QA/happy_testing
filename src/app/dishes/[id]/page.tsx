import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import EditDishForm from './EditDishForm';

export default async function EditDishPage({ params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  if (!session || !session.value) {
    redirect('/login');
  }
  const { id } = await params;
  return <EditDishForm id={id} />;
}
