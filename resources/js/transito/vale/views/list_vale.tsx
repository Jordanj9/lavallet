import React, {useState, useEffect} from "react";
import { ContratoFull } from "../../contrato/application/ContratoFull";
import { Vale } from "../../contrato/domain/Vale";
import { generateUuid } from "../../shared/infrastructure/uuid";

const tags = [1,2,3,4,5,6,7,8];

const ListVale: React.FC<{
  full: ContratoFull,
  preview: any
}> = ({full, preview}) => {

  const [totalVale, setTotalVale] = useState(1);
  const [paginasVale, setPaginasVale] = useState(1);
  const [paginaVale, setPaginaVale] = useState(1);
  const [vales, setVales] = useState<Vale[]>([]);

  useEffect(() => {
    //PAGINADO
    changePaginateVales(full.vales);
  }, [full]);

  function changePaginateVales(_vales:Vale[], pagina?:number) {
    let paginate: Vale[] = [];
    let index = 0;  

    setPaginaVale(Math.ceil(_vales.length/3));
    setTotalVale(_vales.length);
    //setPaginaVehiculo(1);
    while(index < 3){
      let vale = _vales[(((pagina != undefined ? pagina : paginaVale) - 1)*3)+index];
      if(vale != undefined)
        paginate.push(vale);  
      index++;
    }

    setVales([]);
    setVales(paginate);
  }

  function changeVale(pagina:number){
    setPaginaVale(pagina);
    changePaginateVales(vales, pagina);
  }

  return (
    <div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col"                     
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SERIE
                    </th>
                    <th scope="col"                     
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      MATERIAL
                    </th>
                    <th scope="col"                    
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ESTADO
                    </th>
                    <th scope="col"                     
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      VER
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {
                  full.vales.map((vale : Vale) => {
                    return (
                      <tr className='hover:bg-gray-100 cursor-pointer' key={vale.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {vale.serie}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {vale.material}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {vale.estado}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium ">
                          <div className='flex items-center'>
                            <button className='' title='view'
                              onClick={() => { preview(new Vale(vale).getImprimible(full.cliente))}}>                              
                              <svg 
                                className='w-6 h-6 text-gray-500'
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor">
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth={2} 
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth={2} 
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
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
                      Página
                      <span className="font-medium"> {paginaVale} </span>
                      de
                      <span className="font-medium"> {paginasVale} </span>
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <a onClick={() => ( changeVale(paginaVale > 1 ? paginaVale - 1 : 1))}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <span style={{display: paginasVale >= 9 ? 'block' : 'none' }} className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                        ...
                      </span>
                      {                        
                        tags.map((index: number) => {
                          return (
                            <span 
                              key={generateUuid()}
                              onClick={() => (changeVale(index))}
                              style={{display: paginasVale < 9 && index <= paginasVale ? 'block' : 'none' }} 
                              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                              {index}
                            </span>
                          )
                        })
                      }
                      <a onClick={() => (changeVale(paginaVale < paginasVale ? paginaVale + 1 : paginaVale))}
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

export default ListVale;
