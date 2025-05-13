import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

type Carrera = 'Ingeniería de Sistemas' | 'Contaduría' | 'Administración de Empresas' | 'Derecho';

type Oferta = {
  id: number;
  title: string;
  description: string;
  career: Carrera;
};

type Postulacion = {
  name: string;
  email: string;
  cv: File | null;
  offerId: number;
};

const Navbar = () => (
  <nav className="bg-indigo-600 p-4 shadow-md">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/" className="text-white font-bold text-2xl font-poppins">Portal de Empleos</Link>
      </div>
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
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [career, setCareer] = useState<Carrera>('Ingeniería de Sistemas');
  const [ofertas, setOfertas] = useState<Oferta[]>([]);
  const [postulacion, setPostulacion] = useState<Postulacion>({
    name: '',
    email: '',
    cv: null,
    offerId: 0,
  });
  const [showPostulationForm, setShowPostulationForm] = useState(false);

  const carreras = ['Ingeniería de Sistemas', 'Contaduría', 'Administración de Empresas', 'Derecho'];

  // Cargar ofertas desde el backend
  useEffect(() => {
    const fetchOfertas = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/offers');
        setOfertas(res.data);
      } catch (error) {
        console.error('Error al cargar ofertas:', error);
      }
    };
    fetchOfertas();
  }, []);

  // Crear una nueva oferta
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
      // Actualizar ofertas después de crear una nueva
      setOfertas((prev) => [...prev, response.data.offer]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.error || 'Error al crear oferta');
      } else {
        console.error('Error desconocido:', error);
        alert('Error desconocido');
      }
    }
  };

  // Manejar la postulación
  const handlePostularse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', postulacion.name);
      formData.append('email', postulacion.email);
      if (postulacion.cv) {
        formData.append('cv', postulacion.cv);
      }
      formData.append('offerId', postulacion.offerId.toString());

      const response = await axios.post('http://localhost:3000/api/apply', formData);
      alert('Postulación exitosa!');
      setShowPostulationForm(false);
      setPostulacion({ name: '', email: '', cv: null, offerId: 0 });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert('Error al postularse: ' + error.response?.data?.error);
      } else {
        console.error('Error desconocido:', error);
        alert('Error desconocido');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10 font-poppins">
      <Navbar />

      {/* Bienvenida y botones */}
      <div className="bg-white p-8 rounded shadow-lg max-w-5xl mx-auto mt-8">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4 text-center">Bienvenido al portal de empleos 🚀</h1>
        <p className="text-gray-700 mb-6 text-center">
          Encuentra oportunidades laborales o realiza trueques de habilidades con estudiantes y egresados.
        </p>

        <div className="flex flex-wrap gap-3 mb-6 justify-center sm:justify-start">
          {carreras.map((carrera) => (
            <button
              key={carrera}
              onClick={() => setSelectedCareer(carrera as Carrera)}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <h2 className="text-xl font-semibold text-indigo-500 mb-3 col-span-3">Ofertas para {selectedCareer} 🎯</h2>
          {ofertas
            .filter((oferta) => oferta.career === selectedCareer)
            .map((oferta) => (
              <div key={oferta.id} className="border rounded-lg shadow-lg p-4 bg-white">
                <strong>{oferta.title}</strong><br />
                <small>{oferta.description}</small><br />
                <button
                  onClick={() => {
                    setPostulacion((prev) => ({ ...prev, offerId: oferta.id }));
                    setShowPostulationForm(true);
                  }}
                  className="bg-indigo-600 text-white px-4 py-2 rounded mt-2"
                >
                  Postularse
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Sección de Crear Oferta */}
      <div className="bg-white p-8 mt-8 rounded shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4 text-center">Crear nueva oferta 📝</h2>
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

      {/* Sección de Preguntas Frecuentes */}
      <div className="bg-white p-8 mt-8 rounded shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4 text-center">Preguntas Frecuentes 🤔</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border p-4 rounded-lg">
            <strong>¿Cómo postularme a una oferta?</strong>
            <p>Simplemente selecciona la oferta que te interesa y llena el formulario de postulación.</p>
          </div>
          <div className="border p-4 rounded-lg">
            <strong>¿Cómo crear una oferta?</strong>
            <p>Puedes crear ofertas si estás registrado como empleador, solo necesitas llenar el formulario.</p>
          </div>
          <div className="border p-4 rounded-lg">
            <strong>¿Es necesario tener un CV para postularme?</strong>
            <p>Sí, es recomendable subir tu CV para que los empleadores puedan evaluar tu perfil.</p>
          </div>
          <div className="border p-4 rounded-lg">
            <strong>¿Puedo postularme a varias ofertas al mismo tiempo?</strong>
            <p>Sí, puedes postularte a todas las ofertas que te interesen sin ningún problema.</p>
          </div>
          <div className="border p-4 rounded-lg">
            <strong>¿Cómo me contactarán los empleadores?</strong>
            <p>Los empleadores te contactarán directamente a tu correo electrónico o número de teléfono.</p>
          </div>
        </div>
      </div>

      {/* Formulario para postularse */}
      {showPostulationForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg transform scale-95 transition-transform duration-500 ease-in-out hover:scale-100 max-w-md w-full">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4 text-center">Formulario de Postulación 📝</h2>
            <form onSubmit={handlePostularse} className="space-y-4">
              <input
                type="text"
                placeholder="Tu nombre"
                value={postulacion.name}
                onChange={(e) => setPostulacion({ ...postulacion, name: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="email"
                placeholder="Tu correo electrónico"
                value={postulacion.email}
                onChange={(e) => setPostulacion({ ...postulacion, email: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="file"
                onChange={(e) => setPostulacion({ ...postulacion, cv: e.target.files ? e.target.files[0] : null })}
                className="w-full p-2 border rounded"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
              >
                Postularse
              </button>
              <button
                type="button"
                onClick={() => setShowPostulationForm(false)}
                className="bg-red-600 text-white px-4 py-2 rounded mt-2 hover:bg-red-700 transition"
              >
                Atrás
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
