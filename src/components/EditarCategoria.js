import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'

const baseUrl = 'https://energetic-night-production.up.railway.app/api/v1/categorias'

const EditarCategoria = () => {

  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const {id} = useParams();
  const redirect = useNavigate();


  useEffect(() => {
    const getCategoria = async () => {
      const res = await axios.get(`${baseUrl}/${id}`);
      setNombre(res.data.categoriaResponse.categorias[0].nombre);
      setDescripcion(res.data.categoriaResponse.categorias[0].descripcion);
    }
    getCategoria();
  },[id])




  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoria = { nombre, descripcion };
    await axios.put(`${baseUrl}/${id}`, categoria);
    redirect('/');
  }
    



  return (
    <div className='row mt-3'>
      <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
        <div className='card'>
          <div className='card-header bg-dark text-white '> Modifcar Categoria</div>
          <div className='card-body'>
            <form onSubmit={handleSubmit}>
              <label htmlFor='nombre'>Nombre</label>
              <input
                type='text'
                className='form-control'
                id='nombre'
                name='nombre'
                maxLength={50}
                value={nombre}
                required
                onChange={(e) => setNombre(e.target.value)}
              />
              <label htmlFor='descripcion'>Descripción</label>
              <input
                type='text'
                className='form-control'
                id='descripcion'
                name='descripcion'
                maxLength={50}
                value={descripcion}
                required
                onChange={(e) => setDescripcion(e.target.value)}
              />
              <div className='d-grid gap-2 mt-3'>
                <button className='btn btn-primary' type='submit'>Guardar Cambios</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditarCategoria