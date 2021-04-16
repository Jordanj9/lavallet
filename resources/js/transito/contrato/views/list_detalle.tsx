import React, { useState, useEffect } from "react";

import { Detalle } from "../domain/detalle";
import ContratoService from "../application/ContratoService";
import { Contrato } from "../domain/contrato";
import { generateUuid } from "../../shared/infrastructure/uuid";

const tags = [1, 2, 3, 4, 5, 6, 7, 8];

const ListarDetalles: React.FC<{
  showThis: boolean;
  showMore: boolean;
  contrato: Contrato;
  selected?: Detalle;
  setDetalle?: any;
}> = ({ showThis, showMore, contrato, setDetalle, selected }) => {
  const service = new ContratoService();

  const [totalDetalle, setTotalDetalle] = useState(1);
  const [paginasDetalle, setPaginasDetalle] = useState(1);
  const [paginaDetalle, setPaginaDetalle] = useState(1);
  const [detallesPaginate, setDetallesPaginate] = useState<Detalle[]>([]);

  const [detalles, setDetalles] = useState<Detalle[]>([]);

  useEffect(() => {
    changePaginateDetalle();
  }, [detalles]);

  useEffect(() => {
    setDetalles([]);
    setDetallesPaginate([]);

    if (contrato.id != "") {
      service.getDetalles(contrato.id).then(data => {
        if (data != null) {
          setDetalles(data.data);
          setPaginasDetalle(Math.ceil(data.data.length / 4));
          setTotalDetalle(data.data.length);
        } else {
          setDetalles([]);
          setDetalle(new Detalle());
          setPaginasDetalle(Math.ceil(0));
          setTotalDetalle(0);
        }
      });
    }
  }, [contrato, totalDetalle, paginaDetalle]);

  function changePaginateDetalle() {
    let paginate: Detalle[] = [];
    let index = 0;
    while (index < 4) {
      let detalle = detalles[(paginaDetalle - 1) * 4 + index];
      if (detalle != undefined) paginate.push(detalle);
      index++;
    }
    setDetallesPaginate([]);
    setDetallesPaginate(paginate);
  }

  return (
    <div className={showThis ? "block" : "hidden"}>
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
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                style={{ width: "100px" }}
              ></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {detallesPaginate.map((detalle: Detalle) => {
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      className={"pr-2 " + showMore ? "block" : "hidden"}
                      title="add"
                      onClick={() => {
                        setDetalle(detalle);
                      }}
                    >
                      <svg
                        style={{
                          display: selected != detalle ? "block" : "none"
                        }}
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
                          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <svg
                        style={{
                          display: selected == detalle ? "block" : "none"
                        }}
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
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
                <span className="font-medium"> {paginaDetalle} </span>
                de
                <span className="font-medium"> {paginasDetalle} </span>
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <a
                  onClick={() =>
                    setPaginaDetalle(paginaDetalle > 1 ? paginaDetalle - 1 : 1)
                  }
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <span
                  style={{ display: paginasDetalle >= 9 ? "block" : "none" }}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                >
                  ...
                </span>
                {tags.map((index: number) => {
                  return (
                    <span
                      key={generateUuid()}
                      onClick={() => setPaginaDetalle(index)}
                      style={{
                        display:
                          paginasDetalle < 9 && index <= paginasDetalle
                            ? "block"
                            : "none"
                      }}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      {index}
                    </span>
                  );
                })}
                <a
                  onClick={() =>
                    setPaginaDetalle(
                      paginaDetalle < paginasDetalle
                        ? paginaDetalle + 1
                        : paginaDetalle
                    )
                  }
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListarDetalles;
