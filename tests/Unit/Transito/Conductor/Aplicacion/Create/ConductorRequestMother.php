<?php

namespace tests\Unit\Transito\Conductor\Aplicacion\Create;

use Cantera\Transito\Conductor\Aplicacion\ConductorRequest;
use tests\Unit\Transito\Shared\Domain\MotherCreator;
use tests\Unit\Transito\Shared\Domain\NationalCodeMother;

class ConductorRequestMother
{
    public static function create(string $id,string $identificacion, string $nombre, string $telefono): ConductorRequest
    {
        return new ConductorRequest($id,$identificacion, $nombre, $telefono);
    }

    public static function random(): ConductorRequest
    {
        return self::create(
            MotherCreator::random()->uuid,
            NationalCodeMother::random(),
            MotherCreator::random()->name,
            MotherCreator::random()->e164PhoneNumber
        );
    }

    public static function randomUpdated(): ConductorRequest
    {
        return self::create(
            MotherCreator::random()->uuid,
            NationalCodeMother::random(),
            MotherCreator::random()->name,
            MotherCreator::random()->e164PhoneNumber,
        );
    }
}
