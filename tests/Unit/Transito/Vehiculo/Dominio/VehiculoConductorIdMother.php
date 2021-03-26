<?php

namespace Tests\Unit\Transito\Vehiculo\Dominio;

use Cantera\Transito\Conductor\Dominio\ConductorId;
use Tests\Unit\Transito\Shared\Domain\MotherCreator;

class VehiculoConductorIdMother
{

    public static function create(string $id): ConductorId
    {
        return new ConductorId($id);
    }

    public static function random(): ConductorId
    {
        return self::create(MotherCreator::random()->uuid);
    }
}
