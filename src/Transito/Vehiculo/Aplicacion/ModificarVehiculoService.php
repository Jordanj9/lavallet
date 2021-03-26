<?php

namespace Cantera\Transito\Vehiculo\Aplicacion;

use Cantera\Transito\Conductor\Dominio\ConductorId;
use Cantera\Transito\Vehiculo\Dominio\IVehiculoRepository;
use Cantera\Transito\Vehiculo\Dominio\Vehiculo;
use Cantera\Transito\Vehiculo\Dominio\VehiculoCapacidad;
use Cantera\Transito\Vehiculo\Dominio\VehiculoDuplicado;
use Cantera\Transito\Vehiculo\Dominio\VehiculoId;
use Cantera\Transito\Vehiculo\Dominio\VehiculoPlaca;
use Cantera\Transito\Vehiculo\Dominio\VehiculoTipo;


class ModificarVehiculoService
{
    private IVehiculoRepository $repository;

    /**
     * ModificarVehiculoService constructor.
     * @param IVehiculoRepository $repository
     */
    public function __construct(IVehiculoRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @param VehiculoRequest $request
     */
    public function __invoke(VehiculoRequest $request)
    {
        $placa = new VehiculoPlaca($request->getPlaca());
        $vehiculo = $this->repository->findByPlaca($placa);
        if ($vehiculo != null && $vehiculo->getId()->value() != $request->getId())
            throw  new VehiculoDuplicado($placa);


        $vehiculo = new Vehiculo(new VehiculoId($request->getId()), new VehiculoPlaca($request->getPlaca()), new VehiculoCapacidad($request->getCapacidad()), new VehiculoTipo($request->getTipo()), new ConductorId($request->getConductorId()));
        $this->repository->updated($vehiculo);
    }

}
