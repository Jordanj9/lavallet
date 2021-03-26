<?php

namespace Tests\Unit\Transito\Conductor\Dominio;

use Cantera\Transito\Conductor\Dominio\ConductorIdentificacion;
use Tests\Unit\Transito\Shared\Domain\NationalCodeMother;

class ConductorIdentificacionMother
{
    public static function create(string $value): ConductorIdentificacion
    {
        return new ConductorIdentificacion($value);
    }

    public static function random(): ConductorIdentificacion
    {
        return self::create(NationalCodeMother::random());
    }
}
