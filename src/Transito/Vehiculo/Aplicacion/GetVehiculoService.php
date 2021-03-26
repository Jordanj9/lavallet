<?php


namespace Cantera\Transito\Vehiculo\Aplicacion;


use Cantera\Transito\Vehiculo\Dominio\IVehiculoRepository;

class GetVehiculoService
{
    private IVehiculoRepository $repository;

    /**
     * GetVehiculoService constructor.
     * @param IVehiculoRepository $repository
     */
    public function __construct(IVehiculoRepository $repository)
    {
        $this->repository = $repository;
    }


    public function __invoke(): array
    {
        return $this->repository->all();
    }


}
