<?php

namespace Cantera\Transito\Conductor\Aplicacion;

use Cantera\Transito\Conductor\Dominio\ConductorIdentificacion;
use Cantera\Transito\Conductor\Dominio\ConductorNoExiste;
use Cantera\Transito\Conductor\Dominio\IConductorRepository;

final class BuscarConductorService
{
    private IConductorRepository $repository;

    public function __construct(IConductorRepository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke(BuscarConductorRequest $request): ?BuscarConductorResponse
    {
        $identificacion = new ConductorIdentificacion($request->getIdentificacion());
        $conductor = $this->repository->findByIdentificacion($identificacion);
        if ($conductor == null)
            throw new ConductorNoExiste($identificacion);
        return BuscarConductorResponse::fromArray($conductor->toArray());
    }
}


