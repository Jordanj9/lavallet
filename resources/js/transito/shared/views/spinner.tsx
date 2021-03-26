import React from "react";
import loading from '../../../../assets/Double_Ring-1s-200px.svg';

const Spinner: React.FC<{
  show: boolean
}> = ({show}) => {

  return(
    <div className={show ? 'block' : 'hidden'} style={{zIndex:2000}}>
      <div className='fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-40' style={{zIndex:2000}}>
      </div>
      <div className='fixed | top-1/2 left-1/2 | w-100 | bg-white | shadow | rounded-lg'
            style={{transform: 'translate(-50%,-50%)', zIndex:2000}}>
        <img src={loading} alt="Load" />
      </div>
    </div>
  );
}
export default Spinner;
