<?php


namespace Cantera\Transito\Contrato\Aplicacion;


use Cantera\Transito\Contrato\Dominio\IContratoRepository;
use Cantera\Transito\Contrato\Dominio\VehiculoSinContratoException;
use Cantera\Transito\Vehiculo\Dominio\IVehiculoRepository;
use Cantera\Transito\Vehiculo\Dominio\VehiculoNoExiste;
use Cantera\Transito\Vehiculo\Dominio\VehiculoPlaca;
use function Lambdish\Phunctional\map;

class ConsultarContratosVehiculoService
{
    private IContratoRepository $repository;
    private IVehiculoRepository $vehiculoRepository;

    /**
     * ConsultarContratosVehiculoService constructor.
     * @param IContratoRepository $repository
     * @param IVehiculoRepository $vehiculoRepository
     */
    public function __construct(IContratoRepository $repository, IVehiculoRepository $vehiculoRepository)
    {
        $this->repository = $repository;
        $this->vehiculoRepository = $vehiculoRepository;
    }


    public function __invoke(VehiculoPlaca $placa): array
    {
        $vehiculo_id = $this->vehiculoRepository->findByPlaca($placa);
        if ($vehiculo_id == null)
            throw new VehiculoNoExiste($placa);

        $contratos = $this->vehiculoRepository->contratosVehiculo($placa);
        if (count($contratos) <= 0)
            throw new VehiculoSinContratoException('El Vehiculo no tiene contratos asociados.');

        $array = ['contratos'=>$contratos,'vehiculo'=>$vehiculo_id];
        return $array;
    }


}
