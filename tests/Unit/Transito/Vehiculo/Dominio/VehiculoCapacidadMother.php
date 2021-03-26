<?php


namespace Tests\Unit\Transito\Vehiculo\Dominio;


use Cantera\Transito\Vehiculo\Dominio\VehiculoCapacidad;
use Tests\Unit\Transito\Shared\Domain\IntegerMother;

class VehiculoCapacidadMother
{
    public static function create(int $value): VehiculoCapacidad
    {
        return new VehiculoCapacidad($value);
    }

    public static function random(): VehiculoCapacidad
    {
        return self::create(IntegerMother::random());
    }
}
