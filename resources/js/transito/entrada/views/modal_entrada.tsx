import React from "react";
import { Imprimible } from "../../salida/domain/imprimible";
import Preview from "../../shared/views/preview";

const ModalEntrada: React.FC<{
  show: boolean;
  hidden: any;
  object: Imprimible;
  isTicket:boolean
  save:any
}> = ({show, hidden, object, isTicket, save}) => {

  return (    
    <div  style={{zIndex:100}}>
    <div className={show ? 'block' : 'hidden'}  style={{zIndex:100}}>
      <div className='fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-40' onClick={hidden}  style={{zIndex:100}}>
      </div>
      <div className='fixed | top-1/2 left-1/2 | w-1/4 | bg-white | shadow | rounded-lg'
        style={{transform: 'translate(-50%,-50%)', zIndex:100, height: '540px',  width: '360px'}}>
        <div className='p-6 flex flex-wrap'>
          <Preview show={true} imprimible={object} imprimir={false}/>
        </div>
        <div className='w-full h-16 p-2 pb-4 mt-6 flex justify-between absolute bottom-0 left-0'>
          <button
            className='px-4 p-2 mx-2 inline-flex leading-5 rounded-lg text-green-50'
            style={{backgroundColor: '#45BF55'}}
            onClick={() => { save(object, isTicket); hidden(); }}>
              <svg 
                className='w-6 h-6'
                xmlns="http://www.w3.org/2000/svg" fill="none" 
                viewBox="0 0 24 24" stroke="currentColor">
                <path 
                  strokeLinecap="round" strokeLinejoin="round" 
                  strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
          </button>
          <button
            className='px-4 p-2 mx-2 inline-flex leading-5 rounded-lg text-green-50'
            style={{backgroundColor: '#E15252'}}
            onClick={hidden}>
              <svg 
                className='w-6 h-6'
                xmlns="http://www.w3.org/2000/svg" fill="none" 
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" 
                  strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}
export default ModalEntrada;
