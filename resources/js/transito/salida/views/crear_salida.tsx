import { Formik } from "formik";
import React, {useState, useEffect} from "react";
import Modal from "../../shared/views/modal";
import Preview from "../../shared/views/preview";
import Spinner from "../../shared/views/spinner";
import { TicketDTO } from "../../ticket/application/TicketDTO";
import { Vale } from "../../vale/domain/vale";
import { VehiculoDTO } from "../../vehiculo/application/VehiculoDTO";
import { Vehiculo } from "../../vehiculo/domain/vehiculo";
import SalidaService from "../application/SalidaService";
import { Imprimible } from "../domain/imprimible";
import ListarSalidas from "./list_salida";
import ModalSalida from "./modal_salida";

const CrearSalida: React.FC = () => {

  const service = new SalidaService();

  const [pista, setPista] = useState('');
  const [loading, setLoading] = useState(false);

  const [imprimible, setImprimible] = useState<Imprimible>(new Imprimible());
  const [imprimir, setImprimir] = useState(false);
  const [vehiculo, setVehiculo] = useState<Vehiculo>(new Vehiculo());

  const [showModalReponse, setShowModalResponse] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [warning, setWarning] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  
useEffect(() => {
  setImprimible(new Imprimible());
  if(pista != ""){
    setLoading(true);
    service.getByPlaca(pista).then( 
      data => {
        setVehiculo(data.data.vehiculo);
        setImprimible(new Imprimible().setSalida(data.data));
        setLoading(false);
      }
    );
  }  
}, [pista]);

  
  function showModalResponse(title:string, message:string, warning:boolean): void {
    setTitle(title);
    setMessage(message);
    setWarning(warning);
    setShowModalResponse(true);
  }

  function close(_imprimible:Imprimible): void {
    setLoading(true);
    if(_imprimible.tipo == 'TICKET'){
      service.closeTicket(new TicketDTO().setImprimible(_imprimible)).then(
        value => {
          if(value.data == null) {
            showModalResponse('Proceso fallido', 'Ha ocurrido un error al cerrar el ticket', true);
          }
          else{
            //CAPTURAR VALE
            _imprimible.setValeSalida(value.data);
            //IMPRIMIR
            setImprimible(_imprimible);
            setImprimir(true);
          }
          setLoading(false);
        }
      );
    }
    else{
      service.closeVale(new Vale().setImprimible(_imprimible)).then(
        value => {
          if(value.data == null) {
            showModalResponse('Proceso fallido', 'Ha ocurrido un error al cerrar el vale',true);
          }
          else{
            //IMPRIMIR
            setImprimible(_imprimible);
            setImprimir(true);
          }  
          setLoading(false);          
        }
      );
    }
  }

  function hiddenModal(): void {
    setShowModal(false);
    setShowModalResponse(false);
  }

  function buscar(id:string) {
    if(id != ""){
      setPista(id);
    }
    else{
      setImprimible(new Imprimible());
    }
  }

  function forClose(){
    setShowModal(true);
  }
  
  return (
      <div>
      <Spinner show={loading}/>
      <Preview show={imprimir} imprimible={imprimible} imprimir={imprimir}/>
      <Modal show={showModalReponse} hidden={hiddenModal} title={title} message={message} warning={warning}/>
      <ModalSalida show={showModal} hidden={hiddenModal} imprimible={imprimible} close={close}/>
      <div  className="flex mb-4 grid-cols-2">
        <Formik
          initialValues={{id:''}}
          validate={value => {
            const errors:any = {};

            if(!value.id){
              errors.id = "Este campo es obligatorio";
              buscar('');
            }

            return errors;
          }}
          onSubmit={(values, {setSubmitting}:any) => {
            buscar(values.id); setSubmitting(false);
          }}>
          {
            ({errors, handleChange, handleSubmit, isSubmitting}) => (
            <form onSubmit={handleSubmit} className='col-span-1 w-1/2'>
              <div className='top-8 mb-12 mr-2 pb-6 p-4 col-span-3 bg-gray-50 rounded-lg  relative'  style={{zIndex:0}}>
                <div className='absolute -top-3.5 py-1 px-3 left-2 rounded-lg text-gray-100' style={{backgroundColor: '#45BF55'}}>Placa
                </div>
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8"  style={{zIndex:0}}>
                  <div className="p-2 align-middle min-w-full sm:px-6 lg:px-8">
                    <div className="flex">
                      <div className="w-3/4">
                        <div className="mx-4 mt-6 mb-4">
                          <div className="">
                            <input 
                              onChange={handleChange} 
                              style={{borderColor: errors.id ? 'red' : 'gainsboro'}} 
                              name='id'  
                              type="text" 
                              placeholder="UWG-435" 
                              className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                          </div>
                        </div>
                      </div>
                      <div className="w-1/4">
                        <div className="mt-6 mb-4 mr-4">
                          <div className="">
                            <button
                              disabled={isSubmitting}
                              type="submit"
                              className='mt-1 p-2 px-4 w-full inline-flex leading-5 rounded-lg text-green-50 justify-center'
                              style={{backgroundColor: '#45BF55'}}>
                                <svg 
                                  className="w-6 h-6 text-white-500"
                                  xmlns="http://www.w3.org/2000/svg" 
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  stroke="currentColor">
                                  <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mx-4 mb-1 mt-4 flex">
                      <div className="w-1/2" style={{flexDirection: 'column'}}>
                        <p className="text-gray-700 text-center">Tipo</p>
                        <p className="text-xl text-gray-700 mt-2 pl-2 text-center">{vehiculo.tipo || '?'}</p>  
                      </div>
                      <div className="w-1/2" style={{flexDirection: 'column'}}>
                        <p className="text-gray-700 text-center">Capacidad</p>
                        <p className="text-xl text-gray-700 mt-2 pl-2 text-center">{vehiculo.capacidad || '?'}</p>                        
                      </div>
                    </div>
                  </div> 
                </div>            
              </div>
            </form>
          )}
        </Formik>

        <div className='col-span-2 top-8 mb-12 ml-2 p-4 bg-gray-50 rounded-lg relative w-1/2' style={{zIndex:0}}>
          <div className='absolute -top-3.5 py-1 px-3 left-2 rounded-lg text-gray-100' style={{backgroundColor: '#45BF55'}}>Cámara
          </div>
          <div className='absolute -top-3.5 py-1 px-3 right-2 rounded-lg text-gray-100' style={{backgroundColor: '#45BF55'}}>
            <svg 
              className="w-6 h-6 text-white-500"
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" viewBox="0 0 24 24" 
              stroke="currentColor">
              <path strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="p-2 align-middle min-w-full sm:px-6 lg:px-8">
              
            </div> 
          </div>            
        </div>
      </div>
      <div className='mb-8 p-4 pt-8 col-span-3 bg-gray-50 rounded-lg relative' style={{zIndex:0}}>
        <div className='absolute -top-3.5 py-1 px-3 left-2 rounded-lg text-gray-100' style={{backgroundColor: '#45BF55'}}>Pendientes
        </div>
        <ListarSalidas showThis={true} imprimible={imprimible} forClose={forClose}/>
      </div>
    </div>
  );
}

export default CrearSalida;