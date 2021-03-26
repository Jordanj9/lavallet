<?php


namespace Cantera\Transito\Contrato\Aplicacion;


use Cantera\Transito\Contrato\Dominio\Contrato;
use Cantera\Transito\Contrato\Dominio\IContratoRepository;
use Cantera\Transito\Contrato\Dominio\ITicketRepository;
use Cantera\Transito\Contrato\Dominio\TicketCarga;
use Cantera\Transito\Contrato\Dominio\TicketId;
use Cantera\Transito\Material\Dominio\MaterialId;
use Cantera\Transito\Serie\Dominio\ISerieRepository;
use Cantera\Transito\Serie\Dominio\SerieId;
use Cantera\Transito\Vehiculo\Dominio\VehiculoId;

class GenerarTicketService
{

    private ITicketRepository $ticketRepository;
    private ISerieRepository $serieRepository;

    /**
     * GenerarTicketService constructor.
     * @param ITicketRepository $ticketRepository
     * @param ISerieRepository $serieRepository
     */
    public function __construct(ITicketRepository $ticketRepository, ISerieRepository $serieRepository)
    {
        $this->ticketRepository = $ticketRepository;
        $this->serieRepository = $serieRepository;
    }


    public function __invoke(TicketRequest $request, Contrato $contrato)
    {

        $capacidad = $contrato->getVehiculos()->exist(new VehiculoId($request->getVehiculoId()))->getCapacidad()->value();
        $serie = $this->serieRepository->incrementrarSerie(new SerieId($request->getSerie()['id']));
        $ticket = $contrato->addTicket(new TicketId($request->getId()), new VehiculoId($request->getVehiculoId()), new MaterialId($request->getDetalle()['material_id']), new TicketCarga($capacidad), $serie);
        $ticket->setInput($request->getInput());
        $this->ticketRepository->save($ticket, $contrato->getId());
        $this->serieRepository->update($serie);
    }


}
