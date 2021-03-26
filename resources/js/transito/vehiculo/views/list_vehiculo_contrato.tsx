import React, {useState, useEffect} from "react";
import { VehiculoDTO } from "../application/VehiculoDTO";
import VehiculoService from "../application/VehiculoService";


const ListVehiculoContrato: React.FC<{
  vehiculos: VehiculoDTO[];
}> = ({vehiculos}) => {

  useEffect(() => {
  }, [vehiculos]);

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
                      TIPO
                    </th>
                    <th scope="col"                    
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      PLACA
                    </th>
                    <th scope="col"                     
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CAPACIDAD
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {
                  vehiculos.map((vehiculo : VehiculoDTO) => {
                    return (
                      <tr className='hover:bg-gray-100 cursor-pointer'  key={vehiculo.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {vehiculo.tipo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {vehiculo.placa}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {vehiculo.capacidad}
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
  );
}

export default ListVehiculoContrato;
