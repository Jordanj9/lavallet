<?php


namespace Cantera\Transito\Contrato\Aplicacion;


use Cantera\Transito\Contrato\Dominio\ITicketRepository;
use Cantera\Transito\Contrato\Dominio\Ticket;
use Cantera\Transito\Contrato\Dominio\TicketEstado;
use Cantera\Transito\Contrato\Dominio\TicketId;
use Cantera\Transito\Contrato\Dominio\TicketInexistente;

class FinalizarTicketService
{
    private ITicketRepository $repository;

    /**
     * FinalizarTicketService constructor.
     * @param ITicketRepository $repository
     */
    public function __construct(ITicketRepository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke(Ticket $ticket)
    {
//        $ticket = $this->repository->search($ticketId);
//        if ($ticket == null)
//            throw new TicketInexistente();

        $ticket->setEstado(TicketEstado::isFinalizado());
        //$ticket->setOutput($output);
        $this->repository->update($ticket);
    }


}
