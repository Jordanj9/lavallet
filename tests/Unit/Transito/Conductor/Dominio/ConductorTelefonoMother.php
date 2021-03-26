<?php


namespace Tests\Unit\Transito\Conductor\Dominio;


use Cantera\Transito\Conductor\Dominio\CondutorTelefono;
use Tests\Unit\Transito\Shared\Domain\MotherCreator;

class ConductorTelefonoMother
{

    public static function create(string $value): CondutorTelefono
    {
        return new CondutorTelefono($value);
    }

    public static function random(): CondutorTelefono
    {
        return self::create(MotherCreator::random()->e164PhoneNumber);
    }
}
