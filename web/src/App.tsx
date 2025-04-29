
import './App.css'
import Signin from './pages/signin'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/signin'
import Descripcion from './pages/homepage'
 
export default function App() 
{
   return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 p-4 text-white flex gap-4">
        <Link to="/">Inicio</Link>
        <Link to="/descripcion">Descripción del Trabajo</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/descripcion" element={<Descripcion />} />
      </Routes>
    </div>
  )
}



