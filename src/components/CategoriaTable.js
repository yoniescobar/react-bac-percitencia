//crud: create, read, update, delete
import React,{useEffect,useState} from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'

const baseUrl = 'https://energetic-night-production.up.railway.app/api/v1/categorias'


const CategoriaTable = () => {

  const[categorias, setCategorias] = useState([]);
  const[serch, setSerch] = useState('');
  const[filteredCategorias, setFilteredCategorias] = useState([]);

const getCategorias = async () => {
    try {
      const res = await axios.get(baseUrl);
      setCategorias(res.data.categoriaResponse.categorias);
      setFilteredCategorias(res.data.categoriaResponse.categorias);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    
  const result  = categorias.filter((categoria) => {
    return categoria.nombre.toLowerCase().match(serch.toLowerCase());
  });
  setFilteredCategorias(result);
  },[serch]);



  

  useEffect(() => {
    getCategorias();
  },[])

  const columns = [
    { name: 'Id',
      selector: row=>row.id,
      sortable: true,     
    },
    { name: 'Nombre',
      selector: row=>row.nombre,
      sortable: true,
      
    },
    { name: 'Descripción',
      selector: row=>row.descripcion,
      sortable: true,
    },
    { name: 'Acciones',
      cell: row =>(
        <div className='d-flex'>
          <Link to={`/edit/${row.id}`} className='btn btn-warning'>Editar</Link>
          <button className='btn btn-danger mx-2' onClick={()=>deleteCategoria(row.id)}>Eliminar</button>
        </div>
      )
    }
  ]


  const deleteCategoria = async (id) => {
    try {
      await axios.delete(`${baseUrl}/${id}`);
      getCategorias();
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
        <p className='mx-4'>
          <Link to="/create" className=' btn btn-primary'>Crear Categoria</Link>
          <Link to="/grafico" className='mx-3 btn btn-success'>Grafico</Link>
        
        </p>

      <DataTable
         title="Lista de Categorias"
          columns={columns}
          data={filteredCategorias}
          pagination
          paginationRowsPerPageOptions={[5,10,15,20,25,30]}
          fixedHeader
          fixedHeaderScrollHeight="450px"
          selectableRows
          selectableRowsHighlight
          highlightOnHover
          actions={
            <button className ='btn btn-success'>Exportar</button>
          }

          subHeader
          subHeaderComponent={
            <input 
              type="text"
              placeholder="Buscar"
              className='w-25 form-control'
              value={serch}
              onChange={e=>setSerch(e.target.value)}

          />
      
          }
          subHeaderAlign="right" // left, right, center

      ></DataTable>


    </>
  )
}

export default CategoriaTable