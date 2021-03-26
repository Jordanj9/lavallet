import React, {useEffect, useState} from "react";
import {Conductor} from "../domain/conductor";
import ConductorService from "../application/ConductorService";
import ModalConductor from "../../conductor/views/modal_conductor";
import ModalConductorELiminar from "../../conductor/views/modal_conductor_eliminar";
import { generateUuid } from "../../shared/infrastructure/uuid";
import Spinner from "../../shared/views/spinner";

const tags = [1,2,3,4,5,6,7,8];

const ListConductor: React.FC = () => {

  const service = new ConductorService();
  const [loading, setLoading] = useState(false);

  const [paginas, setPaginas] = useState(1);
  const [pagina, setPagina] = useState(1);

  const [show, setShow] = useState(false);
  const [showEliminar, setShowEliminar] = useState<boolean>(false);

  const [conductor, setConductor] = useState<Conductor>(new Conductor());
  const [conductores, setConductores] = useState<Conductor[]>([]);
  const [id,setId] = useState('');

  useEffect(() => {
    if(!show && !showEliminar)
      setLoading(true);
    service.getPaginate(4, pagina).then( value => {
      setConductores(value.data);
      setPaginas(Math.ceil(value.length/4));
      setLoading(false);
    });
  },[show, showEliminar, pagina]);

  function showModalEliminar(id:string) : void {
    setId(id);
    setShowEliminar(true);
  }

  function showModal(_conductor:Conductor) : void{
    setConductor(_conductor);
    setShow(true);
  }

  function hiddenModal() : void{
    setConductor(new Conductor());
    setShow(false);
    setShowEliminar(false);
  }

  return(
    <div>
      <Spinner show={loading}/>
      <ModalConductor show={show} hidden={hiddenModal} conductor={conductor} setConductor={setConductor} service={service}/>
      <ModalConductorELiminar show={showEliminar} hidden={hiddenModal} id={id} service={service}/>
      <div className='flex justify-end'>
        <button  onClick={() => {showModal(new Conductor());}} 
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
          <span className="ml-2">Agregar</span>
        </button>
      </div>
    </div>
  );
}
export default ListConductor;
