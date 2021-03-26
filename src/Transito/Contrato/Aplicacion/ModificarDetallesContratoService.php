<?php


namespace Cantera\Transito\Contrato\Aplicacion;


use Cantera\Transito\Contrato\Dominio\ContratoBuilder;
use Cantera\Transito\Contrato\Dominio\ContratoId;
use Cantera\Transito\Contrato\Dominio\ContratoInexistente;
use Cantera\Transito\Contrato\Dominio\IContratoRepository;
use Cantera\Transito\Contrato\Dominio\TerminoValueObject;
use Cantera\Transito\Contrato\Dominio\TransaccionValueObject;
use Cantera\Transito\Material\Dominio\IMaterialRepository;
use Cantera\Transito\Material\Dominio\MaterialId;
use Cantera\Transito\Vehiculo\Dominio\IVehiculoRepository;
use Cantera\Transito\Vehiculo\Dominio\VehiculoId;

class ModificarDetallesContratoService
{
    private IContratoRepository $repository;
    private IMaterialRepository $materialRepository;
    private IVehiculoRepository $vehiculoRepository;

    /**
     * ModificarDetallesContratoService constructor.
     * @param IContratoRepository $repository
     * @param IMaterialRepository $materialRepository
     * @param IVehiculoRepository $vehiculoRepository
     */
    public function __construct(IContratoRepository $repository, IMaterialRepository $materialRepository, IVehiculoRepository $vehiculoRepository)
    {
        $this->repository = $repository;
        $this->materialRepository = $materialRepository;
        $this->vehiculoRepository = $vehiculoRepository;
    }

    public function __invoke(string $id, array $detalles, array $vehiculos)
    {
        $contratoBuilder = $this->repository->search(new ContratoId($id));
        if ($contratoBuilder == null)
            throw new ContratoInexistente();

        //$contratoBuilder = new ContratoBuilder($contrato->getId(), $contrato->getSerie(), $contrato->getUbicacion(), $contrato->getFecha(), $contrato->getClienteId());
        $response = "DETALLES \n";
        $cont = 0;
        foreach ($detalles as $detalle) {
            $material = $this->materialRepository->find(new MaterialId($detalle['material']));
            if ($material != null) {
                $contratoBuilder->addDetalle(new TerminoValueObject($detalle['termino']['volumen'], $detalle['termino']['tipo']), new TransaccionValueObject($detalle['transaccion']), $material);
                $response = $cont . $response . " El Material " . $material->getNombre()->value() . " fue agregado al contrato.\n";
            } else {
                $response = $cont . $response . "El Material " . $detalle['material'] . " no fue agregado al contrato porque no existe.\n";
            }
        }

        $response = $response . " VEHICULOS \n";
        foreach ($vehiculos as $vehiculo) {
            $vehiculo = $this->vehiculoRepository->search(new VehiculoId($vehiculo['id']));
            if ($vehiculo != null) {
                $contratoBuilder->addVechiculo($vehiculo);
                $response = $cont . $response . " El Vehiculo " . $vehiculo->getPlaca()->value() . " fue agregado al contrato.\n";
            } else {
                $response = $cont . $response . " El Vehiculo " . $vehiculo . " no fue agregado al contrato porque no existe.\n";
            }
        }

        $contrato = $contratoBuilder->build();
        $this->repository->save($contrato);

    }


}
