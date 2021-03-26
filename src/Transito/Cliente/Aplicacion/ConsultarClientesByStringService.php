<?php


namespace Cantera\Transito\Cliente\Aplicacion;


use Cantera\Transito\Cliente\Dominio\IClienteRepository;

class ConsultarClientesByStringService
{
    private IClienteRepository $repository;

    /**
     * ConsultarClientesByStringService constructor.
     * @param IClienteRepository $repository
     */
    public function __construct(IClienteRepository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke(string $cadena): array
    {
        return $this->repository->findByNombreOrIdentificacion($cadena);
    }


}
