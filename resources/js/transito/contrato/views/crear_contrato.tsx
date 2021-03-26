import React, {useState, useEffect} from "react";

import {Cliente} from "../../cliente/domain/cliente";
import {Material} from "../../material/domain/material";
import {Vehiculo} from "../../vehiculo/domain/vehiculo";
import {Detalle} from "../domain/detalle";
import {Contrato} from "../domain/contrato";
import {generateUuid} from '../../shared/infrastructure/uuid';

import ContratoService from "../application/ContratoService";
import ClienteService from "../../cliente/application/ClienteService";
import MaterialService from "../../material/application/MaterialService";
import VehiculoService from "../../vehiculo/application/VehiculoService";
import Modal from "../../shared/views/modal";
import { Serie } from "../../shared/domain/serie";
import { TerminoDTO } from "../application/TerminoDTO";
import { Formik } from "formik";
import { Departamento } from "../../shared/domain/departamento";
import { Municipio } from "../../shared/domain/municipio";
import UbicacionService from "../../shared/application/UbicacionService";
import Spinner from "../../shared/views/spinner";

const tags = [1,2,3,4,5,6,7,8];

const CrearContratos: React.FC = () => {
  let i = 0;
  
  const service  = new ContratoService();
  const clienteService = new ClienteService();
  const materialService = new MaterialService();
  const vehiculoService = new VehiculoService();
  const ubicacionService = new UbicacionService(); 
  const [loading, setLoading] = useState(false);

  const [totalDetalle, setTotalDetalle] = useState(1);
  const [paginasDetalle, setPaginasDetalle] = useState(1);
  const [paginaDetalle, setPaginaDetalle] = useState(1);

  const [totalVehiculo, setTotalVehiculo] = useState(1);
  const [paginasVehiculo, setPaginasVehiculo] = useState(1);
  const [paginaVehiculo, setPaginaVehiculo] = useState(1);
  
  const [refresh, setRefresh] = useState(true);
  const [show, setShow] = useState(false);
  const [warning, setWarning] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [departamento, setDepartamento] = useState<Departamento>(new Departamento());
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [municipio, setMunicipio] = useState<Municipio>(new Municipio());

  const [serie, setSerie] = useState<Serie>(new Serie());
  const [contrato, setContrato] = useState<Contrato>(new Contrato());
  const [detalle, setDetalle] = useState<Detalle>(new Detalle());
  const [vehiculo, setVehiculo] = useState<Vehiculo>(new Vehiculo());

  const [cliente, setCliente] = useState<Cliente>(new Cliente());
  const [clientes, setClientes] = useState<Cliente[]>([]);

  const [materiales, setMateriales] = useState<Material[]>([]);
  const [detalles, setDetalles] = useState<Detalle[]>([]);
  const [detallesPaginate, setDetallesPaginate] = useState<Detalle[]>([]);

  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [vehiculosSelect, setVehiculosSelect] = useState<Vehiculo[]>([]);
  const [vehiculosPaginate, setVehiculosPaginate] = useState<Vehiculo[]>([]);

  useEffect(() => { 
    if(refresh){
      setLoading(true); 
      clienteService.getClientes().then(clienteData => {
        let value = clienteData.data;
        if(value != null){
          setClientes(value);
          if(value.length > 0){
            setCliente(value[0]);
            //UBICACIONES
            ubicacionService.get().then(ubicacionData => {
              let dpto = ubicacionData.data.find(x => x.nombre == value[0].departamento) as Departamento;
              setMunicipios(dpto.municipios);
              setDepartamentos(ubicacionData.data);
              departamento.nombre = value[0].departamento;
              municipio.nombre = value[0].municipio; 
              setLoading(false);            
            });
  
            let _contrato = new Contrato();
            _contrato.cliente = value[0];
            _contrato.ubicacion.departamento = value[0].departamento;
            _contrato.ubicacion.municipio = value[0].municipio;
            _contrato.ubicacion.direccion = value[0].direccion;
            setContrato(_contrato)
          }
        }             
      });      
      materialService.getMateriales().then(materialData => {
        let value = materialData.data;
        if(value != null){
          setMateriales(value);
          setDetalle({
            id: '',
            material: value.length > 0 ? value[0] : new Material(),
            transaccion:'CARGA',
            termino: new TerminoDTO('0'),
            contrato_id: ''
          });
        }
      });
      vehiculoService.getVehiculos().then(vehiculoData => {
        let value = vehiculoData.data;
        if(value != null){
          setVehiculos(value);
          if(value.length > 0)
            setVehiculo(value[0])
        }
      });
      setRefresh(false);
    }

    if(cliente.id != null && departamentos.length > 0){
      let dpto = departamentos.find(x => x.nombre == cliente.departamento) as Departamento;
      setMunicipios(dpto.municipios);
      departamento.nombre = cliente.departamento;
      municipio.nombre = cliente.municipio;
    }

    service.getSerie().then(value => {
      setSerie(value.data);
    });

    detalle.transaccion = 'CARGA';
    detalle.termino.tipo = 'DEFINIDO';
    
    changePaginateDetalle();
    changePaginateVehiculo();

  }, [show, cliente, totalDetalle, totalVehiculo, paginaDetalle, paginaVehiculo] )

  function clean(){
    setVehiculosSelect([]);
    setDetalles([]);
    setDetallesPaginate([]);
    setVehiculosPaginate([]);
    setTotalDetalle(0);
    setTotalVehiculo(0);
    setPaginaDetalle(1);
    setPaginaVehiculo(1);
    setPaginasDetalle(1);
    setPaginasVehiculo(1);
  }

  function changePaginateDetalle() {
    let paginate: Detalle[] = [];
    let index = 0;
    while(index < 4){
      let detalle = detalles[((paginaDetalle - 1)*4)+index];
      if(detalle != undefined)
        paginate.push(detalle);  
      index++;
    }
    setDetallesPaginate([]);
    setDetallesPaginate(paginate);
  }

  function changePaginateVehiculo() {
    let paginate: Vehiculo[] = [];
    let index = 0;
    while(index < 4){
      let vehiculo = vehiculosSelect[((paginaVehiculo - 1)*4)+index];
      if(vehiculo != undefined)
        paginate.push(vehiculo);  
      index++;
    }
    setVehiculosPaginate([]);
    setVehiculosPaginate(paginate);
  }

  function changeCliente(ev: any) {
    let id = ev.target.value;
    let value = clientes.find( x => x.identificacion == id ) as Cliente ;
    setCliente(value);
  }

  function changeVehiculo(ev: any) {
    if(vehiculos.length > 0){
      let id = ev.target.value;
      let value = vehiculos.find( x => x.placa == id ) as Vehiculo ;
      setVehiculo(value);
    }
  }

  function changeMaterial(ev: any) {
    let id = ev.target.value;
    let value = materiales.find( x => x.id == id ) as Material ;
    setDetalle({...detalle, ['material']: value });
  }

  async function save() {
    contrato.detalles = detalles;
    contrato.vehiculos = vehiculosSelect;
    contrato.serie = serie;
    contrato.ubicacion.departamento = departamento.nombre;
    contrato.ubicacion.municipio = municipio.nombre;
    console.log(contrato);
    if(validate()){
      const status = await service.save(contrato);
      if(status.data != null) {
        showModalResponse('Proceso exitoso', status.mensaje, false);
        clean();
      }
      else{
        showModalResponse('Proceso fallido', status.mensaje, true);
      }
    }
    else{
      showModalResponse('Atención', 'Rellene los campos obligatorios del formulario', true);
    }
  }

  function showModalResponse(title:string, message:string, warning:boolean){
    setTitle(title);
    setMessage(message);
    setWarning(warning);
    showModal();
  }

  function addDetalle(_detalle:Detalle) {
    if(materiales.length > 0){
      setPaginasDetalle(Math.ceil((totalDetalle+1)/4));
      setTotalDetalle(totalDetalle + 1);
      let newData = [ ...detalles, _detalle ];
      detalles.push(_detalle);
      setDetalles(newData);
      changePaginateDetalle();
    }
  }

  function removeDetalle(det:Detalle) {
    setPaginasDetalle(Math.ceil((totalDetalle-1)/4));
    setTotalDetalle(totalDetalle - 1);
    detalles.splice(detalles.findIndex(x => (x.material.id+x.transaccion+x.termino.volumen) == (det.material.id+det.transaccion+det.termino.volumen)), 1);
    let index = detallesPaginate.findIndex(x => (x.material.id+x.transaccion+x.termino.volumen) == (det.material.id+det.transaccion+det.termino.volumen));
    if(index != -1){
      let newData = [
        ...detalles.slice(0, index),
        ...detalles.slice(index + 1)
      ];
      setDetallesPaginate(newData);
    }
  }

  function removeVehiculo(id:string) {    
    setPaginasVehiculo(Math.ceil((totalVehiculo-1)/4));
    setTotalVehiculo(totalVehiculo  - 1);
    let index = vehiculosSelect.findIndex(x => x.id == id);
    if(index != -1){
      let newData = [
        ...vehiculosSelect.slice(0, index),
        ...vehiculosSelect.slice(index + 1)
      ];
      setVehiculosSelect(newData);
    }
  }  

  function changeDepartamento(ev: any) {
    let value = ev.target.value;
    let _departamento = departamentos.find(x => x.nombre == value) as Departamento;
    setMunicipio(_departamento.municipios[0]);
    setDepartamento(_departamento);
    setMunicipios(_departamento.municipios);
  }

  function changeMunicipio(ev: any) {
    let value = ev.target.value;
    let _municipio = municipios.find(x => x.nombre == value) as Municipio;
    setMunicipio(_municipio);
  }

  function addVehiculo() {    
    if(vehiculosSelect.findIndex(x => x.id == vehiculo.id) == -1){
      if(vehiculos.length > 0){
        setPaginasVehiculo(Math.ceil((totalVehiculo+1)/4));
        setTotalVehiculo(totalVehiculo  + 1);
        let newData = [ ...vehiculosSelect, vehiculo ];
        setVehiculosSelect(newData);
        changePaginateVehiculo();
      }
    }
    else{
      setTitle('Atención');
      setMessage('Este vehiculo ya ha sido agregado');
      setWarning(true);
      showModal();
    }
  }

  function validate():boolean{
    let error = true;
    error = contrato.cliente.id == undefined ? false : error;
    error = contrato.ubicacion.direccion == "" ? false : error;
    error = contrato.detalles.length == 0 ? false : error;
    return error;
  }

  function showModal(): void {
    setShow(true);
  }

  function hiddenModal(): void {
    setShow(false);
  }
  
  function cargando(message:string, show:boolean){  
    setLoading(show);
    setMessage(message);
  }

  return (
    <div>
      <Spinner show={loading}/>
      <Modal show={show} hidden={hiddenModal} title={title} message={message} warning={warning}/>
      <div style={{zIndex:0}}>
        <div className='top-8 mb-12 p-4 col-span-3 bg-gray-50 rounded-lg  relative' style={{zIndex:0, backgroundColor: 'transparent'}}>
          <div className='px-2 absolute -top-3.5 py-1 left-2 rounded-lg text-black-100' style={{ fontSize: '20pt'}}>Serie {serie.actual}
          </div>
        </div>
        <div className='grid grid-cols-3 gap-x-4 gap-y-8' style={{zIndex:0}}>
          <div className='bg-gray-50 top-4 rounded-lg  relative' style={{zIndex:0}}>
            <div className='px-2 absolute -top-3.5 py-1 left-2 rounded-lg text-gray-100'style={{backgroundColor: '#45BF55'}}>Cliente
            </div>
            <div className="mx-4 mt-6">
              <div className="">
                <span className="text-gray-700">Cliente</span>
                <select onChange={changeCliente} name='cliente' className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={cliente.identificacion}>
                  {
                    clientes.map((cliente: Cliente) => {
                      return (
                        <option key={generateUuid()} value={cliente.identificacion}>{cliente.identificacion}</option>
                      );
                    })
                  }
                </select>
              </div>
            </div>
            <div className="mx-4 mb-4">
              <div className="">
                <span className="text-gray-700">Nombre</span>
                <input value={cliente.nombre} type="text" disabled placeholder="?" className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
              </div>
              <div className="">
                <span className="text-gray-700">Tipo</span>
                <input value={cliente.tipo} type="text" disabled placeholder="?" className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
              </div>
            </div>
          </div>
          <div className='col-span-2 row-span-2 bg-gray-50 top-4 rounded-lg  relative' style={{zIndex:0}}>
            <div className='px-2 absolute -top-3.5 py-1 left-2 rounded-lg text-gray-100' style={{backgroundColor: '#45BF55'}}>Materiales
            </div>
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="align-middle min-w-full sm:px-6 lg:px-8">
                <Formik
                  initialValues={detalle}
                  validate={value => {
                    const errors:any = {};

                    if(value.termino.tipo == 'DEFINIDO'){
                      if(!value.termino.volumen)
                        errors.termino = "Este campo es obligatorio";
                      else if(parseInt(value.termino.volumen)<=0)
                        errors.termino = "1 es el valor mínimo";
                    }

                    return errors;
                  }}
                  onSubmit={(values, {setSubmitting}:any) => {
                    setSubmitting(true);
                    let _detalle = new Detalle();
                    _detalle.material = detalle.material;
                    _detalle.termino = values.termino.tipo == 'INDEFINIDO' ? new TerminoDTO('99999') : new TerminoDTO(values.termino.volumen);
                    _detalle.transaccion = values.transaccion;
                    values.termino.volumen = '0';
                    addDetalle(_detalle);
                    setSubmitting(false);
                  }}>
                  {
                    ({errors, handleChange, handleSubmit, values, isSubmitting}) => (
                    <form onSubmit={handleSubmit}>
                      <div className="flex">                  
                        <div className="w-1/3">
                          <div className="mx-4 mt-6 mb-4">
                            <div className=''>
                              <span className="text-gray-700">Material</span>
                              <select onChange={changeMaterial} value={detalle.material.id} name='material' className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                {
                                  materiales.map((material: Material) => {
                                    return (
                                      <option key={generateUuid()} value={material.id}>{material.nombre}</option>
                                    );
                                  })
                                }
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className={values.termino.tipo == 'DEFINIDO' ? "w-1/4" : "w-1/3"}>
                          <div className="mx-4 mt-6 mb-4">
                            <div className="">
                              <span className="text-gray-700">Tipo</span>
                              <select onChange={handleChange} value={values.termino.tipo} name='termino.tipo' className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                <option value='DEFINIDO'>Definido</option>
                                <option value='INDEFINIDO'>Indefinido</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className={values.termino.tipo == 'DEFINIDO' ? "w-1/4" : "hidden"}>
                          <div className="mx-4 mt-6 mb-4">
                            <div className="">
                              <span className="text-gray-700">Cantidad</span>
                              <input 
                                onChange={handleChange}
                                value={values.termino.volumen}
                                name='termino.volumen' 
                                type="number"
                                style={{borderColor: errors.termino ? 'red' : 'gainsboro'}}
                                className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                              <div className="flex-end w-full pt-1" style={{display: errors.termino ? 'flex' : 'none'}}>
                                <span style={{textAlign:'right', fontSize:'8pt', color:'red'}}>{errors.termino}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={values.termino.tipo == 'DEFINIDO' ? "w-1/4" : "w-1/3"}>
                          <div className="mx-4 mt-6 mb-4">
                            <div className="">
                              <span className="text-gray-700">Operación</span>
                              <select onChange={handleChange} value={values.transaccion} name='transaccion' className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                <option value='CARGA'>Carga</option>
                                <option value='DESCARGA'>Descarga</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='p-4 flex justify-end'>
                        <button
                          disabled={isSubmitting}
                          type="submit"
                          className='p-2 px-4 inline-flex text-xs leading-5 font-semibold rounded-lg text-green-50'
                          style={{backgroundColor: '#45BF55'}}>
                            <svg 
                              className='w-6 h-6 text-white-500'
                              xmlns="http://www.w3.org/2000/svg" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor">
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                            </svg>
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
                <div className="m-4 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                      <th scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        MATERIAL
                      </th>
                      <th scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        TERMINO
                      </th>
                      <th scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        CANTIDAD
                      </th>
                      <th scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        OPERACION
                      </th>
                      <th scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          style={{width: '50px'}}>
                        
                      </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {detallesPaginate.map((detalle: Detalle) => {
                        return (
                          <tr className="hover:bg-gray-100 cursor-pointer" key={generateUuid()}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {detalle.material.nombre}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {detalle.termino.tipo}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {detalle.termino.volumen == '99999' ? 'ꝏ' : detalle.termino.volumen}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                              {detalle.transaccion}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium ">
                              <div className="flex items-center">
                                <button className='' onClick={() => {
                                  removeDetalle(detalle);
                                  }} title='delete'>
                                  <svg className='w-6 h-6 text-gray-500'
                                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                      stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"/>
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
                          <span className="font-medium"> {paginaDetalle} </span>
                          de
                          <span className="font-medium"> {paginasDetalle} </span>
                        </p>
                      </div>
                      <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                          <a onClick={() => ( setPaginaDetalle(paginaDetalle > 1 ? paginaDetalle - 1 : 1))}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <span className="sr-only">Previous</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </a>
                          <span style={{display: paginasDetalle >= 9 ? 'block' : 'none' }} className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                            ...
                          </span>
                          {                        
                            tags.map((index: number) => {
                              return (
                                <span 
                                  key={generateUuid()}
                                  onClick={() => (setPaginaDetalle(index))}
                                  style={{display: paginasDetalle < 9 && index <= paginasDetalle ? 'block' : 'none' }} 
                                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                  {index}
                                </span>
                              )
                            })
                          }
                          <a onClick={() => (setPaginaDetalle(paginaDetalle < paginasDetalle ? paginaDetalle + 1 : paginaDetalle))}
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
          <div className='top-4 bg-gray-50 rounded-lg 0 relative' style={{zIndex:0}}>
            <div className='px-2 absolute -top-3.5 py-1 left-2 rounded-lg text-gray-100' style={{backgroundColor: '#45BF55'}}>Ubicación
            </div>
            <Formik
              initialValues={{direccion: cliente.direccion}}
              validate={value => {
                const errors:any = {};

                let _contrato = new Contrato().setContrato(contrato);
                _contrato.ubicacion.direccion = value.direccion;
                setContrato(_contrato);

                if(!value.direccion)
                    errors.direccion = "Este campo es obligatorio";

                return errors;
              }}
              onSubmit={(values, {setSubmitting}:any) => {
                
              }}>
              {
                ({errors, handleChange, handleSubmit, values}) => (
                <form onSubmit={handleSubmit}>
                  <div className='mx-4 mt-6 mb-4'>
                    <div className="">
                      <span className="text-gray-700">Departamento</span>
                      <select onChange={changeDepartamento} name='departamento' value={departamento.nombre}
                          className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                          {
                            departamentos.map((departamento: Departamento) => {
                              return (
                                  <option key={generateUuid()} value={departamento.nombre}>{departamento.nombre}</option>
                              );
                            })
                          }
                      </select>
                    </div>
                    <div className="my-2">
                      <span className="text-gray-700">Municipio</span>
                      <select onChange={changeMunicipio} name='municipio' value={municipio.nombre}
                          className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                          {
                            municipios.map((municipio: Municipio) => {
                              return (
                                  <option key={generateUuid()} value={municipio.nombre}>{municipio.nombre}</option>
                              );
                            })
                          }
                      </select>
                    </div>
                    <div className="">
                      <span className="text-gray-700">Dirección</span>
                      <input onChange={handleChange} value={contrato.ubicacion.direccion} 
                        name='direccion' 
                        type="text" 
                        placeholder="Direccion del contrato" 
                        style={{borderColor: errors.direccion ? 'red' : 'gainsboro'}}
                        className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                      <div className="flex-end w-full pt-1" style={{display: errors.direccion ? 'flex' : 'none'}}>
                        <span style={{textAlign:'right', fontSize:'8pt', color:'red'}}>{errors.direccion}</span>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </Formik>            
          </div>
          <div className='top-4 col-span-3 bg-gray-50 rounded-lg  relative' style={{zIndex:0}}>
            <div className='px-2 absolute -top-3.5 py-1 left-2 rounded-lg text-gray-100' style={{backgroundColor: '#45BF55'}}>Vehículo
            </div>
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="p-2 align-middle min-w-full sm:px-6 lg:px-8">
                <div className="flex">
                  <div className="" style={{width: '25%'}}>
                    <div className="mx-4 mt-6 mb-4">
                      <div className=''>
                        <span className="text-gray-700">Vehiculo</span>
                        <select onChange={changeVehiculo} value={vehiculo.placa} name='vehiculo' className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                          {
                            vehiculos.map((vehiculo: Vehiculo) => {
                              return (
                                <option key={generateUuid()} value={vehiculo.placa}>{vehiculo.placa}</option>
                              );
                            })
                          }
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="" style={{width: '25%'}}>
                    <div className="mx-4 mt-6 mb-4">
                      <div className="">
                        <span className="text-gray-700">Capacidad</span>
                        <input value={vehiculo.capacidad} type="text" disabled placeholder="?" className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                      </div>
                    </div>
                  </div>
                  <div className="" style={{width: '25%'}}>
                    <div className="mx-4 mt-6 mb-4">
                      <div className="">
                        <span className="text-gray-700">Tipo</span>
                        <input value={vehiculo.tipo} type="text" disabled placeholder="?" className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                      </div>
                    </div>
                  </div>
                  <div className="" style={{width: '25%'}}>
                    <div className="mx-4 mt-6 mb-4">
                      <div className="">
                        <span className="text-gray-700">Conductor</span>
                        <input value={vehiculo.conductor.nombre} type="text" disabled placeholder="?" className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='p-4 flex justify-end'>
                  <button onClick={() => { addVehiculo(); }}
                    className='p-2 px-4 inline-flex text-xs leading-5 font-semibold rounded-lg text-green-50'
                    style={{backgroundColor: '#45BF55'}}>
                      <svg 
                        className='w-6 h-6 text-white-500'
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor">
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                      </svg>
                  </button>
                </div>
                <div className="m-4 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                      <th scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        PLACA
                      </th>
                      <th scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        TIPO
                      </th>
                      <th scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        CAPACIDAD
                      </th>
                      <th scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        CONDUCTOR
                      </th>
                      <th scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          style={{width: '50px'}}>
                          
                      </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {vehiculosPaginate.map((vehiculo: Vehiculo) => {
                        return (
                          <tr className="hover:bg-gray-100 cursor-pointer" key={generateUuid()}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {vehiculo.placa}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {vehiculo.tipo}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {vehiculo.capacidad}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                              {vehiculo.conductor.nombre}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium ">
                              <div className="flex items-center">
                                <button className='' onClick={() => {
                                  removeVehiculo(vehiculo.id);
                                  }} title='delete'>
                                  <svg className='w-6 h-6 text-gray-500'
                                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                      stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"/>
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
                        <span className="font-medium"> {paginaVehiculo} </span>
                        de
                        <span className="font-medium"> {paginasVehiculo} </span>
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <a onClick={() => ( setPaginaVehiculo(paginaVehiculo > 1 ? paginaVehiculo - 1 : 1))}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                          <span className="sr-only">Previous</span>
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </a>
                        <span style={{display: paginasVehiculo >= 9 ? 'block' : 'none' }} className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                          ...
                        </span>
                        {                        
                          tags.map((index: number) => {
                            return (
                              <span 
                                key={generateUuid()}
                                onClick={() => (setPaginaVehiculo(index))}
                                style={{display: paginasVehiculo < 9 && index <= paginasVehiculo ? 'block' : 'none' }} 
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                {index}
                              </span>
                            )
                          })
                        }
                        <a onClick={() => (setPaginaVehiculo(paginaVehiculo < paginasVehiculo ? paginaVehiculo + 1 : paginaVehiculo))}
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
        <div className='col-span-3 flex justify-end'>
            <button onClick={() => {
              save();
            }}
              className='px-8 py-3 | mr-4 | inline-flex text-sm md: leading-5 font-semibold rounded-lg text-green-50'
              style={{backgroundColor: '#45BF55'}}>Guardar
            </button>
            <button className='px-8 py-3 inline-flex text-sm leading-5 font-semibold rounded-lg text-green-50'
              style={{backgroundColor: '#E15252'}}>Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrearContratos;
