import React from 'react';
import { useParams } from 'react-router-dom';

const mockDetalles: Record<string, { titulo: string; descripcion: string }> = {
  '1': {
    titulo: 'Desarrollador Frontend - Exito',
    descripcion: 'Se busca desarrollador frontend con experiencia en React.',
  },
  '2': {
    titulo: 'Practicante QA - Didi',
    descripcion: 'Práctica universitaria en control de calidad para apps móviles.',
  },
  '3': {
    titulo: 'Asistente contable - Banco de Bogota',
    descripcion: 'Manejo básico de libros contables y software contable.',
  },
};

const DetalleOferta = () => {
  const { id } = useParams<{ id: string }>(); // Usamos useParams para obtener el id desde la URL
  const detalle = mockDetalles[id || '1']; // Accedemos al detalle usando el id o por defecto '1'

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="bg-white p-8 rounded shadow-lg max-w-5xl mx-auto mt-8">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">{detalle.titulo}</h1>
        <p className="text-gray-700 mb-6">{detalle.descripcion}</p>
        <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition">
          Postúlate
        </button>
      </div>
    </div>
  );
};

export default DetalleOferta;
