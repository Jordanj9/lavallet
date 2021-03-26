<?php


namespace Tests\Unit\Transito\Vehiculo\Dominio;


use Cantera\Transito\Vehiculo\Dominio\VehiculoId;
use Tests\Unit\Transito\Shared\Domain\MotherCreator;

class VehiculoIdMother
{

    public static function create(string $id): VehiculoId
    {
        return new VehiculoId($id);
    }

    public static function random(): VehiculoId
    {
        return self::create(MotherCreator::random()->uuid);
    }
}
