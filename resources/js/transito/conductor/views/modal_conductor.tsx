import React,{useState} from "react";
import {Conductor} from "../domain/conductor";
import ConductorService from "../application/ConductorService";
import {Formik}  from 'formik';
import Toast from "../../shared/views/toast";
import { stringify } from "uuid";

enum STATUS  {
  OK = 200,
  CREATED = 201
}
const ModalConductor : React.FC<{
  show: boolean;
  hidden: any;
  conductor: Conductor
  setConductor: any
  service: ConductorService
}> = ({show, hidden, conductor, setConductor, service }) => {

  const [showModalRequest, setShowModalRequest] = useState(false);
  const [warning, setWarning] = useState(false);
  const [message, setMessage] = useState('');
  
  async function save(_conductor:Conductor) {
    if(_conductor.id != ""){ 
      await service.update(_conductor).then( value => {
          if (value.data != null)
              hidden();
          else{
              showToast(value.mensaje, true);
          }
      });
    }
    else{
      await service.save(_conductor).then( value => {
          if (value.data != null)
              hidden();
          else{
            showToast(value.mensaje, true);
            let _conductor = new Conductor(conductor);
            _conductor.id = ''; conductor.id = '';
            setConductor(_conductor);
          }
      });
    }
  }

  function showToast(mensaje:string, warning:boolean){
    setMessage(mensaje);
    setWarning(warning);
    setShowModalRequest(true);
  }

  return(
    <Formik
      initialValues={conductor}
      validate={value => {
        const errors:any = {};

        setConductor(value);

        if(!value.identificacion)
          errors.identificacion = "Este campo es obligatorio";
        if(!value.nombre)
          errors.nombre = "Este campo es obligatorio";
        if(!value.telefono)
          errors.telefono = "Este campo es obligatorio";

        return errors;
      }}
      onSubmit={(values, {setSubmitting}:any) => {
        setSubmitting(true);
        save(values).then(setSubmitting(false));
      }}>
      {
        ({errors, handleChange, handleSubmit, values, setValues, handleReset}) => (
        <form onSubmit={handleSubmit}>
          <Toast show={showModalRequest} setShow={setShowModalRequest} message={message} warning={warning}/>
          <div className={'pb-4 ' + (show ? 'block' : 'hidden')}>
            <div className='fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-40'
              onClick={(e:any) => { hidden(); handleReset(e) }}
              onMouseEnter={(e:any) => {handleReset(e); conductor.id != "" ? setValues(conductor) : true;}}
              style={{zIndex: 1000}}>
            </div>
            <div className='fixed | top-1/2 left-1/2 | w-1/3 | bg-white | shadow | rounded-lg' 
              style={{transform:'translate(-50%,-50%)', zIndex:1000}}>
              <div className='p-6 flex flex-wrap'>
                <label className="block pr-2 w-1/2">
                  <span className="text-gray-700">Identificacion</span>
                  <input type="text" onChange={handleChange} name='identificacion' value={values.identificacion}
                    style={{borderColor: errors.identificacion ? 'red' : 'gainsboro'}}
                    disabled={conductor.id != "" ? true : false}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Numero Unico" />
                </label>
                <label className="block pl-2 w-1/2">
                  <span className="text-gray-700">Telefono</span>
                  <input type="number" onChange={handleChange} name='telefono' value={values.telefono}
                    style={{borderColor: errors.telefono ? 'red' : 'gainsboro'}}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="+55 555-555-5555" />
                </label>
                <label className="block mt-4 w-full">
                  <span className="text-gray-700">Nombre</span>
                  <input type="text" onChange={handleChange} name='nombre' value={values.nombre}
                    style={{borderColor: errors.nombre ? 'red' : 'gainsboro'}}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Nombre del Conductor" />
                </label>
                <div className='w-full mt-6 flex justify-end'>
                  <button 
                    className='p-2 px-4 mx-4 inline-flex leading-5 rounded-lg text-green-50' 
                    style={{ backgroundColor: '#45BF55' }} 
                    type="submit">{conductor.id != "" ? 'Actualizar' : 'Guardar'}</button>
                  <button 
                    className='p-2 px-4 inline-flex leading-5 rounded-lg text-green-50' 
                    style={{ backgroundColor: '#E15252' }} 
                    onClick={(e:any) => { hidden(); handleReset(e) }}>Cancelar</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
    
  );
}
export default ModalConductor;
