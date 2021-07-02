import React, { useState, useEffect } from "react";
import { Contrato } from "../../contrato/domain/contrato";
import { Detalle } from "../../contrato/domain/detalle";
import ListarDetalles from "../../contrato/views/list_detalle";
import { Ticket } from "../../ticket/domain/ticket";
import TicketService from "../../ticket/application/TicketService";
import { Formik } from "formik";
import Modal from "../../shared/views/modal";
import ValeService from "../../vale/application/ValeService";
import { Vale } from "../../vale/domain/vale";
import ModalEntrada from "./modal_entrada";
import { VehiculoDTO } from "../../vehiculo/application/VehiculoDTO";
import ListarContratosEntrada from "../../contrato/views/list_contrato_entrada";
import {Camara} from "../../entrada/views/camara_component";
import {takePhoto} from "../../entrada/views/camara_component";
import ContratoService from "../../contrato/application/ContratoService";
import Preview from "../../shared/views/preview";
import { Imprimible } from "../../salida/domain/imprimible";
import Spinner from "../../shared/views/spinner";

let pc: RTCPeerConnection;
let videoRef: any;


const CrearEntrada: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const ticketService = new TicketService();
  const valeService = new ValeService();
  const contratoService = new ContratoService();

  const [object, setObject] = useState<Ticket | Vale>({} as Ticket);
  const [isTicket, setIsTicket] = useState(false);
  const [showPreview, setPreview] = useState(false);

  const [pista, setPista] = useState("");
  const [imprimible, setImprimible] = useState<Imprimible>(new Imprimible());
  const [imprimir, setImprimir] = useState(false);

  const [contrato, setContrato] = useState<Contrato>(new Contrato());
  const [contratos, setContratos] = useState<Contrato[]>([]);
  const [detalle, setDetalle] = useState<Detalle>(new Detalle());
  const [vehiculo, setVehiculo] = useState<VehiculoDTO>(new VehiculoDTO());

  const [showModal, setShowModal] = useState(false);
  const [warning, setWarning] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setContratos([]);
    if (pista != "") {
      setLoading(true);
      contratoService.getByPlaca(pista).then(value => {
        console.log(value);
        if (value.data != null) {
          setContratos(value.data);
          if (value.data.length > 0) {
            if (setVehiculo)
              setVehiculo(
                new VehiculoDTO().setVehiculo(value.data[0].vehiculos[0])
              );
          } else setVehiculo(new VehiculoDTO());
        } else {
          showModalResponse("Atención", value.mensaje, true);
          setContratos([]);
          setContrato(new Contrato());
        }
        setLoading(false);
      }).catch(error => {
        setLoading(false);
      });
    }
  }, [pista]);

  function showModalResponse(
    title: string,
    message: string,
    warning: boolean
  ): void {
    setTitle(title);
    setMessage(message);
    setWarning(warning);
    setShowModal(true);
  }

  function hiddenModal(): void {
    setShowModal(false);
    setPreview(false);
  }

  function buscar(id: string) {
    if (id != "") {
      setPista(id);
    }
  }

  function showDetalleView(_contrato: Contrato) {
    if (_contrato.id == contrato.id) setContrato(new Contrato());
    else setContrato(_contrato);
    setDetalle(new Detalle());
  }

  function setDetalleId(_detalle: Detalle) {
    if (_detalle == detalle) setDetalle(new Detalle());
    else setDetalle(_detalle);
  }

  async function save(_object: any, _isTicket: boolean) {
    setLoading(true);
    if (_isTicket) {
      //GUARDAR TICKET
      await ticketService.save(_object).then(value => {
        if (value.data != null) {
          //IMPRIMIR
          let imp = new Imprimible().setTicket(_object);
          setImprimible(imp);
          setImprimir(true);
        } else showModalResponse("Proceso fallido", value.mensaje, true);
        setLoading(false);
      });
    } else {
      //GUARDAR VALE
      await valeService.save(_object).then(value => {
        if (value.data != null) {
          //IMPRIMIR
          let vale = new Imprimible().setVale(_object);
          setImprimible(vale);
          setImprimir(true);
        } else showModalResponse("Proceso fallido", value.mensaje, true);
        setLoading(false);
      });
    }
  }

  async function preview() {
    setLoading(true);
    if (validate()) {
      if (detalle.transaccion == "CARGA") {
        //GENERAR TICKET
        let ticket = new Ticket(
          "",
          contrato,
          detalle,
          contrato.vehiculos[0],
          "-",
          "-"
        );
        await ticketService.getSerie().then(data => {
          ticket.serie = data.data;
          //ticket.id = data.data.prefijo + '-' + data.data.actual;
          setObject(ticket);
          setIsTicket(true);
          setPreview(true);
          setLoading(false);
        });
      } else if (detalle.transaccion == "DESCARGA") {
        //GENERAR VALE
        let vale = new Vale().setValue(
          "",
          contrato,
          detalle,
          contrato.vehiculos[0],
          "-",
          "-"
        );
        await valeService.getSerie().then(data => {
          vale.serie = data.data;
          //vale.id = data.data.prefijo + '-' + data.data.actual;
          setObject(vale);
          setIsTicket(false);
          setPreview(true);
          setLoading(false);
        });
      }
    } else {
      showModalResponse(
        "Atención",
        "Seleccione un contrato y uno de sus detalles",
        true
      );
    }
  }

  function validate(): boolean {
    let error = true;
    error = contrato.id == "" ? false : error;
    error = detalle.contrato_id == "" ? false : error;
    return error;
  }

  return (
    <div>
      <Spinner show={loading} />
      <Preview show={imprimir} imprimible={imprimible} imprimir={imprimir} />
      <Modal
        show={showModal}
        hidden={hiddenModal}
        title={title}
        message={message}
        warning={warning}
      />
      <ModalEntrada
        show={showPreview}
        hidden={hiddenModal}
        object={object}
        isTicket={isTicket}
        save={save}
      />
      <div className="flex mb-4 grid-cols-2">
        <Formik
          initialValues={{ id: "" }}
          validate={value => {
            const errors: any = {};
            if (!value.id) {
              errors.id = "Este campo es obligatorio";
              setContratos([]);
              setContrato(new Contrato());
              setDetalle(new Detalle());
              setVehiculo(new VehiculoDTO());
              setPista("");
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }: any) => {
            buscar(values.id);
            setSubmitting(false);
          }}
        >
          {({ errors, handleChange, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit} className="col-span-1 w-1/2">
              <div
                className="top-8 mb-12 mr-2 pb-6 p-4 col-span-3 bg-gray-50 rounded-lg  relative"
                style={{ zIndex: 0 }}
              >
                <div
                  className="absolute -top-3.5 py-1 px-3 left-2 rounded-lg text-gray-100"
                  style={{ backgroundColor: "#45BF55" }}
                >
                  Placa
                </div>
                <div
                  className="overflow-x-auto sm:-mx-6 lg:-mx-8"
                  style={{ zIndex: 0 }}
                >
                  <div className="p-2 align-middle min-w-full sm:px-6 lg:px-8">
                    <div className="flex">
                      <div className="w-3/4">
                        <div className="mx-4 mt-6 mb-4">
                          <div className="">
                            <input
                              onChange={handleChange}
                              style={{
                                borderColor: errors.id ? "red" : "gainsboro"
                              }}
                              name="id"
                              type="text"
                              placeholder="UWG-435"
                              className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="w-1/4">
                        <div className="mt-6 mb-4 mr-4">
                          <div className="">
                            <button
                              disabled={isSubmitting}
                              type="submit"
                              className="mt-1 p-2 px-4 w-full inline-flex leading-5 rounded-lg text-green-50 justify-center"
                              style={{ backgroundColor: "#45BF55" }}
                            >
                              <svg
                                className="w-6 h-6 text-white-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mx-4 mb-1 mt-4 flex">
                      <div
                        className="w-1/2"
                        style={{ flexDirection: "column" }}
                      >
                        <p className="text-gray-700 text-center">Tipo</p>
                        <p className="text-xl text-gray-700 mt-2 pl-2 text-center">
                          {vehiculo.tipo || "?"}
                        </p>
                      </div>
                      <div
                        className="w-1/2"
                        style={{ flexDirection: "column" }}
                      >
                        <p className="text-gray-700 text-center">Capacidad</p>
                        <p className="text-xl text-gray-700 mt-2 pl-2 text-center">
                          {vehiculo.capacidad || "?"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>

        <div
          className="col-span-1 top-8 mb-12 ml-2 p-4 bg-gray-50 rounded-lg relative w-1/2"
          style={{ zIndex: 0 }}
        >
          <div
            className="absolute -top-3.5 py-1 px-3 left-2 rounded-lg text-gray-100"
            style={{ backgroundColor: "#45BF55" }}
          >
            Cámara
          </div>
          <div
            className="absolute -top-3.5 py-1 px-3 right-2 rounded-lg text-gray-100"
            style={{ backgroundColor: "#45BF55" }}
          >
            <svg
              className="w-6 h-6 text-white-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
              />
            </svg>
          </div>
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="p-2 align-middle min-w-full sm:px-6 lg:px-8">
              <div

              >
                <Camara></Camara>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="mb-8 p-4 pt-8 col-span-3 bg-gray-50 rounded-lg relative"
        style={{ zIndex: 0 }}
      >
        <div
          className="absolute -top-3.5 py-1 px-3 left-2 rounded-lg text-gray-100"
          style={{ backgroundColor: "#45BF55" }}
        >
          Cotratos
        </div>
        <div
          className="absolute -top-3.5 py-1 px-3 right-2 rounded-lg text-gray-100"
          style={{
            backgroundColor: "#45BF55",
            display: contrato.id != "" ? "block" : "none"
          }}
        >
          <svg
            className="w-6 h-6 text-white-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <ListarContratosEntrada
          show={true}
          setContrato={(cont : any) => {
            showDetalleView(cont);
          }}
          selected={contrato}
          contratos={contratos}
        />
      </div>
      <div
        className="mb-6 p-4 pt-8 col-span-3 bg-gray-50 rounded-lg relative"
        style={{ zIndex: 0 }}
      >
        <div
          className="absolute -top-3.5 py-1 px-3 left-2 rounded-lg text-gray-100"
          style={{ backgroundColor: "#45BF55" }}
        >
          Detalles
        </div>
        <div
          className="absolute -top-3.5 py-1 px-3 right-2 rounded-lg text-gray-100"
          style={{
            backgroundColor: "#45BF55",
            display: detalle.contrato_id != "" ? "block" : "none"
          }}
        >
          <svg
            className="w-6 h-6 text-white-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <ListarDetalles
          showThis={true}
          showMore={true}
          contrato={contrato}
          setDetalle={setDetalleId}
          selected={detalle}
        />
      </div>
      <div className="col-span-3 my-4 flex justify-end" style={{ zIndex: 0 }}>
        <button
          onClick={() => {
            preview();
            takePhoto();
          }}
          className="px-8 py-3 | mr-4 | inline-flex text-sm md: leading-5 font-semibold rounded-lg text-green-50"
          style={{ backgroundColor: "#45BF55" }}
        >
          Generar
        </button>
      </div>
    </div>
  );
};

export default CrearEntrada;
