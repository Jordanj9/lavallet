import React, { useState, useEffect } from "react";
import { Vehiculo } from "../domain/vehiculo";
import { Conductor } from "../../conductor/domain/conductor";
import VehiculoService from "../application/VehiculoService";
import ConductorService from "../../conductor/application/ConductorService";
import {Formik}  from 'formik';
import Toast from "../../shared/views/toast";

enum STATUS {
    OK = 200,
    CREATED = 201
}

const ModalVehiculo: React.FC<{
    show: boolean;
    hidden: any;
    vehiculo: Vehiculo;
    setVehiculo: any;
    service: VehiculoService
}> = ({ show, hidden, vehiculo, setVehiculo, service }) => {
    
    const conductorService = new ConductorService();

    const [conductores, setConductores] = useState<Conductor[]>([]);
    const [conductor, setConductor] = useState<Conductor>(new Conductor());

    const [showModalRequest, setShowModalRequest] = useState(false);
    const [warning, setWarning] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if(conductores.length <= 0){
            conductorService.getConductores().then(value => {
                setConductores(value.data);
                if(value.data.length > 0)
                    setConductor(value.data[0]);
            });
        }
        if(vehiculo.id == "")
            vehiculo.tipo = 'VOLQUETA'
        else{
            setConductor(conductores.find( x => x.id == vehiculo.conductor.id ) as Conductor);
        }
    }, [vehiculo]);

    function changeConductor(ev: any) {
        let id = ev.target.value;
        let value = conductores.find( x => x.id == id ) as Conductor ;
        setConductor(value);     
    }

    async function save(_vehiculo:Vehiculo) {
        _vehiculo.conductor = conductor;
        if(_vehiculo.id != ""){
            await service.update(_vehiculo).then( value => {
                if (value.data != null)
                    hidden();
                else{
                    showToast(value.mensaje, true);
                }
            });
        }
        else{
            await service.save(_vehiculo).then( value => {
                if (value.data != null)
                    hidden();
                else{
                    showToast(value.mensaje, true);
                    let _vehiculo = new Vehiculo().setVehiculo(vehiculo);
                    _vehiculo.id = ''; vehiculo.id = '';
                    setVehiculo(_vehiculo);
                }
            });
        }
    }

    function showToast(mensaje:string, warning:boolean){
        setMessage(mensaje);
        setWarning(warning);        
        setShowModalRequest(true);
    }

    return (
        <Formik
            initialValues={vehiculo}
            validate={value => {
                const errors:any = {};
                setVehiculo(value);

                if(!value.placa)
                    errors.placa = "Este campo es obligatorio";
                if(!value.capacidad || parseInt(value.capacidad) <= 0) 
                    errors.capacidad = "El valor mínimo de este campo es 1";

                return errors;
            }}
            onSubmit={(values, {setSubmitting}:any) => {
                setSubmitting(true);
                save(values).then(setSubmitting(false));
            }}>
            {
                ({errors, handleChange, handleSubmit, values, setValues, handleReset}) => (
                <form onSubmit={handleSubmit}>
                    <div className={'pb-4 ' + (show ? 'block' : 'hidden')}>
                        <Toast show={showModalRequest} setShow={setShowModalRequest} message={message} warning={warning}/>
                        <div className='fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-40' 
                            onClick={(e:any) => { hidden(); handleReset(e) }}
                            onMouseEnter={(e:any) => {vehiculo.id != "" ? setValues(vehiculo) : true;}}
                            style={{zIndex: 1000}}>
                        </div>
                        <div className='fixed | top-1/2 left-1/2 | w-1/3 | bg-white | shadow | rounded-lg' 
                            style={{ transform: 'translate(-50%,-50%)', zIndex: 1000}}>
                            <div className='p-6 flex flex-wrap'>
                                <label className="block w-2/4 p-2">
                                    <span className="text-gray-700">Placa</span>
                                    <input type="text" onChange={handleChange} 
                                        name='placa'  disabled={vehiculo.id != '' ? true : false} 
                                        value={values.placa}
                                        style={{borderColor: errors.placa ? 'red' : 'gainsboro'}}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        placeholder="numero unico" />
                                </label>
                                <label className="block w-2/4 p-2">
                                    <span className="text-gray-700">Capacidad</span>
                                    <input type="number" onChange={handleChange} 
                                        name='capacidad' value={values.capacidad}
                                        style={{borderColor: errors.capacidad ? 'red' : 'gainsboro'}}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        placeholder="10" />
                                </label>
                                <label className="block w-2/4 p-2">
                                    <span className="text-gray-700">Tipo</span>
                                    <select onChange={handleChange} name='tipo' value={values.tipo}
                                        className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                        <option value='VOLQUETA'>Volqueta</option>
                                        <option value='CAMIONETA'>Camioneta</option>
                                        <option value='CARRO_MULA'>Carro mula</option>
                                        <option value='OTRO'>Otro</option>
                                    </select>
                                </label>
                                <label className="block w-2/4 p-2">
                                    <span className="text-gray-700">Conductor</span>
                                    <select onChange={changeConductor} name='conductor' value={conductor.id}
                                        className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                        {
                                            conductores.map((conductor: Conductor) => {                    
                                                return ( 
                                                    <option key={conductor.id} value={conductor.id}>{conductor.nombre}</option>                      
                                                );
                                            })
                                        }
                                    </select>
                                </label>
                                <div className='w-full mt-6 flex justify-end'>
                                    <button 
                                        className='p-2 px-4 mx-4 inline-flex leading-5 rounded-lg text-green-50' 
                                        style={{ backgroundColor: '#45BF55' }} 
                                        type="submit">{vehiculo.id != "" ? 'Actualizar' : 'Guardar'}</button>
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


export default ModalVehiculo;
