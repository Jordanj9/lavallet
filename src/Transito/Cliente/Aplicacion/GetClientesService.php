<?php


namespace Cantera\Transito\Cliente\Aplicacion;


use Cantera\Transito\Cliente\Dominio\IClienteRepository;

class GetClientesService
{
    private IClienteRepository $repository;

    /**
     * GetClientesService constructor.
     * @param IClienteRepository $repository
     */
    public function __construct(IClienteRepository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke()
    {
        return $clientes = $this->repository->all();
    }

}
