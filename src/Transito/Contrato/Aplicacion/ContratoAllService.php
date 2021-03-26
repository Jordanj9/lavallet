<?php


namespace Cantera\Transito\Contrato\Aplicacion;


use Cantera\Transito\Contrato\Dominio\IContratoRepository;

class ContratoAllService
{
    private IContratoRepository $repository;

    /**
     * ContratoAllService constructor.
     * @param IContratoRepository $repository
     */
    public function __construct(IContratoRepository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke(): array
    {
        return $this->repository->all();
    }


}
