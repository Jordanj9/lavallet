<?php


namespace Cantera\Transito\Material\Aplicacion;


use Cantera\Transito\Material\Dominio\IMaterialRepository;

class GetMaterialesService
{
    private IMaterialRepository $repository;

    /**
     * GuardarMaterialService constructor.
     * @param IMaterialRepository $repository
     */
    public function __construct(IMaterialRepository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke(): array
    {
        return $materiales = $this->repository->all();
    }

}
