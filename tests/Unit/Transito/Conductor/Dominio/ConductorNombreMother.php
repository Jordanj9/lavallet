<?php


namespace Tests\Unit\Transito\Conductor\Dominio;

use Cantera\Transito\Conductor\Dominio\ConductorNombre;
use Tests\Unit\Transito\Shared\Domain\WordMother;

class ConductorNombreMother
{
    public static function create(string $value): ConductorNombre
    {
        return new ConductorNombre($value);
    }

    public static function random(): ConductorNombre
    {
        return self::create(WordMother::random());
    }
}
