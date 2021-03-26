<?php

namespace Tests\Unit\Transito\Conductor\Dominio;

use Cantera\Transito\Conductor\Dominio\ConductorId;
use Tests\Unit\Transito\Shared\Domain\MotherCreator;

class ConductorIdMother
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
