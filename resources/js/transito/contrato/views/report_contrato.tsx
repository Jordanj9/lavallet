import React, { useState, useEffect } from "react";
import {generateUuid} from '../../shared/infrastructure/uuid';
import { Contrato } from "../domain/contrato";
import ContratoService from "../application/ContratoService";
import ViewContratoReport from "./view_contrato_report"
import Spinner from "../../shared/views/spinner";

const tags = [1,2,3,4,5,6,7,8];

const ReportContratos = () => {
const service = new ContratoService();

const [loading, setLoading] = useState(false);

const [paginas, setPaginas] = useState(1);
const [pagina, setPagina] = useState(1);

const [contratos, setContratos] = useState<Contrato[]>([]);
const [contrato, setThisContrato] = useState<Contrato>(new Contrato());
const [show, setShow] = useState(false);

function hidden(){
  setShow(false);
}

function showView(_contrato:Contrato){
  setShow(true);
  setThisContrato(_contrato);
}

useEffect(() => {
  setLoading(true);
  setContratos([]);
  service.getPaginate(4, pagina).then( value => {
    setContratos(value.data);
    setPaginas(Math.ceil(value.length/4));
    setLoading(false);
  });
}, [pagina]);


return (
  <div>
    <Spinner show={loading}/>
    <ViewContratoReport show={show} hidden={hidden} id={contrato.id} service={service}/>   
    <div className="w-full mt-8 mb-6" style={{display: show ? 'none' : 'block'}}>      
      <div className="mt-6 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">    
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
                VER
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contratos.map((contrato: Contrato) => {
              return (
                <tr className="hover:bg-gray-100 cursor-pointer" key={generateUuid()}>
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
                        title="show"
                        onClick={() => {showView(contrato)}}>
                        <svg
                          className="w-6 h-6 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>                 
                    </div>
                  </td>
                </tr>
              );
            })}
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
                <span 
                  key={generateUuid()}
                  style={{display: paginas >= 9 ? 'block' : 'none' }} className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
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
);

};

export default ReportContratos;
