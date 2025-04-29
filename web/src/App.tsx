
import './App.css'
import Signin from './pages/signin'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/signin'
import Descripcion from './pages/homepage'
 
export default function App() 
{
   return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/homepage" element={<Descripcion />} />
      </Routes>
    
  )
}



