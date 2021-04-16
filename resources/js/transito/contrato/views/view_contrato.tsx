import React, { useEffect, useState } from "react";
import { RadialBar, RadialBarChart } from "recharts";
import { Imprimible } from "../../salida/domain/imprimible";
import { generateUuid } from "../../shared/infrastructure/uuid";
import Spinner from "../../shared/views/spinner";
import ListTicket from "../../ticket/views/list_ticket";
import ListVale from "../../vale/views/list_vale";
import ListVehiculoContrato from "../../vehiculo/views/list_vehiculo_contrato";
import { ContratoFull } from "../application/ContratoFull";
import ContratoService from "../application/ContratoService";
import { Vale } from "../domain/Vale";
import ListarDetallesContrato from "./list_detalle_contrato";
import ModalPreview from "./modal_preview";

const ViewContrato: React.FC<{
  show: boolean;
  hidden: any;
  id: string;
  service: ContratoService;
}> = ({ show, hidden, id, service }) => {
  let _data: any = [];
  const [loading, setLoading] = useState(false);

  const [totalVale, setTotalVale] = useState(1);
  const [paginaVale, setPaginaVale] = useState(1);
  const [vales, setVales] = useState<Vale[]>([]);

  const [_data_, setData] = useState<
    { name: string; uv: number; pv: number; fill: string }[]
  >([]);
  const [definido, setDefinido] = useState(0);
  const [indefinidos, setIndefinidos] = useState<Vale[]>([]);
  const [total, setTotal] = useState(0);

  const [showPreview, setPreview] = useState(false);
  const [imprimible, setImprimible] = useState<Imprimible>(new Imprimible());

  const [full, setFull] = useState<ContratoFull>(new ContratoFull());

  useEffect(() => {
    //DEPENDENCIAS
    if (id != "" && show) {
      setLoading(true);
      service.getDependencias(id).then(data => {
        setFull(data.data);
        calcularValores(data.data);
        changePaginateVales(data.data.vales);
        setLoading(false);
      });
    }
  }, [id, show]);

  function changePaginateVales(_vales: Vale[], pagina?: number) {
    let paginate: Vale[] = [];
    let index = 0;

    setPaginaVale(Math.ceil(_vales.length / 3));
    setTotalVale(_vales.length);

    while (index < 3) {
      let vale =
        _vales[((pagina != undefined ? pagina : paginaVale) - 1) * 3 + index];
      if (vale != undefined) paginate.push(vale);
      index++;
    }

    setVales([]);
    setVales(paginate);
  }

  function hiddenPreview() {
    setPreview(false);
  }

  function viewPreview(_imprimible: Imprimible) {
    setImprimible(_imprimible);
    setPreview(true);
  }

  function calcularValores(full: ContratoFull) {
    setTotal(0);
    let _total = 0;
    let _definido = 0;
    let _indefinido = 0;
    full.detalles.forEach(x => {
      full.vales.forEach(y => {
        if (x.termino.tipo == "DEFINIDO") {
          _total += parseInt(x.termino.volumen);
          full.vales.forEach(y => {
            if (y.material == x.material.nombre && y.estado == "FINALIZADO") {
              _definido += y.capacidad;
            }
          });
          setTotal(_total);
          setDefinido(_definido);
        } else if (
          y.material == x.material.nombre &&
          y.estado == "FINALIZADO"
        ) {
          _indefinido += y.capacidad;
          setIndefinidos([...indefinidos, y]);
        }
      });
    });
    //data
    _data.push({
      name: "Total",
      uv: 100,
      pv: 100,
      fill: true ? "#F9FAFB" : "black"
    });
    _data.push({
      name: "Definido",
      uv: _total <= 0 || _definido > _total ? 0 : (_definido / _total) * 100,
      pv: 100,
      fill: "#8884d8"
    });
    setData(_data);
  }

  return (
    <div className={show ? "block" : "hidden"}>
      <Spinner show={loading} />
      <ModalPreview
        show={showPreview}
        hidden={hiddenPreview}
        imprimible={imprimible}
      />
      <div className="z-40 sticky h-6 top-4 w-full mb-4 flex justify-end">
        <button
          className="z-40 absolute top-0 p-2 px-4 text-gray-500  leading-5 rounded-lg text-green-50"
          style={{ backgroundColor: "#E15252" }}
          onClick={() => {
            setIndefinidos([]);
            hidden();
          }}
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
        </button>
      </div>
      <div className="z-0 mb-10 mt-4">
        <div className="z-0">
          <div className="z-0 grid grid-cols-6 gap-x-4 gap-y-8">
            <div className="col-span-4 bg-gray-50 top-4 rounded-lg relative pt-2">
              <div
                className="px-2 absolute -top-3.5 py-1 left-2 rounded-lg text-gray-100"
                style={{ backgroundColor: "#45BF55" }}
              >
                Cliente
              </div>
              <div className="grid grid-cols-3 gap-x-4 gap-y-8">
                <div
                  className="col-span-1 row-span-1 p-4"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <span className="text-gray-700 flex py-2 py-2">
                    <svg
                      className="h-6 w-6 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <b>{full.cliente.nombre}</b>
                  </span>
                  <span className="text-gray-700 flex py-2">
                    <svg
                      className="h-6 w-6 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                      />
                    </svg>
                    {full.cliente.identificacion}
                  </span>
                  <span className="text-gray-700 flex py-2">
                    <svg
                      className="h-6 w-6 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    {full.cliente.telefono}
                  </span>
                </div>

                <div
                  className="col-span-1 row-span-1 p-4"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <span className="text-gray-700 flex py-2">
                    <svg
                      className="h-6 w-6 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    {full.cliente.departamento}
                  </span>
                  <span className="text-gray-700 flex py-2">
                    <svg
                      className="h-6 w-6 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    {full.cliente.municipio}
                  </span>
                  <span className="text-gray-700 flex py-2">
                    <svg
                      className="h-6 w-6 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {full.cliente.direccion}
                  </span>
                </div>

                <div
                  className="col-span-1 row-span-1 p-4"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                  }}
                >
                  <span className="text-gray-700 flex py-2">
                    <svg
                      className="h-6 w-6 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {full.contrato.fecha}
                  </span>
                </div>
              </div>
            </div>

            <div className="z-0 col-span-2 p-4 row-span-2 bg-gray-50 top-4 rounded-lg  relative">
              <div
                className="px-2 absolute -top-3.5 py-1 left-2 rounded-lg text-gray-100"
                style={{ backgroundColor: "#45BF55" }}
              >
                Progreso
              </div>
              <div className="h-full flex flex-col content-center">
                <div
                  className="rounded-lg flex"
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <RadialBarChart
                    width={200}
                    height={200}
                    cx={100}
                    cy={100}
                    innerRadius={30}
                    outerRadius={140}
                    barSize={30}
                    data={_data_}
                    style={{ fontSize: "0" }}
                  >
                    <RadialBar
                      label={{ position: "insideStart", fill: "#fff" }}
                      background
                      dataKey="uv"
                    />
                  </RadialBarChart>
                  <p
                    className="absolute top-9/10 left-9/10"
                    style={{ fontSize: "16pt" }}
                  >
                    <b>
                      {Math.ceil(
                        total <= 0 || definido > total
                          ? 0
                          : (definido / total) * 100
                      )}
                      %
                    </b>
                  </p>
                </div>
                <div className="mt-4 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="pl-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          MATERIAL
                        </th>
                        <th
                          scope="col"
                          className="pl-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          OPERACION
                        </th>
                        <th
                          scope="col"
                          className="pl-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          CARGA
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {indefinidos.map((indefinido: Vale) => {
                        return (
                          <tr
                            className="hover:bg-gray-100 cursor-pointer"
                            key={generateUuid()}
                          >
                            <td className="pl-1 py-4 whitespace-nowrap">
                              <span className="pl-2 text-gray-500  text-xs leading-5 font-semibold rounded-full text-gray-500 ">
                                {indefinido.material}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="pl-1 text-gray-500  text-xs leading-5 font-semibold rounded-full text-gray-500 ">
                                {indefinido.transaccion}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="pl-1 text-gray-500  text-xs leading-5 font-semibold rounded-full text-gray-500 ">
                                {indefinido.carga}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="z-0 col-span-4 p-4 pt-8 bg-gray-50 top-4 rounded-lg  relative">
              <div
                className="px-2 absolute -top-3.5 py-1 left-2 rounded-lg text-gray-100"
                style={{ backgroundColor: "#45BF55" }}
              >
                Vehiculos
              </div>
              <ListVehiculoContrato vehiculos={full.vehiculos} />
            </div>

            <div className="z-0 col-span-6 top-4 p-4 pt-8 bg-gray-50 rounded-lg 0 relative">
              <div
                className="px-2 absolute -top-3.5 py-1 left-2 rounded-lg text-gray-100"
                style={{ backgroundColor: "#45BF55" }}
              >
                Detalles
              </div>
              <ListarDetallesContrato detalles={full.detalles} />
            </div>

            <div className="z-0 col-span-3 p-4 pt-8 row-span-2 bg-gray-50 top-4 rounded-lg  relative">
              <div
                className="px-2 absolute -top-3.5 py-1 left-2 rounded-lg text-gray-100"
                style={{ backgroundColor: "#45BF55" }}
              >
                Tickets
              </div>
              <ListTicket full={full} preview={viewPreview} />
            </div>

            <div className="z-0 col-span-3 p-4 pt-8 row-span-2 bg-gray-50 top-4 rounded-lg  relative">
              <div
                className="px-2 absolute -top-3.5 py-1 left-2 rounded-lg text-gray-100"
                style={{ backgroundColor: "#45BF55" }}
              >
                Vales
              </div>
              <ListVale full={full} preview={viewPreview} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewContrato;
