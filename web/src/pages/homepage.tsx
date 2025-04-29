import React, { useState } from 'react';

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

const Homepage = () => {
  const [selectedCareer, setSelectedCareer] = useState<Carrera>('Ingeniería de Sistemas');

  const carreras = Object.keys(ofertas) as Carrera[];

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="bg-white p-8 rounded shadow-lg max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">Bienvenido al portal de empleos</h1>
        <p className="text-gray-700 mb-6">
          Encuentra oportunidades laborales o realiza trueques de habilidades con estudiantes y egresados.
        </p>

        <div className="flex flex-wrap gap-3 mb-6">
          {carreras.map((carrera) => (
            <button
              key={carrera}
              onClick={() => setSelectedCareer(carrera)}
              className={`px-4 py-2 rounded-md font-semibold ${
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
          <h2 className="text-xl font-semibold text-indigo-500 mb-3">Ofertas para {selectedCareer}</h2>
          <ul className="list-disc pl-5 text-gray-800">
            {ofertas[selectedCareer].map((oferta, index) => (
              <li key={index} className="mb-2">{oferta}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
