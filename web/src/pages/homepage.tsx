import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type Carrera =
  | 'Ingeniería de Sistemas'
  | 'Contaduría'
  | 'Administración de Empresas'
  | 'Derecho';

const ofertas: Record<Carrera, string[]> = {
  'Ingeniería de Sistemas': [
    'Desarrollador Frontend - TechCompany',
    'Practicante QA - StartupX',
  ],
  'Contaduría': [
    'Asistente contable - Firmax',
    'Pasante en auditoría - Contadores Unidos',
  ],
  'Administración de Empresas': [
    'Analista junior - Compañía Z',
    'Practicante en logística - Transporte S.A.',
  ],
  'Derecho': [
    'Pasante jurídico - Bufete López',
    'Asesor legal junior - JurisConsultores',
  ],
};

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-white font-bold text-2xl">Portal de Empleos</Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-indigo-200">Inicio</Link>
          <Link to="/about" className="text-white hover:text-indigo-200">Sobre Nosotros</Link>
          <Link to="/contact" className="text-white hover:text-indigo-200">Contacto</Link>
        </div>
        <div className="md:hidden">
          <button className="text-white" onClick={() => alert('Menu desplegable')}>
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
};

const Homepage = () => {
  const [selectedCareer, setSelectedCareer] = useState<Carrera>('Ingeniería de Sistemas');

  const carreras = Object.keys(ofertas) as Carrera[];

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <Navbar />

      {/* Sección principal */}
      <div className="bg-white p-8 rounded shadow-lg max-w-5xl mx-auto mt-8">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">Bienvenido al portal de empleos</h1>
        <p className="text-gray-700 mb-6">
          Encuentra oportunidades laborales o realiza trueques de habilidades con estudiantes y egresados.
        </p>

        <div className="flex flex-wrap gap-3 mb-6 justify-center sm:justify-start">
          {carreras.map((carrera) => (
            <button
              key={carrera}
              onClick={() => setSelectedCareer(carrera)}
              className={`px-4 py-2 rounded-md font-semibold text-lg transition duration-300 ease-in-out ${
                selectedCareer === carrera
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-300 hover:bg-indigo-300 text-gray-800'
              }`}
            >
              {carrera}
            </button>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-semibold text-indigo-500 mb-3">
            Ofertas para {selectedCareer}
          </h2>
          <ul className="list-disc pl-5 text-gray-800 space-y-3">
            {ofertas[selectedCareer].map((oferta, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-indigo-600">💼</span>
                {oferta}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Sección de Vacantes Destacadas */}
      <div className="bg-white p-8 mt-8 rounded shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Vacantes Destacadas</h2>
        <ul className="list-disc pl-5 text-gray-800 space-y-3">
          <li>Desarrollador Backend - SoftwareTech</li>
          <li>Asistente administrativo - Empresa S.A.</li>
          <li>Diseñador gráfico - Creativos Ltda.</li>
          <li>Analista de datos - DataCorp</li>
        </ul>
      </div>

      {/* Cómo funciona el portal */}
      <div className="bg-indigo-100 p-8 mt-8 rounded shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">¿Cómo funciona el portal?</h2>
        <p className="text-gray-700 mb-6">
          El portal de empleos conecta a estudiantes y egresados con empresas que buscan talento joven.
          Los usuarios pueden postularse a vacantes o intercambiar habilidades en un sistema de trueque.
        </p>
        
      </div>

      {/* Testimonios */}
      <div className="bg-white p-8 mt-8 rounded shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Testimonios</h2>
        <div className="space-y-6">
          <p className="text-gray-700">
            
            - Juan Pérez
          </p>
          <p className="text-gray-700">
            
            - Ana Martínez
          </p>
        </div>
      </div>

      {/* Botón flotante para acceder a la página de registro */}
      <div className="fixed bottom-6 right-6">
        <Link to="/register">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition">
            Preguntas Frecuentes
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
