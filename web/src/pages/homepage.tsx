import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

type Noticia = {
  id: number;
  title: string;
  description: string;
  date: string;
  isExpanded?: boolean;
};

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="bg-indigo-500 p-4 shadow-md" role="navigation">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-white font-bold text-2xl font-poppins" aria-label="Ir a la página de inicio">
            Portal de Empleos
          </Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link to="/about" className="text-white hover:text-indigo-200 p-2 bg-indigo-600 rounded-md transition-colors duration-200" aria-label="Ir a la página de sobre nosotros">Sobre Nosotros</Link>
          <Link to="/contact" className="text-white hover:text-indigo-200 p-2 bg-indigo-600 rounded-md transition-colors duration-200" aria-label="Ir a la página de contacto">Contacto</Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

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
  const [loading, setLoading] = useState(false); // Indicador de carga
  const [userRole, setUserRole] = useState<string | null>(null); // Guardar el rol del usuario

  // Noticias predefinidas
  const [noticias, setNoticias] = useState<Noticia[]>([
    {
      id: 1,
      title: "Candidatos Órganos Colegiados 2025",
      description: "Conoce a los candidatos a los distintos órganos colegiados para la elección de representantes 2025 de la Institución Universitaria Salazar y Herrera y no olvides ejercer tu derecho al voto el 21 de mayo.",
      date: "05 May 2025",
    },
    {
      id: 2,
      title: "Ceremonia de Graduación del 6 de junio de 2025",
      description: "Para la Institución Universitaria Salazar y Herrera es un orgullo que nuestros estudiantes estén a punto de culminar una etapa tan importante como lo fue su proceso de formación profesional.",
      date: "30 Abr 2025",
    },
    {
      id: 3,
      title: "Beneficios académicos FUNAYA",
      description: "La Institución Universitaria Salazar y Herrera, a través de Bienestar Institucional, te ofrece la oportunidad de beneficiarte de los programas de la Fundación Acoger y Acompañar (FUNAYA).",
      date: "11 Abr 2025",
    },
    {
      id: 4,
      title: "Renovación del Registro Calificado del Programa de Derecho",
      description: "Ministerio de Educación Nacional de Colombia renueva el registro calificado del programa de Derecho de la Institución Universitaria Salazar y Herrera.",
      date: "06 Mar 2025",
    },
  ]);

  const carreras = ['Ingeniería de Sistemas', 'Contaduría', 'Administración de Empresas', 'Derecho'];

  // Verificar el rol del usuario desde el localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.role) {
      setUserRole(user.role);  // Guardar el rol del usuario
    }
  }, []);

  // Cargar ofertas desde el backend
  useEffect(() => {
    const fetchOfertas = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/offers');
        setOfertas(res.data);  // Cargar las ofertas de la API
      } catch (error) {
        console.error('Error al cargar ofertas:', error);
      }
    };
    fetchOfertas();
  }, []);

  // Crear una nueva oferta
  const handleCrearOferta = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);  // Mostrar indicador de carga
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
      setOfertas((prev) => [...prev, response.data.offer]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.error || 'Error al crear oferta');
      } else {
        console.error('Error desconocido:', error);
        alert('Error desconocido');
      }
    } finally {
      setLoading(false); // Ocultar indicador de carga
    }
  };

  // Manejar la postulación
  const handlePostularse = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);  // Mostrar indicador de carga
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
    } finally {
      setLoading(false); // Ocultar indicador de carga
    }
  };

  const toggleNoticia = (id: number) => {
    const updatedNoticias = noticias.map((noticia) => {
      if (noticia.id === id) {
        return { ...noticia, isExpanded: !noticia.isExpanded };
      }
      return noticia;
    });
    setNoticias(updatedNoticias);
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
              aria-label={`Seleccionar carrera: ${carrera}`}
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
              <div key={oferta.id} className="border rounded-lg shadow-lg p-4 bg-white flex flex-col justify-between">
                <strong>{oferta.title}</strong><br />
                <small>{oferta.description}</small><br />
                <div className="mt-auto">
                  <button
                    onClick={() => {
                      setPostulacion((prev) => ({ ...prev, offerId: oferta.id }));
                      setShowPostulationForm(true);
                    }}
                    className="bg-indigo-600 text-white px-4 py-2 rounded mt-2 w-full hover:scale-105 transition"
                  >
                    Postularse
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Sección de Crear Oferta - Solo visible para admins */}
      {userRole === 'admin' && (
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
              tabIndex={0}
              aria-label="Título de la oferta"
            />
            <textarea
              placeholder="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
              required
              tabIndex={0}
              aria-label="Descripción de la oferta"
            />
            <select
              value={career}
              onChange={(e) => setCareer(e.target.value as Carrera)}
              className="w-full p-2 border rounded"
              required
              tabIndex={0}
              aria-label="Selecciona la carrera"
            >
              {carreras.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
              aria-label="Publicar oferta"
            >
              Publicar oferta
            </button>
          </form>
        </div>
      )}

      {/* Sección de Noticias */}
      <div className="bg-white p-8 mt-12 rounded shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4 text-center">Últimas Noticias 📰</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {noticias.map((noticia) => (
            <div key={noticia.id} className="border rounded-lg shadow-lg p-4 bg-white">
              <strong>{noticia.title}</strong><br />
              <small>{noticia.date}</small><br />
              <p>{noticia.description.slice(0, 100)}...</p>
              <button
                onClick={() => toggleNoticia(noticia.id)}
                className="bg-indigo-600 text-white px-4 py-2 rounded mt-2 w-full hover:scale-105 transition"
              >
                {noticia.isExpanded ? 'Ver menos' : 'Ver más'}
              </button>
              {noticia.isExpanded && <p className="mt-4">{noticia.description}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Sección de Preguntas Frecuentes */}
      <div className="bg-gray-200 p-8 mt-12 rounded shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4 text-center">Preguntas Frecuentes (FAQ) ❓</h2>
        <div className="space-y-4">
          <div>
            <strong>1. ¿Cómo me postulo a una oferta?</strong>
            <p>Para postularte a una oferta, solo haz clic en el botón "Postularse" y completa el formulario con tu información y CV.</p>
          </div>
          <div>
            <strong>2. ¿Necesito crear una cuenta para postularme?</strong>
            <p>Sí, necesitas registrarte para poder postularte a las ofertas disponibles.</p>
          </div>
          <div>
            <strong>3. ¿Cómo puedo crear una oferta de empleo?</strong>
            <p>Si eres administrador, podrás crear ofertas desde la sección "Crear nueva oferta" ubicada en la página principal.</p>
          </div>
        </div>
      </div>

      {/* Formulario de Postulación */}
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
                tabIndex={0}
                aria-label="Nombre del postulante"
              />
              <input
                type="email"
                placeholder="Tu correo electrónico"
                value={postulacion.email}
                onChange={(e) => setPostulacion({ ...postulacion, email: e.target.value })}
                className="w-full p-2 border rounded"
                required
                tabIndex={0}
                aria-label="Correo electrónico del postulante"
              />
              <input
                type="file"
                onChange={(e) => setPostulacion({ ...postulacion, cv: e.target.files ? e.target.files[0] : null })}
                className="w-full p-2 border rounded"
                aria-label="Adjuntar CV"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                aria-label="Enviar postulación"
              >
                Postularse
              </button>
              <button
                type="button"
                onClick={() => setShowPostulationForm(false)}
                className="bg-red-600 text-white px-4 py-2 rounded mt-2 hover:bg-red-700 transition"
                aria-label="Cerrar formulario de postulación"
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
