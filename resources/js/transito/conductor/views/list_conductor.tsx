import React, {useEffect, useState} from "react";
import {Conductor} from "../domain/conductor";
import ConductorService from "../application/ConductorService";
import ModalConductor from "../../conductor/views/modal_conductor";
import ModalConductorELiminar from "../../conductor/views/modal_conductor_eliminar";
import { generateUuid } from "../../shared/infrastructure/uuid";
import Spinner from "../../shared/views/spinner";

const tags = [1,2,3,4,5,6,7,8];

const ListConductor: React.FC = () => {

  const service = new ConductorService();
  const [loading, setLoading] = useState(false);

  const [paginas, setPaginas] = useState(1);
  const [pagina, setPagina] = useState(1);

  const [show, setShow] = useState(false);
  const [showEliminar, setShowEliminar] = useState<boolean>(false);

  const [conductor, setConductor] = useState<Conductor>(new Conductor());
  const [conductores, setConductores] = useState<Conductor[]>([]);
  const [id,setId] = useState('');

  useEffect(() => {
    if(!show && !showEliminar)
      setLoading(true);
    service.getPaginate(4, pagina).then( value => {
      setConductores(value.data);
      setPaginas(Math.ceil(value.length/4));
      setLoading(false);
    });
  },[show, showEliminar, pagina]);


  function showModalEliminar(id:string) : void {
    setId(id);
    setShowEliminar(true);
  }

  function showModal(_conductor:Conductor) : void{
    setConductor(_conductor);
    setShow(true);
  }

  function hiddenModal() : void{
    setConductor(new Conductor());
    setShow(false);
    setShowEliminar(false);
  }

  return(
    <div>
      <Spinner show={loading}/>
      <ModalConductor show={show} hidden={hiddenModal} conductor={conductor} setConductor={setConductor} service={service}/>
      <ModalConductorELiminar show={showEliminar} hidden={hiddenModal} id={id} service={service}/>
      <div className='flex justify-end'>
        <button  onClick={() => {showModal(new Conductor());}} 
          className='px-4 p-2 inline-flex text-xs leading-5 font-semibold rounded-lg text-green-50'
          style={{backgroundColor: '#45BF55'}}>
          <svg
            className='w-6 h-6 text-white-500'
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
        </button>
      </div>
      <div className="flex flex-col">
        <div className="my-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                  <th scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IDENTIFICACION
                  </th>
                  <th scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    NOMBRES
                  </th>
                  <th scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    TELEFONO
                  </th>
                  <th scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ACCIONES
                  </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {
                  conductores.map((conductor : Conductor) => {
                    return (
                      <tr className='hover:bg-gray-100 cursor-pointer' key={conductor.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {conductor.identificacion}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {conductor.nombre}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {conductor.telefono}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium ">
                          <div className='flex items-center'>
                            <button className='pr-2'
                              onClick={() => { showModal(conductor); }}  
                              title='edit'>
                              <svg className='w-6 h-6 text-gray-500'
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                              </svg>
                            </button>
                            <button className='' 
                              onClick={() => { showModalEliminar(conductor.id); }} 
                              title='delete'>
                              <svg className='w-6 h-6 text-gray-500'
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"/>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                }
                </tbody>
              </table>
              <div className="bg-white w-full px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <a className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
                    Anterior
                  </a>
                  <a className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
                    Siguiente
                  </a>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      P??gina
                      <span className="font-medium"> {pagina} </span>
                      de
                      <span className="font-medium"> {paginas} </span>
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <a onClick={() => ( setPagina(pagina > 1 ? pagina - 1 : 1))}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <span style={{display: paginas >= 9 ? 'block' : 'none' }} className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                        ...
                      </span>
                      {                        
                        tags.map((index: number) => {
                          return (
                            <span
                              key={generateUuid()} 
                              onClick={() => (setPagina(index))}
                              style={{display: paginas < 9 && index <= paginas ? 'block' : 'none' }} 
                              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                              {index}
                            </span>
                          )
                        })
                      }
                      <a onClick={() => (setPagina(pagina < paginas ? pagina + 1 : pagina))}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ListConductor;
