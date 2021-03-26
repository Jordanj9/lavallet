<?php


namespace Cantera\Transito\Vehiculo\Aplicacion;


use Cantera\Transito\Contrato\Dominio\ITicketRepository;
use Cantera\Transito\Contrato\Dominio\IValeRepository;
use Cantera\Transito\Contrato\Dominio\TicketEstado;
use Cantera\Transito\Contrato\Dominio\ValeEstado;
use Cantera\Transito\Vehiculo\Dominio\IVehiculoRepository;
use Cantera\Transito\Vehiculo\Dominio\VehiculoNoExiste;
use Cantera\Transito\Vehiculo\Dominio\VehiculoPlaca;

class ConsultarTicketorValeService
{
    private IVehiculoRepository $vehiculoRepository;
    private ITicketRepository $ticketRepository;
    private IValeRepository $valeRepository;

    /**
     * ConsultarTicketorValeService constructor.
     * @param IVehiculoRepository $vehiculoRepository
     * @param ITicketRepository $ticketRepository
     * @param IValeRepository $valeRepository
     */
    public function __construct(IVehiculoRepository $vehiculoRepository, ITicketRepository $ticketRepository, IValeRepository $valeRepository)
    {
        $this->vehiculoRepository = $vehiculoRepository;
        $this->ticketRepository = $ticketRepository;
        $this->valeRepository = $valeRepository;
    }

    public function __invoke(VehiculoPlaca $placa): array
    {
        $vehiculo = $this->vehiculoRepository->findByPlaca($placa);
        if ($vehiculo == null)
            throw new VehiculoNoExiste($placa);

        $ticket = $this->ticketRepository->findByPlacaEstado($placa, TicketEstado::isPendiente());
        $vale = $this->valeRepository->findByPlacaEstado($placa, ValeEstado::isPendiente());
        $serieTicket = $serieVale = $contrato = null;
        if ($ticket != null) {
            $serieTicket = $ticket->getSerie()->toArray();
            $contrato = $ticket->getContratoId()->value();
            $ticket = $ticket->toArray();
        }
        if ($vale != null) {
            $serieVale = $vale->getSerie()->toArray();
            $contrato = $vale->getContratoId()->value();
            $vale = $vale->toArray();
        }
        return [
            'ticket' => ['ticket' => $ticket, 'serie' => $serieTicket],
            'vale' => ['vale' => $vale, 'serie' => $serieVale],
            'vehiculo' => $vehiculo->toArray(), 'contrato_id' => $contrato
        ];

    }


}
