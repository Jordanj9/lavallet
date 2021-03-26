import React from "react";

const Modal: React.FC<{
  show: boolean,
  hidden: any,
  title: string,
  message: string,
  warning: boolean
}> = ({show, hidden, title, message, warning}) => {

  return(
    <div className={show ? 'block' : 'hidden'} style={{zIndex:100}}>
      <div className='fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-40' onClick={hidden} style={{zIndex:100}}>
      </div>
      <div className='fixed | top-1/2 left-1/2 | w-4/12 | bg-white | shadow | rounded-lg'
            style={{transform: 'translate(-50%,-50%)', zIndex:100}}>
        <div className='my-6'>
          <p className='text-center text-gray-800 font-semibold'>{title}</p>
        </div>
        <div className='w-4/6 mx-auto'>
          <p className='text-center text-gray-800 '>{message}</p>
        </div>
        <div className='w-full my-6 flex justify-center'>
          <button className='p-2 px-4 inline-flex leading-5 font-semibold rounded-lg text-green-50'
            type="button"
            style={{backgroundColor: warning ? '#E15252' : '#45BF55'}} onClick={() => {
            hidden()
          }}>Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
export default Modal;
