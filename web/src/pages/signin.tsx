import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react';

export default function Signin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      //Guardar datos del usuario
      localStorage.setItem('user', JSON.stringify(response.data.user));
      console.log('Respuesta del backend:', response.data);
      navigate('/homepage');
    } catch (error: any) {
      alert(`Error al iniciar sesión: ${error.response?.data?.error || error.message}`);
    }
  };

  const navigateToForgotPassword = () => {
    navigate('/forgot-password');
  };

  const navigateToRegister = () => {
    navigate('/register');
  };

  return (
    <div className='w-full h-screen flex'>
      <div className='relative w-1/2 h-full'>
        <img 
          className='absolute inset-0 w-full h-full object-cover'
          src="https://www.iush.edu.co/Uploads/header/admisiones/principal.jpg"
          alt="Background"
        />
        <div className='absolute inset-0 bg-black opacity-50'></div>
        <div className='absolute top-10 left-10'>
          <img 
            className='h-16'
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Logo_IUSH.jpg/1200px-Logo_IUSH.jpg" 
            alt="IUSH Logo" 
          />
        </div>
      </div>

      <div className='w-1/2 h-full bg-gray-900 flex items-center justify-center px-16'>
        <div className='max-w-md w-full'>
          <section className="space-y-6">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-white mb-2">
                <span className="block text-indigo-500">Portal de Empleos IUSH</span>
                <span className="block text-white">Iniciar Sesión</span>
              </h1>
              <p className="text-gray-400 text-lg">Comienza nuestra aventura juntos</p>
            </div>

            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                  Correo institucional
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-2 px-3 transition-colors duration-100"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-2 px-3 transition-colors duration-100"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-200"
              >
                Iniciar Sesión
              </button>

              {/* Botón para registrarse */}
              <button
                type="button"
                onClick={navigateToRegister}
                className="w-full bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-200 mt-2"
              >
                Registrarme
              </button>
            </form>

            <div className="text-center text-sm text-gray-400">
              <a
                href="#"
                className="hover:text-indigo-500"
                onClick={navigateToForgotPassword} 
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
