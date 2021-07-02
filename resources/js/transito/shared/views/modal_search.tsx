import React, { useEffect, useState } from "react";
import { generateUuid } from "../infrastructure/uuid";
import Spinner from "./spinner";

const tags = [1,2,3,4,5,6,7,8];

const ModalSearch: React.FC<{
  show: boolean,
  hidden: any,
  service: any,
  setResult: any
}> = ({show, hidden, service, setResult}) => {

  const [id, setId] = useState('');
  const [paginas, setPaginas] = useState(1);
  const [pagina, setPagina] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>([]);
  const [resultsPaginate, setResultsPaginate] = useState<any>([]);
  const [header, setHeader] = useState<any>([]);

  useEffect(() => {
    setLoading(true);
    setResultsPaginate([1]);
    setPaginas(Math.ceil(results.length/4));
    changePaginate();
    handleHeader();
    setLoading(false);
  }, [results, pagina]);

  function handleHeader(){
    let tempHeader : [string] = ['']; 
    let i = 0;
    for(const key in results[0]){
      if(i>0)
        tempHeader.push(`${key}`);
      if(i == 4)
        break;
      i++;
    }
    tempHeader.push('ACCION');
    setHeader(tempHeader);
  }
  
  function changePaginate() {
    let paginate = [];
    let index = 0;
    while(index < 4){
      let result = results[((pagina - 1)*4)+index];
      if(result != undefined)
        paginate.push(result); 
      index++;
    }
    setResultsPaginate([]);
    setResultsPaginate(paginate);
  }

  function setSelect(object:any){
    setResult(object);
    hidden();
  }

  function handleId(ev: any){
    setId(ev.target.value);
  }

  function search(){
     service.find(id).then( (value : any) => {
        setResults(value.data);
     });
  }

  return(
    <div className={show ? 'fixed top-0 left-0 block' : 'fixed top-0 left-0 hidden'} style={{zIndex:7000}}>
      <Spinner show={loading}/>
      <div className='fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-40' onClick={hidden} style={{zIndex:7000}}>
      </div>
      <div className='fixed | top-1/2 left-1/2 | w-3/4 | bg-white | shadow | rounded-lg px-6'
          style={{transform: 'translate(-50%,-50%)', zIndex:7000}}>
        <div className='mt-6 flex'>
          <div className="w-full">
            <div className="mr-4">
              <div className="">
                <input
                  onChange={handleId}
                  name='id'  
                  type="text" 
                  placeholder="Palabra" 
                  className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
              </div>
            </div>
          </div>
          <div className="w-30 mr-4">
            <button
              type='button'
              onClick={() => {search()}}
              className='mt-1 p-2 px-4 w-full inline-flex leading-5 rounded-lg text-green-50 justify-center'
              style={{backgroundColor: '#45BF55'}}>
                <svg 
                  className="w-6 h-6 text-white-500"
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>
          </div>                          
          <div className="w-30">
            <button
              type='button'
              onClick={() => {hidden()}}
              className='mt-1 p-2 px-4 w-full inline-flex leading-5 rounded-lg text-green-50 justify-center'
              style={{backgroundColor: '#E15252'}}>
                <svg xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 text-white-500" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor">
                  <path strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
          </div>
        </div>
        <div className='w-full'>
          <div className="flex flex-col">

            <div className="my-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8" style={{display: results.length > 0 ? 'block' : 'none' }}>
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200" >
                    <thead className="bg-gray-50">
                      
                      <tr>                        
                        {  
                          header && header.map( (x : string) => {
                            return(
                              <th scope="col"  key={generateUuid()}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {x.toUpperCase()}
                              </th>
                            );
                          })
                        }
                      </tr> 

                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {
                      resultsPaginate.map((object : any) => {
                        console.log(object);
                        return (
                          <tr className='hover:bg-gray-100 cursor-pointer' key={generateUuid()} onClick={() => setSelect(object)}>
                            {
                              header && header.map((k: any) => {
                                if(k != 'ACCION'){
                                  return(
                                    <td className="px-6 py-4 whitespace-nowrap" key={generateUuid()}>
                                     {object[k] &&  typeof object[k]  === 'object' ? object[k].nombre : object[k]} 
                                    </td>
                                  );
                                }
                              })
                            }
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium ">
                              <div className='flex items-center'>
                                <button 
                                  type='button'
                                  className='mr-2' 
                                  title='Seleccionar'                               
                                  onClick={() => {
                                    setSelect(object);
                                  }}>
                                  <svg xmlns="http://www.w3.org/2000/svg" 
                                    className="h-6 w-6 text-gray-500" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor">
                                    <path strokeLinecap="round" 
                                      strokeLinejoin="round" 
                                      strokeWidth={2} 
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>);
                      })
                    }
                    </tbody>
                  </table>
                  <div className="z-0 bg-white w-full px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    
                    <div className="z-0 flex-1 flex justify-between sm:hidden">
                      <a className="z-0 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
                        Anterior
                      </a>
                      <a className="z-0 ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
                        Siguiente
                      </a>
                    </div>
                    
                    <div className="z-0 hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="z-0 text-sm text-gray-700">
                          Página
                          <span className="font-medium"> {pagina} </span>
                          de
                          <span className="font-medium"> {paginas} </span>
                        </p>
                      </div>
                      <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                          <a onClick={() => ( setPagina(pagina > 1 ? pagina - 1 : 1))}
                            className="z-0 relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <span className="z-0 sr-only">Previous</span>
                            <svg className="z-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </a>
                          <span style={{display: paginas >= 9 ? 'block' : 'none' }} className="z-0 relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                            ...
                          </span>
                          {                        
                           tags && tags.map((index: number) => {
                              return (
                                <span 
                                  key={generateUuid()}
                                  onClick={() => (setPagina(index))}
                                  style={{display: paginas < 9 && index <= paginas ? 'block' : 'none' }} 
                                  className="z-0 relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                  {index}
                                </span>
                              )
                            })
                          }
                          <a onClick={() => (setPagina(pagina < paginas ? pagina + 1 : pagina))}
                            className="z-0 relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <span className="z-0 sr-only">Next</span>
                            <svg className="z-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </a>
                        </nav>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          
          </div>        
        </div>
      </div>
    </div>
  );
}
export default ModalSearch;
