import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import CategoriaTable from './components/CategoriaTable';
import CreateCategoria from './components/CreateCategoria';
import EditarCategoria from './components/EditarCategoria';
import Grafico from './components/Grafico';

const App = () => {
  return (
   <>
    <Grafico/>

      <div className="d-flex flex-colum align-items center">
        <h3 className='py-3 mx-3'>Cosumiendo una API con Backend Spring Boot</h3>
        
      </div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CategoriaTable />} />
          <Route path="/create" element={<CreateCategoria />} />
          <Route path="/grafico" element={<Grafico />} />
          <Route path="/edit/:id" element={<EditarCategoria />} />
        </Routes>
      </BrowserRouter>



  </>
  )
}

export default App