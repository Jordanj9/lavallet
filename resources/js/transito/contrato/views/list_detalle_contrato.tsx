import React, { useState, useEffect } from "react";

import { Detalle } from "../domain/detalle";
import { generateUuid } from "../../shared/infrastructure/uuid";

const ListarDetallesContrato: React.FC<{
  detalles: Detalle[];
}> = ({ detalles }) => {
  useEffect(() => {}, [detalles]);

  return (
    <div className="">
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
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
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                VOLUMEN
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                TRANSACCION
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {detalles.map((detalle: Detalle) => {
              return (
                <tr
                  className="hover:bg-gray-100 cursor-pointer"
                  key={generateUuid()}
                >
                  <td
                    className={
                      "px-6 py-4 whitespace-nowrap text-sm text-gray-500 "
                    }
                  >
                    {detalle.material.nombre}
                  </td>
                  <td
                    className={
                      "px-6 py-4 whitespace-nowrap text-sm text-gray-500 "
                    }
                  >
                    {detalle.termino.tipo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {detalle.termino.tipo == "INDEFINIDO"
                      ? "ꝏ"
                      : detalle.termino.volumen}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {detalle.transaccion}
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

export default ListarDetallesContrato;
