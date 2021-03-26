<?php


namespace Cantera\Transito\Contrato\Aplicacion;


use Cantera\Transito\Contrato\Dominio\Contrato;
use Cantera\Transito\Contrato\Dominio\ITicketRepository;
use Cantera\Transito\Contrato\Dominio\IValeRepository;
use Cantera\Transito\Contrato\Dominio\Ticket;
use Cantera\Transito\Contrato\Dominio\TicketCarga;
use Cantera\Transito\Contrato\Dominio\TicketEstado;
use Cantera\Transito\Contrato\Dominio\TransaccionValueObject;
use Cantera\Transito\Contrato\Dominio\Vale;
use Cantera\Transito\Contrato\Dominio\ValeId;
use Cantera\Transito\Material\Dominio\MaterialId;
use Cantera\Transito\Serie\Dominio\ISerieRepository;
use Cantera\Transito\Serie\Dominio\SerieId;
use Cantera\Transito\Vehiculo\Dominio\VehiculoId;

class GenerarValeService
{
    private IValeRepository $valeRepository;
    private ISerieRepository $serieRepository;

    /**
     * GenerarValeService constructor.
     * @param IValeRepository $valeRepository
     * @param ISerieRepository $serieRepository
     */
    public function __construct(IValeRepository $valeRepository, ISerieRepository $serieRepository)
    {
        $this->valeRepository = $valeRepository;
        $this->serieRepository = $serieRepository;
    }


    public function __invoke(ValeRequest $request, Contrato $contrato): ?Vale
    {
        $serie = $this->serieRepository->incrementrarSerie(new SerieId($request->getSerie()['id']));
        $vale = $contrato->addVale(new ValeId($request->getId()), new VehiculoId($request->getVehiculoId()),
            new MaterialId($request->getDetalle()['material_id']),
            new TransaccionValueObject($request->getDetalle()['transaccion']), $serie);
        if ($request->getOutput() != null)
            $vale->setOutput($request->getOutput());

        if ($request->getInput() != null)
            $vale->setInput($request->getInput());

        $this->valeRepository->save($vale, $contrato->getId());
        $this->serieRepository->update($serie);
        return $vale;
    }

}
