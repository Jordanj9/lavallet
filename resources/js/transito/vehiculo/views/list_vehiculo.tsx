import React, {useState, useEffect} from "react";
import ModalVehiculo from "./modal_vehiculo";

import VehiculoService from "../application/VehiculoService";
import ModalVehiculoEliminar from "./modal_vehiculo_eliminar";

import {Vehiculo} from "../domain/vehiculo";
import { generateUuid } from "../../shared/infrastructure/uuid";
import Spinner from "../../shared/views/spinner";

const tags = [1,2,3,4,5,6,7,8];

const ListVehiculo = () => {
  
  const service = new VehiculoService();
  const [loading, setLoading] = useState(false);

  const [paginas, setPaginas] = useState(1);
  const [pagina, setPagina] = useState(1);

  const [show, setShow] = useState(false);
  const [showEliminar, setShowEliminar] = useState<boolean>(false);

  const [vehiculo, setVehiculo] = useState<Vehiculo>(new Vehiculo());
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [id, setId] = useState('');

  useEffect(() => {
    if(!show && !showEliminar)
      setLoading(true);
    service.getPaginate(4, pagina).then( value => {
      setVehiculos(value.data);
      setPaginas(Math.ceil(value.length/4));
      setLoading(false);
    });
  }, [showEliminar, show,  pagina]);


  function showModalEliminar(id: string): void {
    setId(id);
    setShowEliminar(true);
  }

  function showModal(_vehiculo:Vehiculo): void {
    setVehiculo(_vehiculo);
    setShow(true);
  }

  function hiddenModal(): void {
    setShow(false);
    setShowEliminar(false);
  }

  return (
    <div>
      <Spinner show={loading}/>
      <ModalVehiculo show={show} hidden={hiddenModal} vehiculo={vehiculo} setVehiculo={setVehiculo} service={service}/>
      <ModalVehiculoEliminar show={showEliminar} hidden={hiddenModal} id={id} service={service}/>
      <div className='flex justify-end'>
        <button onClick={() => { showModal(new Vehiculo()); }} 
          className='px-4 p-2 inline-flex text-xs leading-5 font-semibold rounded-lg text-green-50'
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
    </div>
  );
}

export default ListVehiculo;
