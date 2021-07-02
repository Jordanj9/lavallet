import React, {useEffect, useState} from "react";
import MaterialService from "../application/MaterialService";
import { generateUuid } from "../../shared/infrastructure/uuid";
import Spinner from "../../shared/views/spinner";
import { MaterialReport } from "../application/MaterialReport";


const ListMaterialReport: React.FC = () => {
  
  const service = new MaterialService();
  const [loading, setLoading] = useState(false);
  const [desde, setDesde] = useState(new Date().toISOString().split('T')[0]);
  const [hasta, setHasta] = useState(new Date().toISOString().split('T')[0]);

  const [materiales, setMateriales] = useState<MaterialReport[]>([]);

  useEffect(() => {
    setLoading(true);      
    service.getReport(desde, hasta).then(
      value => {
        setMateriales(value.data);
        setLoading(false);
      }
    );
  }, [desde, hasta]);

  return (
    <div>
      <Spinner show={loading}/>
      <div className="w-full mt-8">
        <div className="w-full h-100 mb-4 rounded-lg bg-gray-50 relative">
          <div className='px-2 absolute -top-3.5 py-1 left-6 rounded-lg text-gray-100' style={{backgroundColor: '#45BF55'}}>Fechas
          </div>
          <div className="flex justify-evenly pb-4">                  
            <div className="w-1/4">
              <div className="mx-4 mt-6 mb-4">
                <div className=''>
                  <span className="text-gray-700">Desde</span>
                  <input type="date" onChange={(e:any) => { setDesde(e.target.value); }} defaultValue={desde} className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                </div>
              </div>
            </div>
            <div className="w-1/4">
              <div className="mx-4 mt-6 mb-4">
                <div className=''>
                  <span className="text-gray-700">Hasta</span>
                  <input type="date" onChange={(e:any) => { setHasta(e.target.value); }} defaultValue={hasta} className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                </div>
              </div>
            </div>
          </div>
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
                      NOMBRE
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CARGA
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      VIAJE CARGA
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      DESCARGA
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      VIAJE DESCARGA
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      TOTAL
                    </th>
                  </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                  {
                    materiales.map((material : MaterialReport) => {
                      return (
                        <tr className='hover:bg-gray-100 cursor-pointer' key={generateUuid()}>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {material.nombre}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {material.total_carga_volumen}
                          </td><td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {material.viajes_cargas}
                          </td><td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {material.total_descarga_volumen}
                          </td><td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {material.viajes_descargas}
                          </td><td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {material.total_volumen}
                          </td>
                        </tr>
                      );
                    })
                  }
                  </tbody>                
                </table>                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListMaterialReport;
