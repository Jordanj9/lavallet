import React, {useState, useEffect} from "react";

import {Material} from "../../material/domain/material";
import {Vehiculo} from "../../vehiculo/domain/vehiculo";
import {Detalle} from "../domain/detalle";
import {Contrato} from "../domain/contrato";

import ContratoService from "../application/ContratoService";
import MaterialService from "../../material/application/MaterialService";
import VehiculoService from "../../vehiculo/application/VehiculoService";
import Toast from "../../shared/views/toast";
import { TerminoDTO } from "../application/TerminoDTO";
import { Formik } from "formik";
import { VehiculoDTO } from "../../vehiculo/application/VehiculoDTO";
import { generateUuid } from "../../shared/infrastructure/uuid";

const tags = [1,2,3,4,5,6,7,8];

const ModificarContratos: React.FC<{
  show: boolean,
  hidden: any,
  contrato: Contrato,
  service: ContratoService
}> = ({show, hidden, contrato, service}) => {
  
  const materialService = new MaterialService();
  const vehiculoService = new VehiculoService();

  const [totalDetalle, setTotalDetalle] = useState(1);
  const [paginasDetalle, setPaginasDetalle] = useState(1);
  const [paginaDetalle, setPaginaDetalle] = useState(1);

  const [totalVehiculo, setTotalVehiculo] = useState(1);
  const [paginasVehiculo, setPaginasVehiculo] = useState(1);
  const [paginaVehiculo, setPaginaVehiculo] = useState(1);
  
  const [showModalToast, setShowToast] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [warning, setWarning] = useState(false);
  const [message, setMessage] = useState('');

  const [detalle, setDetalle] = useState<Detalle>(new Detalle());
  const [vehiculo, setVehiculo] = useState<Vehiculo>(new Vehiculo());

  const [materiales, setMateriales] = useState<Material[]>([]);
  const [detalles, setDetalles] = useState<Detalle[]>([]);
  const [detallesPaginate, setDetallesPaginate] = useState<Detalle[]>([]);

  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [vehiculosSelect, setVehiculosSelect] = useState<Vehiculo[]>([]);
  const [vehiculosPaginate, setVehiculosPaginate] = useState<Vehiculo[]>([]);

  useEffect(() => {  
    setShowToast(false); 
    if(contrato.id != ""){
      service.getDependencias(contrato.id).then(value => {
        if(value.data != null){
          setDetalles(value.data.detalles);
          //VEHICULOS
          let _vehiculos = value.data.vehiculos.map((vehiculoDto : VehiculoDTO) : Vehiculo => (new Vehiculo().setVehiculoDTO(vehiculoDto)));
          setVehiculosSelect(_vehiculos);        
          changePaginateVehiculo(_vehiculos);
          changePaginateDetalle(value.data.detalles);
        }               
      });
    }
    if(refresh){
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

    detalle.transaccion = 'CARGA';
    detalle.termino.tipo = 'DEFINIDO';

  }, [contrato]);

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

  function changePaginateDetalle(_detalles:Detalle[], pagina?:number) {
    let paginate: Detalle[] = [];
    let index = 0;

    setPaginasDetalle(Math.ceil(_detalles.length/3));
    
    while(index < 3){
      let _detalle = _detalles[(((pagina != undefined ? pagina : paginaDetalle) - 1)*3)+index];
      if(_detalle != undefined)
        paginate.push(_detalle);  
      index++;
    }

    setDetallesPaginate([]);
    setDetallesPaginate(paginate);
  }

  function changePaginateVehiculo(_vehiculos:Vehiculo[], pagina?:number) {
    let paginate: Vehiculo[] = [];
    let index = 0;  

    setPaginasVehiculo(Math.ceil(_vehiculos.length/3));
    setTotalVehiculo(_vehiculos.length);
    
    while(index < 3){
      let vehiculo = _vehiculos[(((pagina != undefined ? pagina : paginaVehiculo) - 1)*3)+index];
      if(vehiculo != undefined)
        paginate.push(vehiculo);  
      index++;
    }

    setVehiculosPaginate([]);
    setVehiculosPaginate(paginate);
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

  async function update() {
    contrato.detalles = detalles;
    contrato.vehiculos = vehiculosSelect;
    
    if(validate()){
      const status = await service.update(contrato);
      if(status.data != null) {
        showToastResponse(status.mensaje, false);
        hidden();
        clean();
      }
      else{
        showToastResponse(status.mensaje, true);
      }
    }
    else{
      showToastResponse('Rellene los campos obligatorios del formulario', true);
    }
  }

  function showToastResponse(message:string, warning:boolean){
    setMessage(message);
    setWarning(warning);
    showToast();
  }

  function removeDetalle(det:Detalle) {
    setPaginasDetalle(Math.ceil((totalDetalle-1)/3));
    setTotalDetalle(totalDetalle - 1);
    let index = detalles.findIndex(x => (x?.material.id+x?.transaccion+x?.termino.volumen) == (det?.material.id+det?.transaccion+det?.termino.volumen));
    if(index != -1){
      let newData = [
        ...detalles.slice(0, index),
        ...detalles.slice(index + 1)
      ];
      setDetalles(newData);
      changePaginateDetalle(newData);
    }
  }

  function removeVehiculo(id:string) {    
    setPaginasVehiculo(Math.ceil((totalVehiculo-1)/3));
    setTotalVehiculo(totalVehiculo - 1);

    let index = vehiculosSelect.findIndex(x => x.id == id);
    if(index != -1){
      let newData = [
        ...vehiculosSelect.slice(0, index),
        ...vehiculosSelect.slice(index + 1)
      ];
      setVehiculosSelect(newData);
      changePaginateVehiculo(newData);
    }
  }

  function addVehiculo(_vehiculo:Vehiculo) {    
    if(vehiculosSelect.findIndex(x => x.id == _vehiculo.id) == -1){
      if(vehiculos.length > 0){
        setPaginasVehiculo(Math.ceil((totalVehiculo+1)/3));
        setTotalVehiculo(totalVehiculo + 1);
        let newData = [ ...vehiculosSelect, _vehiculo ];
        vehiculosSelect.push(_vehiculo);
        setVehiculosSelect(newData);
        changePaginateVehiculo(vehiculosSelect);
      }
    }
    else{
      showToastResponse('Este vehiculo ya ha sido agregado', true);
    }
  }

  function addDetalle(_detalle:Detalle) {
    if(materiales.length > 0){
      setPaginasDetalle(Math.ceil((totalDetalle+1)/3));
      setTotalDetalle(totalDetalle + 1);
      let newData = [ ...detalles, _detalle ];
      detalles.push(_detalle);
      setDetalles(newData);
      changePaginateDetalle(newData);
    }
  }

  function changeDetalle(pagina:number){
    setPaginaDetalle(pagina);
    changePaginateDetalle(detalles, pagina);
  }

  function changeVehiculoPagina(pagina:number){
    setPaginaVehiculo(pagina);
    changePaginateVehiculo(vehiculosSelect, pagina);
  }

  function validate():boolean{
    render();
    let error = true;
    error = contrato.cliente.id == undefined ? false : error;
    error = contrato.ubicacion.direccion == "" ? false : error;
    error = contrato.detalles.length == 0 ? false : error;
    contrato.detalles.forEach(x => { 
      if(parseInt(x.termino.volumen) <= 0) {
        error = false;
        return; 
      }
    });
    return error;
  }

  function showToast(){
    setShowToast(true);
  }


  function hiddenToast(): void {
    setShowToast(false);
  }

  function modificar(_e:any, _detalle:Detalle): void {

    _detalle.termino.tipo = _e;
    if(_e == 'INDEFINIDO')
      _detalle.termino.volumen = '99999';
    else
      _detalle.termino.volumen = '0';
    
    let _detalles = detalles.map( (detalleTansfer:Detalle) => detalleTansfer );
    setDetalles(_detalles);
    changePaginateDetalle(_detalles);
  }

  function charAdd(_e:any, _detalle:Detalle): void {
    _detalle.termino.volumen = _e;
  }

  function render() {
    let _detalles = detalles.map( (detalleTansfer:Detalle) => detalleTansfer );
    setDetalles(_detalles);
  }

  return (
    <div  style={{zIndex:100}}>
      <div className={show ? 'block' : 'hidden'}  style={{zIndex:100}}>
        <div className='fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-40' onClick={() => { hidden(), setRefresh(true) }}  style={{zIndex:100}}>
        </div>
        <div className='fixed p-4 | top-1/2 left-1/2 | bg-white | shadow | rounded-lg'
          style={{transform: 'translate(-50%,-50%)', zIndex:100, height: '94vh',  width: '94vw'}}>
          <Toast show={showModalToast} setShow={setShowToast} message={message} warning={warning}/>
          <div style={{zIndex:0}}>
            <div className='px-2 absolute -top-3.5 py-1 left-6 rounded-lg text-gray-100' style={{backgroundColor: '#45BF55'}}>Serie {contrato.serie.actual}
            </div>
            <div className='mt-4 grid grid-cols-2 mr-4' style={{zIndex:0}}>          
              <div className='col-span-1 bg-gray-50 top-4 rounded-lg  relative' style={{zIndex:0}}>
                <div className='px-2 absolute -top-3.5 py-1 left-2 rounded-lg text-gray-100' style={{backgroundColor: '#45BF55'}}>Materiales
                </div>
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="align-middle min-w-full sm:px-6 lg:px-8">
                    <Formik
                      initialValues={detalle}
                      validate={value => {
                        const errors:any = {};

                        if(value?.termino.tipo == 'DEFINIDO'){
                          if(!value?.termino.volumen)
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
                        _detalle.termino = values.termino.tipo == 'INDEFINIDO' ? new TerminoDTO('99999') : new TerminoDTO(values?.termino.volumen);
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
                                  <select onChange={changeMaterial} value={detalle?.material.id} name='material' className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
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
                            <div className={values?.termino.tipo == 'DEFINIDO' ? "w-1/4" : "w-1/3"}>
                              <div className="mx-4 mt-6 mb-4">
                                <div className="">
                                  <span className="text-gray-700">Tipo</span>
                                  <select onChange={handleChange} value={values?.termino.tipo} name='termino.tipo' className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                    <option value='DEFINIDO'>Definido</option>
                                    <option value='INDEFINIDO'>Indefinido</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className={values?.termino.tipo == 'DEFINIDO' ? "w-1/4" : "hidden"}>
                              <div className="mx-4 mt-6 mb-4">
                                <div className="">
                                  <span className="text-gray-700">Cantidad</span>
                                  <input 
                                    onChange={handleChange}
                                    value={values?.termino.volumen}
                                    name='termino.volumen' 
                                    type="number"
                                    style={{borderColor: errors?.termino ? 'red' : 'gainsboro'}}
                                    className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                                  <div className="flex-end w-full pt-1" style={{display: errors?.termino ? 'flex' : 'none'}}>
                                    <span style={{textAlign:'right', fontSize:'8pt', color:'red'}}>{errors?.termino}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className={values?.termino.tipo == 'DEFINIDO' ? "w-1/4" : "w-1/3"}>
                              <div className="mx-4 mt-6 mb-4">
                                <div className="">
                                  <span className="text-gray-700">Operación</span>
                                  <select onChange={handleChange} value={values?.transaccion} name='transaccion' className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                    <option value='CARGA'>Carga</option>
                                    <option value='DESCARGA'>Descarga</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='px-4 flex justify-end'>
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
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              style={{width: '80px'}}>
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
                                <td className="px-6 whitespace-nowrap">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    {detalle?.material.nombre}
                                  </span>
                                </td>
                                <td className="whitespace-nowrap">
                                  <select
                                    defaultValue={detalle?.termino.tipo}
                                    name='termino.tipo'
                                    onChange={(e:any) => {modificar(e.target.value, detalle)}}
                                    className='w-3/4 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'>
                                    <option value='DEFINIDO'>Definido</option>
                                    <option value='INDEFINIDO'>Indefinido</option>
                                  </select>
                                </td>
                                <td className="whitespace-nowrap">
                                  <input
                                    disabled = {detalle?.termino.tipo == 'INDEFINIDO' ? true : false}
                                    defaultValue={detalle?.termino.tipo == 'INDEFINIDO' ? 'ꝏ' : detalle?.termino.volumen}
                                    name="volumen"
                                    style={{borderColor: (parseInt(detalle?.termino.volumen) < 1) ? 'red' : 'gainsboro'}}
                                    onChange={(e:any) => {charAdd(e.target.value, detalle)}}
                                    onKeyUp={(e:any) => {if(e.keyCode == '13') render()}}
                                    className='w-3/4 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                                    type={detalle?.termino.tipo == 'INDEFINIDO' ? "text" : "number"}
                                  /> 
                                </td>
                                <td className="whitespace-nowrap text-gray-500">
                                  {detalle?.transaccion}
                                </td>
                                <td className="px-6 p-4 whitespace-nowrap text-right text-sm font-medium ">
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
                              <a onClick={() => ( changeDetalle(paginaDetalle > 1 ? paginaDetalle - 1 : 1))}
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
                                      onClick={() => (changeDetalle(index))}
                                      style={{display: paginasDetalle < 9 && index <= paginasDetalle ? 'block' : 'none' }} 
                                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                      {index}
                                    </span>
                                  )
                                })
                              }
                              <a onClick={() => (changeDetalle(paginaDetalle < paginasDetalle ? paginaDetalle + 1 : paginaDetalle))}
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
              <div className='ml-4 col-span-1 bg-gray-50 top-4 rounded-lg  relative' style={{zIndex:0}}>
                <div className='px-2 absolute -top-3.5 py-1 left-2 rounded-lg text-gray-100' style={{backgroundColor: '#45BF55'}}>Vehiculos
                </div>
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
                <div className='px-4 flex justify-end'>
                <button
                  onClick={() => {addVehiculo(vehiculo)}}
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
                        <a onClick={() => ( changeVehiculoPagina(paginaVehiculo > 1 ? paginaVehiculo - 1 : 1))}
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
                                onClick={() => (changeVehiculoPagina(index))}
                                style={{display: paginasVehiculo < 9 && index <= paginasVehiculo ? 'block' : 'none' }} 
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                {index}
                              </span>
                            )
                          })
                        }
                        <a onClick={() => (changeVehiculoPagina(paginaVehiculo < paginasVehiculo ? paginaVehiculo + 1 : paginaVehiculo))}
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
            <div className='col-span-3 mt-8 flex justify-end absolute bottom-0  lef-0 w-full p-4 px-12'>
                <button onClick={() => { update(); }}
                  className='px-8 py-3 | mr-4 | inline-flex text-sm md: leading-5 font-semibold rounded-lg text-green-50'
                  style={{backgroundColor: '#45BF55'}}>Actualizar
                </button>
                <button onClick={() => { hidden(), setRefresh(true) }} 
                  className='px-8 py-3 inline-flex text-sm leading-5 font-semibold rounded-lg text-green-50'
                  style={{backgroundColor: '#E15252'}}>Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModificarContratos;
