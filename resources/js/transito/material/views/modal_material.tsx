import React, {useState, useEffect, useRef} from "react";
import {Material} from "../domain/material";
import MaterialService from "../application/MaterialService";
import {Formik, FormikProps}  from 'formik';
import Toast from "../../shared/views/toast";

const ModalMaterial: React.FC<{
  show: boolean;
  hidden: any;
  oldMaterial: Material;
  service:MaterialService
}> = ({show, hidden, oldMaterial, service}) => {

  const [showModal, setShowModal] = useState(false);
  const [warning, setWarning] = useState(false);
  const [message, setMessage] = useState('');

   const formikRef = useRef<FormikProps<Material>>(null);
  
    useEffect(() => {
       if(formikRef.current !== null)
          formikRef.current.setValues(oldMaterial);
    },[oldMaterial]);

  async function saveOrUpdate(value:Material) {
    if(oldMaterial.id != ""){
      const status = await service.update(value);
      if (status.data != null)
        hidden();
      else
        showModalResponse(status.mensaje, true);
    }
    else{
      const status = await service.save(value);
      if (status.data != null)
        hidden();
      else{
        value.id = oldMaterial.id = "";
        showModalResponse(status.mensaje, true);
      }
    }
  }

  function showModalResponse(message:string, warning:boolean): void {
    setMessage(message);
    setWarning(warning);
    setShowModal(true);
  }

  return (
    <Formik
      initialValues={{nombre:'', id:''}}
      validate={value => {
        const errors:any = {};

        oldMaterial = new Material(value);

        if(!oldMaterial.vacio){
          if(!value.nombre)
            errors.nombre = "Este campo es obligatorio";
        }

        return errors;
      }}
      onSubmit={(values, {setSubmitting}:any) => {
        setSubmitting(true);
        saveOrUpdate(oldMaterial).then(setSubmitting(false));
      }}>
      {
        ({errors, handleChange, handleSubmit, values, setValues, isSubmitting, handleReset}) => (
        <form onSubmit={handleSubmit}>
          <Toast show={showModal} setShow={setShowModal} message={message} warning={warning}/>
          <div className={show ? 'block' : 'hidden'} >
            <div className='z-100 fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-40' 
              onClick={(e:any) => { handleReset(e); hidden() }}
              style={{zIndex: 1000}}>
            </div>
            <div className='z-100 fixed | top-1/2 left-1/2 | w-1/4 | bg-white | shadow | rounded-lg'
              style={{transform: 'translate(-50%,-50%)', zIndex: 1000}}>
              <div className='p-6 flex flex-wrap'>
                <label className="block pr-2 w-full">
                  <span className="text-gray-700">Nombre</span>
                  <input type="text" onChange={handleChange} name='nombre'
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Nombre del material"
                    style={{borderColor: errors.nombre ? 'red' : 'gainsboro'}}
                    value={values.nombre}/>
                  <div className="flex-end w-full pt-1" style={{display: errors.nombre ? 'flex' : 'none'}}>
                    <span style={{textAlign:'right', fontSize:'8pt', color:'red'}}>{errors.nombre}</span>
                  </div>
                </label>
                <div className='w-full p-2 mt-6 flex justify-end'>
                  <button
                    disabled={isSubmitting}
                    className='px-4 p-2 mx-2 inline-flex leading-5 rounded-lg text-green-50'
                    style={{backgroundColor: '#45BF55'}}
                    type="submit"
                    >{oldMaterial.id != "" ? 'Actualizar':'Guardar'}
                  </button>
                  <button
                    className='px-4 p-2 inline-flex leading-5 rounded-lg text-green-50'
                    style={{backgroundColor: '#E15252'}}
                    type="button"
                    onClick={(e:any) => { handleReset(e); hidden() }}
                    >Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}
export default ModalMaterial;
