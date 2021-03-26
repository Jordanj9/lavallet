import React, { useEffect, useState } from "react";
import { Ticket } from "../../contrato/domain/Ticket";
import { ContratoFull } from "../../contrato/application/ContratoFull";
import { generateUuid } from "../../shared/infrastructure/uuid";

const tags = [1,2,3,4,5,6,7,8];

const ListTicket: React.FC<{
  full: ContratoFull,
  preview: any
}> = ({full, preview}) => {

  const [totalTicket, setTotalTicket] = useState(1);
  const [paginasTicket, setPaginasTicket] = useState(1);
  const [paginaTicket, setPaginaTicket] = useState(1);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    //PAGINADO
    changePaginateTickets(full.tickes);
  }, [full]);

  function changePaginateTickets(_tickets:Ticket[], pagina?:number) {
    let paginate: Ticket[] = [];
    let index = 0;  

    setPaginaTicket(Math.ceil(_tickets.length/3));
    setTotalTicket(_tickets.length);
    //setPaginaVehiculo(1);
    while(index < 3){
      let ticket = _tickets[(((pagina != undefined ? pagina : paginaTicket) - 1)*3)+index];
      if(ticket != undefined)
        paginate.push(ticket);  
      index++;
    }

    setTickets([]);
    setTickets(paginate);
  }

  function changeTicket(pagina:number){
    setPaginaTicket(pagina);
    changePaginateTickets(tickets, pagina);
  }

  return (
    <div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col"                     
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SERIE
                    </th>
                    <th scope="col"                     
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      MATERIAL
                    </th>
                    <th scope="col"                    
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ESTADO
                    </th>
                    <th scope="col"                     
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      VER
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {
                  full.tickes.map((ticket : Ticket) => {
                    return (
                      <tr className='hover:bg-gray-100 cursor-pointer' key={ticket.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {ticket.serie}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {ticket.material}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {ticket.estado}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium ">
                          <div className='flex items-center'>
                            <button className='' title='view'
                            onClick={() => { preview(new Ticket(ticket).getImprimible(full.cliente))}}>                              
                              <svg 
                                className='w-6 h-6 text-gray-500'
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor">
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth={2} 
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth={2} 
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                }
                </tbody>
              </table>
              <div className="bg-white w-full px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <a className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
                    Anterior
                  </a>
                  <a className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
                    Siguiente
                  </a>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Página
                      <span className="font-medium"> {paginaTicket} </span>
                      de
                      <span className="font-medium"> {paginasTicket} </span>
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <a onClick={() => ( changeTicket(paginaTicket > 1 ? paginaTicket - 1 : 1))}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <span style={{display: paginasTicket >= 9 ? 'block' : 'none' }} className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                        ...
                      </span>
                      {                        
                        tags.map((index: number) => {
                          return (
                            <span 
                              key={generateUuid()}
                              onClick={() => (changeTicket(index))}
                              style={{display: paginasTicket < 9 && index <= paginasTicket ? 'block' : 'none' }} 
                              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                              {index}
                            </span>
                          )
                        })
                      }
                      <a onClick={() => (changeTicket(paginaTicket < paginasTicket ? paginaTicket + 1 : paginaTicket))}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
  );
}

export default ListTicket;

