<?php


namespace Cantera\Transito\Departamento\Aplicacion;


use Cantera\Transito\Departamento\Dominio\IDepartamentoRepository;

class GetDepartamentoService
{
    private IDepartamentoRepository $repository;

    /**
     * GetDepartamentoService constructor.
     * @param IDepartamentoRepository $repository
     */
    public function __construct(IDepartamentoRepository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke()
    {

        return $this->repository->all();
    }


}
