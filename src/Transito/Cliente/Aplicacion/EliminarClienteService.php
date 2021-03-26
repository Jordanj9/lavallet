<?php

namespace Cantera\Transito\Cliente\Aplicacion;

use Cantera\Transito\Cliente\Dominio\ClienteId;
use Cantera\Transito\Cliente\Dominio\ClienteNoExiste;
use Cantera\Transito\Cliente\Dominio\IClienteRepository;

class EliminarClienteService
{

    private IClienteRepository $repository;

    public function __construct(IClienteRepository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke(string $id): void
    {
        $id = new ClienteId($id);
        $cliente = $this->repository->search($id);
        if ($cliente == null)
            throw new ClienteNoExiste($id);

        $this->repository->delete($id);
    }

}
