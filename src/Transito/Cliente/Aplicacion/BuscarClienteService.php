<?php

namespace Cantera\Transito\Cliente\Aplicacion;

use Cantera\Transito\Cliente\Dominio\Cliente;
use Cantera\Transito\Cliente\Dominio\ClienteIdentificacion;
use Cantera\Transito\Cliente\Dominio\IClienteRepository;
use Cantera\Transito\Cliente\Dominio\ClienteNoExisteConEstaIdentificacion;

final class BuscarClienteService
{

    private IClienteRepository $repository;

    public function __construct(IClienteRepository $repository)
    {
       $this->repository =  $repository;
    }

    public function __invoke(string $identificacion) : Cliente
    {
        $identificacion = new ClienteIdentificacion($identificacion);
        $cliente = $this->repository->findByIdentificacion(new ClienteIdentificacion($identificacion));

        if($cliente == null)
            throw new ClienteNoExisteConEstaIdentificacion($identificacion);

        return $cliente;
    }
}
