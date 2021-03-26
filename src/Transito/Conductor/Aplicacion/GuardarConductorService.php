<?php

namespace Cantera\Transito\Conductor\Aplicacion;

use Cantera\Transito\Conductor\Dominio\Conductor;
use Cantera\Transito\Conductor\Dominio\ConductorDuplicado;
use Cantera\Transito\Conductor\Dominio\ConductorId;
use Cantera\Transito\Conductor\Dominio\ConductorIdentificacion;
use Cantera\Transito\Conductor\Dominio\ConductorNombre;
use Cantera\Transito\Conductor\Dominio\CondutorTelefono;
use Cantera\Transito\Conductor\Dominio\IConductorRepository;

class GuardarConductorService
{
    private IConductorRepository $repository;

    public function __construct(IConductorRepository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke(ConductorRequest $request): void
    {
        $conductor = $this->repository->findByIdentificacion(new ConductorIdentificacion($request->getIdentificacion()));

        if ($conductor != null)
            throw new ConductorDuplicado(new ConductorIdentificacion($request->getIdentificacion()));

        $conductor = new Conductor(new ConductorId($request->getId()), new ConductorIdentificacion($request->getIdentificacion()), new ConductorNombre($request->getNombre()), new CondutorTelefono($request->getTelefono()));
        $this->repository->save($conductor);
    }

}
