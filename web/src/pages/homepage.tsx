import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

const Navbar = () => (
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
    </div>
  </nav>
);
//crea
const Homepage = () => {
  const [selectedCareer, setSelectedCareer] = useState<Carrera>('Ingeniería de Sistemas');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [career, setCareer] = useState<Carrera>('Ingeniería de Sistemas');

  const carreras = Object.keys(ofertas) as Carrera[];

  const handleCrearOferta = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/api/offers/create',
        { title, description, career },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      setTitle('');
      setDescription('');
      setCareer('Ingeniería de Sistemas');
    } catch (error: any) {
      alert(error.response?.data?.error || 'Error al crear oferta');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <Navbar />

      {/* Bienvenida y botones */}
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
      
      {/* Formulario para crear oferta */}
      <div className="bg-white p-8 mt-8 rounded shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Crear nueva oferta</h2>
        <form onSubmit={handleCrearOferta} className="space-y-4">
          <input
            type="text"
            placeholder="Título de la oferta"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <select
            value={career}
            onChange={(e) => setCareer(e.target.value as Carrera)}
            className="w-full p-2 border rounded"
            required
          >
            {carreras.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Publicar oferta
          </button>
        </form>
      </div>
    </div> 
  );
};

export default Homepage;
