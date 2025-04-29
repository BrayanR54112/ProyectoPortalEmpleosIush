import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type Carrera =
  | 'Ingeniería de Sistemas'
  | 'Contaduría'
  | 'Administración de Empresas'
  | 'Derecho';

const ofertas: Record<Carrera, { id: number; titulo: string }[]> = {
  'Ingeniería de Sistemas': [
    { id: 1, titulo: 'Desarrollador Frontend - Exito' },
    { id: 2, titulo: 'Practicante QA - Didi' },
  ],
  'Contaduría': [
    { id: 3, titulo: 'Asistente contable - Banco de Bogota' },
    { id: 4, titulo: 'Pasante en auditoría - Rappi' },
  ],
  'Administración de Empresas': [
    { id: 5, titulo: 'Analista junior - MercadoLibre' },
    { id: 6, titulo: 'Practicante en logística - MercadoLibre' },
  ],
  'Derecho': [
    { id: 7, titulo: 'Pasante jurídico - Bufete Patiño' },
    { id: 8, titulo: 'Asesor legal junior - Consultores' },
  ],
};

const Navbar = () => (
  <nav className="bg-indigo-600 p-4 shadow-md">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <Link to="/" className="text-white font-bold text-2xl">Portal de Empleos</Link>
      <div className="hidden md:flex space-x-6">
        <Link to="/" className="text-white hover:text-indigo-200">Inicio</Link>
        <Link to="/about" className="text-white hover:text-indigo-200">Sobre Nosotros</Link>
        <Link to="/contact" className="text-white hover:text-indigo-200">Contacto</Link>
      </div>
    </div>
  </nav>
);

const Homepage = () => {
  const [selectedCareer, setSelectedCareer] = useState<Carrera>('Ingeniería de Sistemas');
  const [modalOferta, setModalOferta] = useState<{ id: number; titulo: string } | null>(null);
  const navigate = useNavigate();

  const carreras = Object.keys(ofertas) as Carrera[];

  const closeModal = () => setModalOferta(null);
  const verDetalle = () => {
    if (modalOferta) {
      navigate(`/detalle-oferta/${modalOferta.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <Navbar />

      <div className="w-full bg-indigo-700 text-white py-16 text-center">
        <h2 className="text-4xl font-bold mb-2">Conecta con tu futuro</h2>
        <p className="text-lg">Encuentra prácticas, empleos y haz networking con estudiantes como tú.</p>
      </div>

      <div className="bg-white p-10 rounded shadow-lg max-w-5xl mx-auto mt-10">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">Bienvenido al portal de empleos</h1>
        <p className="text-gray-700 mb-6">
          Explora ofertas laborales o realiza trueques de habilidades con estudiantes y egresados de la IUSH.
        </p>

        <div className="flex flex-wrap gap-3 mb-8 justify-center sm:justify-start">
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
          <h2 className="text-xl font-semibold text-indigo-500 mb-4">
            Ofertas para {selectedCareer}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {ofertas[selectedCareer].map((oferta) => (
              <div
                key={oferta.id}
                className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-indigo-600 text-2xl">💼</span>
                  <p className="text-gray-800 font-medium text-lg">{oferta.titulo}</p>
                </div>
                <button
                  className="mt-auto bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                  onClick={() => setModalOferta(oferta)}
                >
                  Aplicar ahora
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOferta && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold text-indigo-600 mb-4">{modalOferta.titulo}</h2>
            <p className="text-gray-700 mb-6">
              Aquí puedes ver más información sobre esta oferta. ¿Deseas aplicar ahora?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={verDetalle}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Ver detalles
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
