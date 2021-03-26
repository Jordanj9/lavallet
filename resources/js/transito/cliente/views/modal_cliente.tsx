import React, {useEffect, useState} from "react";
import { Cliente } from "../domain/cliente";
import ClienteService from "../application/ClienteService";
import Modal from "../../shared/views/modal";
import UbicacionService from "../../shared/application/UbicacionService";
import { Departamento } from "../../shared/domain/departamento";
import { Municipio } from "../../shared/domain/municipio";
import {Formik}  from 'formik';
import Toast from "../../shared/views/toast";

enum STATUS {
    OK = 200,
    CREATED = 201
}

const ModalCliente: React.FC<{
    show: boolean;
    hidden: any;
    cliente: Cliente;
    setCliente: any;
    service: ClienteService
}> = ({ show, hidden, cliente, setCliente, service }) => {

    const _ubicacion = new UbicacionService();

    const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
    const [departamento, setDepartamento] = useState<Departamento>(new Departamento());
    const [municipios, setMunicipios] = useState<Municipio[]>([]);
    const [municipio, setMunicipio] = useState<Municipio>(new Municipio());

    const [showModalRequest, setShowModalRequest] = useState(false);
    const [warning, setWarning] = useState(false);
    const [message, setMessage] = useState('');
    
    
    useEffect(() => {
        if(show){
            //UBICACIONES
            if(departamentos.length <= 0){
                _ubicacion.get().then(value => {
                    if(value.data != null){
                        setDepartamentos(value.data);   
                        if(value.data.length > 0){
                            setDepartamento(value.data[0]);
                            setMunicipios(value.data[0].municipios);
                
                            if(value.data[0].municipios.length > 0)
                                setMunicipio(value.data[0].municipios[0]);
                            
                            //UBICACION POR DEFECTO
                            if(cliente.id != ""){
                                let _departamento = value.data.find(x => x.nombre == cliente.departamento) as Departamento;
                                let _municipio = _departamento.municipios.find(x => x.nombre == cliente.municipio) as Municipio;
                                let _municipios = _departamento.municipios;
                                setMunicipios(_municipios);
                                setDepartamento(_departamento);
                                setMunicipio(_municipio);
                            }
                        }
                    }             
                });
            } 
        }
        if(cliente.id == '')
            cliente.tipo = 'NATURAL';   
    }, [show]);

    function changeDepartamento(ev: any) {
        let value = ev.target.value;
        let _departamento = departamentos.find(x => x.nombre == value) as Departamento;
        setMunicipio(_departamento.municipios[0]);
        setDepartamento(_departamento);
        setMunicipios(_departamento.municipios);
    }

    function changeMunicipio(ev: any) {
        let value = ev.target.value;
        let _municipio = municipios.find(x => x.nombre == value) as Municipio;
        setMunicipio(_municipio);
    }

    async function save(_cliente:Cliente) {
        _cliente.departamento = departamento.nombre;
        _cliente.municipio = municipio.nombre;
        
        if(_cliente.id != ""){
            await service.update(_cliente).then( value => {
                if (value.data != null)
                    hidden();
                else{
                    showToast(value.mensaje, true);
                }
            });
        }
        else{
            await service.save(_cliente).then( value => {
                if (value.data != null)
                    hidden();
                else{
                    showToast(value.mensaje, true);
                    let _cliente = new Cliente(cliente);
                    _cliente.id = '', cliente.id = '';
                    setCliente(_cliente);
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
            initialValues={cliente}
            validate={value => {
                const errors:any = {};
                setCliente(value);

                if(!value.identificacion)
                    errors.identificacion = "Este campo es obligatorio";
                if(!value.nombre) 
                    errors.nombre = "Este campo es obligatorio";
                if(!value.telefono)
                    errors.telefono = "Este campo es obligatorio";
                if(!value.correo || !value.correo.includes('@') || !value.correo.includes('.'))
                    errors.correo = "Este campo es obligatorio";
                if(!value.direccion)
                    errors.direccion = "Este campo es obligatorio";

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
                            style={{zIndex: 100}}
                            onClick={(e:any) => { hidden(); setShowModalRequest(false); handleReset(e) }}
                            onMouseEnter={(e:any) => {cliente.id != "" ? setValues(cliente) : handleReset(e);}}>
                        </div>
                        <div className='fixed | top-1/2 left-1/2 | w-6/12 | bg-white | shadow | rounded-lg' 
                            onMouseEnter={(e:any) => {cliente.id != "" ? setValues(cliente) : handleReset(e);}}
                            style={{ transform: 'translate(-50%,-50%)', zIndex: 100}}>
                            <div className='p-6 flex flex-wrap'>
                                <label className="block p-2 w-1/3">
                                    <span className="text-gray-700">Tipo</span>
                                    <select onChange={handleChange} name='tipo' value={values.tipo}
                                        className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                        <option value='NATURAL'>Natural</option>
                                        <option value='JURIDICA'>Juridica</option>
                                    </select>
                                </label>
                                <div className='text-gray-700 w-full my-2'></div>
                                <label className="block p-2 w-1/3">
                                    <span className="text-gray-700">Identificacion</span>
                                    <input type="text" onChange={handleChange} 
                                        name='identificacion' disabled={cliente.id != '' ? true : false} 
                                        value={values.identificacion}
                                        style={{borderColor: errors.identificacion ? 'red' : 'gainsboro'}}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                                </label>
                                <label className="block p-2 w-2/3">
                                    <span className="text-gray-700">Nombres</span>
                                    <input type="text" onChange={handleChange} 
                                        name='nombre' value={values.nombre}
                                        style={{borderColor: errors.nombre ? 'red' : 'gainsboro'}}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                                </label>
                                <label className="block p-2 w-1/3">
                                    <span className="text-gray-700">Telefono</span>
                                    <input type="number" onChange={handleChange} 
                                        name='telefono' value={values.telefono}
                                        style={{borderColor: errors.telefono ? 'red' : 'gainsboro'}}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                                </label>
                                <label className="block p-2 w-2/3">
                                <span className="text-gray-700">E-mail</span>
                                    <input type="email" onChange={handleChange} 
                                        name='correo' value={values.correo}
                                        style={{borderColor: errors.correo ? 'red' : 'gainsboro'}}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                                </label>
                                <div className='text-gray-700 w-full my-2'></div>
                                <label className="block p-2 w-1/3">
                                    <span className="text-gray-700">Departamento</span>
                                    <select onChange={changeDepartamento} name='departamento' value={departamento.nombre}
                                        className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                        {
                                            departamentos.map((departamento: Departamento) => {
                                                return (
                                                    <option key={departamento.id} value={departamento.nombre}>{departamento.nombre}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </label>
                                <label className="block p-2 w-1/3">
                                    <span className="text-gray-700">Municipio</span>
                                    <select onChange={changeMunicipio} name='municipio' value={municipio.nombre}
                                        className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                        {
                                            municipios.map((municipio: Municipio) => {
                                                return (
                                                    <option key={municipio.id} value={municipio.nombre}>{municipio.nombre}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </label>
                                <label className="block p-2 w-1/3">
                                    <span className="text-gray-700">Dirección</span>
                                    <input type="text" onChange={handleChange} 
                                    name='direccion' value={values.direccion}
                                    style={{borderColor: errors.direccion ? 'red' : 'gainsboro'}}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                                </label>
                                <div className='w-full mt-6 flex justify-end'>
                                    <button 
                                        type="submit"
                                        className='p-2 px-4 mx-4 inline-flex leading-5 rounded-lg text-green-50' 
                                        style={{ backgroundColor: '#45BF55' }}>{cliente.id != '' ? 'Actualizar' : 'Guardar'}</button>
                                    <button 
                                        className='p-2 px-4 inline-flex leading-5 rounded-lg text-green-50' 
                                        style={{ backgroundColor: '#E15252' }} onClick={(e:any) => { hidden(); setShowModalRequest(false); handleReset(e) }}>Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </Formik>        
    );
}


export default ModalCliente;



