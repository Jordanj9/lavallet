<?php

namespace Cantera\Transito\Conductor\Aplicacion;

use Cantera\Transito\Conductor\Dominio\Conductor;
use Cantera\Transito\Conductor\Dominio\ConductorDuplicado;
use Cantera\Transito\Conductor\Dominio\ConductorId;
use Cantera\Transito\Conductor\Dominio\ConductorIdentificacion;
use Cantera\Transito\Conductor\Dominio\ConductorNoExiste;
use Cantera\Transito\Conductor\Dominio\ConductorNombre;
use Cantera\Transito\Conductor\Dominio\CondutorTelefono;
use Cantera\Transito\Conductor\Dominio\IConductorRepository;

class ModificarConductorService
{
    private IConductorRepository $repository;


    public function __construct(IConductorRepository $repository)
    {
        $this->repository = $repository;
    }


    public function __invoke(ConductorRequest $request): void
    {
        $identificacion = new ConductorIdentificacion($request->getIdentificacion());
        $conductor = $this->repository->findByIdentificacion($identificacion);

        if ($conductor && $conductor->getId()->value() != $request->getId())
            throw new ConductorDuplicado(new ConductorIdentificacion($request->getIdentificacion()));

        $conductor = new Conductor(new ConductorId($request->getId()), $identificacion, new ConductorNombre($request->getNombre()), new CondutorTelefono($request->getTelefono()));
        $this->repository->updated($conductor);
    }


}
