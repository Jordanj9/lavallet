<?php

namespace Cantera\Transito\Conductor\Aplicacion;

use Cantera\Transito\Conductor\Dominio\ConductorId;
use Cantera\Transito\Conductor\Dominio\ConductorIdentificacion;
use Cantera\Transito\Conductor\Dominio\ConductorNoExiste;
use Cantera\Transito\Conductor\Dominio\IConductorRepository;
use Cantera\Transito\Shared\Dominio\IUnitOfWork;
use Cantera\Transito\Shared\Dominio\States;
use Exception;

class EliminarConductorService
{
    private IConductorRepository $repository;

    public function __construct(IConductorRepository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke(string $id)
    {
        $id = new ConductorId($id);
        $conductor = $this->repository->search($id);
        if ($conductor == null)
            throw new ConductorNoExiste($id);

        $this->repository->delete($id);
    }

}
