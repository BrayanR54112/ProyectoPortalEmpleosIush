import React from 'react';

const Descripcion = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">¿Qué es nuestro portal?</h1>
      <p className="mb-4">
        Realizamos un portal de ofertas laborales para estudiantes, donde aparte de poder
        encontrar oportunidades para desarrollar habilidades en sus respectivas carreras, nuestra
        plataforma surge como un punto de encuentro entre talento y oportunidades.
      </p>

      <h2 className="text-2xl font-semibold mb-2">¿Qué ofrecemos?</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Explorar ofertas laborales de empresas locales.</li>
        <li>Conectar con talento local: profesionales, emprendedores y freelancers.</li>
        <li>Intercambiar conocimientos y servicios mediante un sistema de trueque de habilidades.</li>
        <li>Crear perfiles personalizados para mostrar experiencia, habilidades y proyectos.</li>
      </ul>

      <p>
        Nuestra plataforma está diseñada para ser intuitiva y moderna, accesible para todos los niveles
        de conocimiento digital.
      </p>
    </div>
  );
};

export default Descripcion;