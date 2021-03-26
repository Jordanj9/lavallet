import React, {useState, useEffect} from "react";

import {Cliente} from "../domain/cliente";
import ClienteService from "../application/ClienteService";

import ModalCliente from "./modal_cliente";
import ModalClienteEliminar from "./modal_cliente_eliminar";
import { generateUuid } from "../../shared/infrastructure/uuid";
import Spinner from "../../shared/views/spinner";

const tags = [1,2,3,4,5,6,7,8];

const ListClientes: React.FC = () => {

  const service = new ClienteService();
  const [loading, setLoading] = useState(false);

  const [paginas, setPaginas] = useState(1);
  const [pagina, setPagina] = useState(1);
  const [show, setShow] = useState(false);
  const [showEliminar, setShowEliminar] = useState<boolean>(false);

  const [cliente, setCliente] = useState<Cliente>(new Cliente());
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [id, setId] = useState('');

  useEffect(() => {
    setLoading(true);
    service.getPaginate(4, pagina).then( value => {
      setClientes(value.data);
      setPaginas(Math.ceil(value.length/4));
      setLoading(false);
    });
  }, [showEliminar, show, pagina]);

  function showModalEliminar(id: string): void {
    setId(id);
    setShowEliminar(true);
  }

  function showModal(): void {
    let _cliente = new Cliente();
    setCliente(_cliente);
    setShow(true);
  }
  
  function showModalModificar(_cliente:Cliente): void {
    setCliente(_cliente);
    setShow(true);
  }

  function hiddenModal(): void {
    setCliente(new Cliente());
    setShow(false);
    setShowEliminar(false);
  }

  return (
    <div>
      <Spinner show={loading}/>
      <ModalCliente show={show} hidden={hiddenModal} cliente={cliente} setCliente={setCliente} service={service}/>
      <ModalClienteEliminar show={showEliminar} hidden={hiddenModal} id={id} service={service}/>
      <div className='flex justify-end'>
        <button onClick={() => { showModal(); }} 
          className='p-2 px-4 inline-flex text-xs leading-5 font-bold rounded-lg text-green-50'
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

export default ListClientes;
