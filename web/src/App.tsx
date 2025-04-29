
import './App.css'
import Signin from './pages/signin'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/signin'
import Descripcion from './pages/homepage'
import About from './pages/About';
import Contact from './pages/Contact';
import ForgotPassword from './pages/ForgotPassword';
import DetalleOferta from './components/DetalleOferta';
import Navbar from './components/Navbar';
 
export default function App() 
{
   return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/homepage" element={<Descripcion />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/detalle-oferta/:id" element={<DetalleOferta />} />
      </Routes>
    
  )
}



