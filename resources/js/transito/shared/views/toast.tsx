import React from "react";

const Toast: React.FC<{
  show: boolean,
  setShow: any,
  message: string,
  warning: boolean
}> = ({show, setShow, message, warning}) => {

  return(
    <div
      className='fixed | bottom-4 | right-4 | shadow | rounded-lg'
      style={{ 
        zIndex:100, 
        display: show ? 'flex' : 'none', 
        backgroundColor: warning ? '#E15252' : '#45BF55',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 'fit-content',
        minWidth: '300px',
        height: 'fit-content',
        minHeight: '20px'
      }}>
      <div className='py-3 pl-3'>
        <p style={{color: 'white', textAlign: 'left'}}>{message}</p>
      </div>
      <button className='p-2'
        style={{color: 'white', outline: 'none'}}
        type="button"
        onClick={() => { setShow(false) }}>
        <svg
          className='w-6 h-6'
          style={{color: 'white'}}
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor">
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  );
}
export default Toast;
