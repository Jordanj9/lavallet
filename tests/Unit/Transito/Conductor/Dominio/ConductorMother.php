<?php


namespace Tests\Unit\Transito\Conductor\Dominio;


use Cantera\Transito\Conductor\Aplicacion\ConductorRequest;
use Cantera\Transito\Conductor\Dominio\Conductor;
use Cantera\Transito\Conductor\Dominio\ConductorId;
use Cantera\Transito\Conductor\Dominio\ConductorIdentificacion;
use Cantera\Transito\Conductor\Dominio\ConductorNombre;
use Cantera\Transito\Conductor\Dominio\CondutorTelefono;

class ConductorMother
{

    public static function create(ConductorId $id, ConductorIdentificacion $identificacion, ConductorNombre $nombre, CondutorTelefono $telefono): Conductor
    {
        return new Conductor($id, $identificacion, $nombre, $telefono);
    }

    public static function fromRequest(ConductorRequest $request): Conductor
    {
        return new Conductor(
            new ConductorId($request->getId()),
            new ConductorIdentificacion($request->getIdentificacion()),
            new ConductorNombre($request->getNombre()),
            new CondutorTelefono($request->getTelefono())
        );
    }

    public static function random(): Conductor
    {
        return self::create(
            ConductorIdMother::random(),
            ConductorIdentificacionMother::random(),
            ConductorNombreMother::random(),
            ConductorTelefonoMother::random()
        );
    }
}
