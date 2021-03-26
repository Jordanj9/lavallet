import React, {useState} from "react";
import MaterialService from "../application/MaterialService";
import Toast from '../../shared/views/toast';


const ModalMaterialELiminar: React.FC<{
  show: boolean,
  hidden: any,
  id: string,
  service: MaterialService
}> = (props) => {

  const {show, hidden, id, service} = props;

  const [showModal, setShow] = useState(false);
  const [warning, setWarning] = useState(false);
  const [message, setMessage] = useState('');

  async function eliminar() {
    const status = await service.delete(id);
    if (status.data != null) {
      hidden();
    }
    else{
      showToast(status.mensaje, true);
    }
  }

  function showToast(message:string, warning:boolean): void {
    setMessage(message);
    setWarning(warning);
    setShow(true);
  }


  return (
    <div className={show ? 'block' : 'hidden'}>
      <Toast show={showModal} setShow={setShow} message={message} warning={warning}/>
      <div className='fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-40' 
        onClick={hidden}
        style={{zIndex: 1000}}>
      </div>
      <div className='absolute | top-1/2 left-1/2 | w-4/12 | bg-white | shadow | rounded-lg'
           style={{transform: 'translate(-50%,-50%)', zIndex: 1000}}>
        <div className='my-6'>
          <svg className='w-24 h-24 mx-auto text-red-600' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
               fill="currentColor">
            <path fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"/>
          </svg>
        </div>
        <div className='w-4/6 mx-auto'>
          <p className='text-center text-gray-800 '>
            Estas Seguro que quieres eliminar
            permanentemente el Material Seleccionado ?
          </p>
        </div>
        <div className='w-full my-6 flex justify-center'>
          <button className='px-8 py-2 | mr-2 | inline-flex text-sm leading-5 font-semibold rounded-lg text-green-50'
                  style={{backgroundColor: '#45BF55'}} onClick={()=>eliminar()}>Aceptar
          </button>
          <button className='px-8 py-2 inline-flex text-sm leading-5 font-semibold rounded-lg text-green-50'
                  style={{backgroundColor: '#E15252'}} onClick={() => {
            hidden()
          }}>Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalMaterialELiminar;
