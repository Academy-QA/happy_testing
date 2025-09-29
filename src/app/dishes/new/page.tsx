import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import NewDishForm from './NewDishForm';

export default async function NewDishPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  if (!session || !session.value) {
    redirect('/login');
  }
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800 tracking-tight">Agregar Platillo</h1>
      <NewDishForm />
    </div>
  );
}
