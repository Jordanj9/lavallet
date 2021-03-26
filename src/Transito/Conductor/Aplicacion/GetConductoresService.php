<?php


namespace Cantera\Transito\Conductor\Aplicacion;


use Cantera\Transito\Conductor\Dominio\IConductorRepository;

class GetConductoresService
{
    private IConductorRepository $repository;

    /**
     * GetConductoresService constructor.
     * @param IConductorRepository $repository
     */
    public function __construct(IConductorRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @return array
     */
    public function __invoke(): array
    {
        return $this->repository->all();
    }


}
