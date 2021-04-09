import React from "react";

import { Contrato } from "../domain/contrato";

const ListarContratosEntrada: React.FC<{
  show: boolean;
  selected: Contrato
  setContrato: any;
  contratos: Contrato[]
}> = ({show, setContrato, selected, contratos}) => {

return (
  <div className={show ? 'block' : 'hidden'}>
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg ">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              SERIE
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              CLIENTE
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              UBICACION
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              FECHA
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              style={{width: '100px'}}
            >
              
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {contratos.map((contrato: Contrato) => {
            return (
              <tr className="hover:bg-gray-100 cursor-pointer" key={contrato.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {contrato.serie.prefijo + '-' + contrato.serie.actual}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {contrato.cliente.identificacion || ''}
                    </div>
                    <div className="text-sm text-gray-500" style={{fontSize: '9pt'}}>
                      {contrato.cliente.nombre || ''}
                    </div>
                    <div className="text-sm text-gray-500" style={{fontSize: '9pt'}}>
                      {contrato.cliente.tipo || ''}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {contrato.ubicacion.departamento || ''}
                    </div>
                    <div className="text-sm text-gray-500" style={{fontSize: '9pt'}}>
                      {contrato.ubicacion.municipio || ''}
                    </div>
                    <div className="text-sm text-gray-500" style={{fontSize: '9pt'}}>
                      {contrato.ubicacion.direccion || ''}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {contrato.fecha}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium ">
                  <div className="flex items-center">                      
                    <button className="mr-2"
                      title="add" 
                      onClick={() => {
                        setContrato(contrato)}
                      }>
                      <svg 
                        style={{display: selected != contrato ? 'block' : 'none'}}
                        className="w-6 h-6 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor">
                          <path strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>                      
                      <svg 
                        style={{display: selected == contrato ? 'block' : 'none'}}
                        onClick={() => {setContrato(new Contrato())}}
                        className="w-6 h-6 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor">
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>                   
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>      
    </div>
  </div>
);

};

export default ListarContratosEntrada;
