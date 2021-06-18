import React, { useEffect } from "react";
import { Imprimible } from "../../salida/domain/imprimible";

import logo from "../../../../assets/images/logo-lavallet.png";

const Preview: React.FC<{
    show: boolean,
    imprimible: Imprimible,
    imprimir: boolean
}> = ({show, imprimible, imprimir}) => {

    useEffect(() => {
        if(imprimir){
            imprimirElemento('PDFtoPrint');
        }
    }, [imprimir, imprimible]);

    function imprimirElemento(id:string) {
        var elemento = document.getElementById(id) as HTMLElement;
        var contenido = elemento.innerHTML;
        document.body.innerHTML = contenido;   
        window.print();    
        location.reload(); 
    }

return(
    <div className={show ? 'block' : 'hidden'}>
        <div className="grid-cols-4 bg-gray-50 p-4" id={'PDFtoPrint'}>            
            <div className="grid-span-4 my-2 text-center">
                <p style={{fontSize: '9pt'}}>{imprimible?.tipo} CONTROL DE VENTA Y TRANSPORTE DE MATERIALES</p>
            </div>
            <div className="grid-span-4 my-2 flex">
                <div className="w-2/4 flex justify-center align-center">
                    <img src={logo} style={{width: '100px', height:'120px'}} alt="logo"/>
                </div>
                <div className="w-2/4 text-center">
                    <p style={{fontSize: '9pt'}} className='mb-2'> <b>N° {imprimible?.serie?.prefijo + '-' + imprimible?.serie?.actual}</b> </p>
                    <p style={{fontSize: '9pt'}}> <b>Celulares</b> </p>
                    <p style={{fontSize: '9pt'}}>3205654787</p>
                    <p style={{fontSize: '9pt'}}>3102723376</p>
                    <p style={{fontSize: '9pt'}}>3145679041</p>
                </div>
            </div>
            <div className="grid-span-4 my-2 flex">                
                <div className="w-1/4">
                    <p style={{fontSize: '9pt'}}> <b>Nit. o C.C.</b> </p>
                </div>
                <div className="w-3/4">
                    <p style={{fontSize: '9pt'}}>{imprimible?.contrato?.cliente?.identificacion}</p>
                </div>
            </div>
            <div className="grid-span-4 my-2 flex">                
                <div className="w-1/4">
                    <p style={{fontSize: '9pt'}}> <b>Cliente</b> </p>
                </div>
                <div className="w-3/4">
                    <p style={{fontSize: '9pt'}}>{imprimible?.contrato?.cliente?.nombre}</p>
                </div>
            </div>
            <div className="grid-span-4 my-2 flex"> 
                <div className="w-1/4">
                    <p style={{fontSize: '9pt'}}> <b>Conductor</b> </p>
                </div>
                <div className="w-3/4">
                    <p style={{fontSize: '9pt'}}>{imprimible?.vehiculo?.conductor?.nombre}</p>
                </div>
            </div>
            <div className="grid-span-4 my-2 flex">                 
                <div className="w-1/4">
                    <p style={{fontSize: '9pt'}}> <b>Placa</b> </p>
                </div>
                <div className="w-1/4">
                    <p style={{fontSize: '9pt'}}>{imprimible?.vehiculo?.placa}</p>
                </div>               
                <div className="w-1/4">
                    <p style={{fontSize: '9pt'}}> <b>Operación</b> </p>
                </div>
                <div className="w-1/4">
                    <p style={{fontSize: '9pt'}}>{imprimible?.detalle?.transaccion || ''}</p>
                </div>
            </div>
            <div className="grid-span-4 my-2 flex">
                <div className="w-1/4">
                    <p style={{fontSize: '9pt'}}> <b>Carga</b> </p>
                </div>
                <div className="w-1/4">
                    <p style={{fontSize: '9pt'}}>{imprimible?.detalle?.termino?.volumen || ''}</p>
                </div>
                <div className="w-1/4">
                    <p style={{fontSize: '9pt'}}> <b>Material</b> </p>
                </div>
                <div className="w-1/4">
                    <p style={{fontSize: '9pt'}}>{imprimible?.detalle?.material?.nombre || ''}</p>
                </div>
            </div>
            <div className="grid-span-4 text-center my-4 mt-5 flex">
                <div className="w-1/2">
                    <p style={{fontSize: '9pt'}}>__________________________</p>
                    <p style={{fontSize: '9pt'}}>Conductor</p>
                </div>
                <div className="w-1/2">
                    <p style={{fontSize: '9pt'}}>__________________________</p>
                    <p style={{fontSize: '9pt'}}>Recibido</p>
                </div>                
            </div>
            <div className="grid-span-4 text-center my-4">
                <p style={{fontSize: '9pt'}}>Oficinas y Planta: Km 6 Via Patillal - Margen derecha</p>
                <p style={{fontSize: '9pt'}}>gerenciasantaluciadelvalle@outlook.es</p>
                <p style={{fontSize: '9pt'}}>vallecuello@hotmail.com</p>
                <p style={{fontSize: '9pt'}}>Salida {imprimible?.fecha?.split('T')[0]} {imprimible?.fecha?.split('T')[1]?.split('.')[0]}</p>
            </div>
        </div>
    </div>
    );
}
export default Preview;
