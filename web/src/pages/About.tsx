import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="bg-white p-8 rounded shadow-lg max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">Sobre Nosotros</h1>
        <p className="text-gray-700 mb-6">
          Somos un equipo de estudiantes apasionados por conectar talento con oportunidades. Nuestro portal busca
          ser una plataforma integral para estudiantes y egresados, facilitando su acceso a vacantes laborales y
          promoviendo el intercambio de habilidades entre profesionales.
        </p>

        <h2 className="text-2xl font-semibold text-indigo-500 mb-3">Nuestra Misión</h2>
        <p className="text-gray-700 mb-6">
          Facilitar el acceso a oportunidades laborales y promover la cooperación entre estudiantes y empresas locales.
        </p>

        <h2 className="text-2xl font-semibold text-indigo-500 mb-3">Nuestro Equipo</h2>
        <p className="text-gray-700 mb-6">
          Contamos con un equipo multidisciplinario de desarrolladores, diseñadores y expertos en negocios que trabajan
          para hacer crecer esta plataforma y ayudar a que los estudiantes puedan alcanzar su máximo potencial.
        </p>

        <h2 className="text-2xl font-semibold text-indigo-500 mb-3">¿Por qué elegirnos?</h2>
        <ul className="list-disc pl-5 text-gray-700 mb-6">
          <li>Ofrecemos una plataforma intuitiva y fácil de usar.</li>
          <li>Conectamos talento local con empresas que buscan innovar.</li>
          <li>Fomentamos el intercambio de conocimientos y experiencias.</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
