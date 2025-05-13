import './App.css';
import { Routes, Route } from 'react-router-dom';

import Signin from './pages/signin';
import Descripcion from './pages/homepage';
import About from './pages/About';
import Contact from './pages/Contact';
import ForgotPassword from './pages/ForgotPassword';
import DetalleOferta from './components/DetalleOferta';
import Register from './pages/Register';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/homepage" element={<Descripcion />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/detalle-oferta/:id" element={<DetalleOferta />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
