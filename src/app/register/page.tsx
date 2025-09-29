"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    nationality: '',
    phone: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      router.push('/login');
    } else {
      setError(data.error || 'Error al registrar usuario');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-2">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-10 flex flex-col items-center border border-gray-100">
        <div className="flex items-center gap-2 mb-8">
          <span className="bg-green-400 rounded p-2">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#4ADE80"/><path d="M7 12h10M12 7v10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
          </span>
          <span className="font-extrabold text-2xl text-green-600 tracking-tight">NutriApp</span>
        </div>
        <h2 className="text-4xl font-extrabold mb-2 text-center text-gray-800">Crear cuenta</h2>
        <p className="text-gray-500 mb-8 text-center">Regístrate para comenzar</p>
        <form className="space-y-6 w-full" onSubmit={handleSubmit} autoComplete="on">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Nombre</label>
              <input type="text" name="firstName" placeholder="Nombre" value={form.firstName} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 text-lg focus:ring-2 focus:ring-green-200 focus:outline-none" required autoFocus />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Apellido</label>
              <input type="text" name="lastName" placeholder="Apellido" value={form.lastName} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 text-lg focus:ring-2 focus:ring-green-200 focus:outline-none" required />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1 font-semibold text-gray-700">Email</label>
              <input type="email" name="email" placeholder="ejemplo@correo.com" value={form.email} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 text-lg focus:ring-2 focus:ring-green-200 focus:outline-none" required />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Nacionalidad</label>
              <input type="text" name="nationality" placeholder="Nacionalidad" value={form.nationality} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 text-lg focus:ring-2 focus:ring-green-200 focus:outline-none" required />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Celular</label>
              <input type="tel" name="phone" placeholder="Celular" value={form.phone} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 text-lg focus:ring-2 focus:ring-green-200 focus:outline-none" required />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1 font-semibold text-gray-700">Contraseña</label>
              <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 text-lg focus:ring-2 focus:ring-green-200 focus:outline-none" required />
            </div>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-xl font-bold text-lg hover:bg-green-600 transition shadow focus:outline-none focus:ring-2 focus:ring-green-300" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta? <a href="/login" className="text-green-500 hover:underline font-semibold">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
}
