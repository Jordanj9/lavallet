import React, {useEffect, useState} from "react"
import {Material} from "../domain/material";
import MaterialService from "../application/MaterialService";
import ModalMaterial from "../../material/views/modal_material";
import ModalMaterialELiminar from "../../material/views/modal_material_eliminar";
import { generateUuid } from "../../shared/infrastructure/uuid";
import Spinner from "../../shared/views/spinner";

const tags = [1,2,3,4,5,6,7,8];

const ListMaterial: React.FC = () => {
  
  const service = new MaterialService();
  const [loading, setLoading] = useState(false);

  const [total, setTotal] = useState(0);
  const [paginas, setPaginas] = useState(1);
  const [pagina, setPagina] = useState(1);
  
  const [show, setShow] = useState(false);
  const [showEliminar, setShowEliminar] = useState<boolean>(false);
  const [material, setMaterial] = useState<Material>(new Material());
  const [materiales, setMateriales] = useState<Material[]>([]);
  const [id, setId] = useState('');

  useEffect(() => {
    if(!show && !showEliminar)
      setLoading(true);
    service.getPaginate(4, pagina).then(
      value => {
        setMateriales(value.data);
        setTotal(value.length);
        setPaginas(Math.ceil(value.length/4));
        setLoading(false);
      }
    );
  }, [showEliminar, show, pagina]);

  function showModalEliminar(id: string): void {
    setId(id);
    setShowEliminar(true);
  }

  function showModal(_material:Material): void {
    setMaterial(_material);
    setShow(true);
  }

  function hiddenModal(): void {
    setMaterial(new Material());
    setShow(false);
  }

  function hiddenModalEliminar() {
    setShowEliminar(false);
  }

  return (
    <div>
      <Spinner show={loading}/>
      <ModalMaterial show={show} hidden={hiddenModal} oldMaterial={material} service={service}/>
      <ModalMaterialELiminar show={showEliminar} hidden={hiddenModalEliminar} id={id} service={service}/>
      <div className='flex justify-end'>
        <button onClick={() => { showModal(new Material()); }} 
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

export default ListMaterial;
