import React, {useState, useEffect} from "react";
import { Imprimible } from "../domain/imprimible";

const ListarSalidas: React.FC<{
  showThis: boolean;
  imprimible: Imprimible;
  forClose : any
}> = ({showThis, imprimible, forClose}) => {
  
  const [imprimibles, setImprimibles] = useState<Imprimible[]>([]);

  useEffect(() => {
    if(imprimible.id != ""){
      let imps:Imprimible[] = [];
      imps.push(imprimible);
      setImprimibles(imps);
    }
    else
      setImprimibles([]);
  }, [imprimible]);

return (
  <div className={showThis ? 'block' : 'hidden'}>
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
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
              CONDUCTOR
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              MATERIAL
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              TIPO
            </th>
            <th
              scope="col"
              className={"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider "}
            >
              TRANSACCION
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              style={{width: '50px'}}
            >
              
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {imprimibles.map((imprimible: Imprimible) => {
            return (
              <tr className="hover:bg-gray-100 cursor-pointer" key={imprimible.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {imprimible.serie.prefijo + '-' + imprimible.serie.actual}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {imprimible.vehiculo.conductor.nombre}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {imprimible.detalle.material.nombre}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {imprimible.detalle.transaccion}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {imprimible.detalle.termino.tipo}
                    </div>
                    <div className="text-sm text-gray-500" style={{fontSize: '9pt'}}>
                      {imprimible.detalle.termino.volumen}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium ">
                  <div className="flex items-center">                     
                    <button className="mr-2 " title="add" onClick={() => {forClose()}}>
                      <svg 
                        className="w-6 h-6 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor">
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M5 13l4 4L19 7" />
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

export default ListarSalidas;