<?php


namespace Tests\Unit\Transito\Vehiculo\Dominio;


use Cantera\Transito\Vehiculo\Dominio\VehiculoPlaca;
use Tests\Unit\Transito\Shared\Domain\WordMother;

class VehiculoPlacaMother
{
    public static function create(string $value): VehiculoPlaca
    {
        return new VehiculoPlaca($value);
    }

    public static function random(): VehiculoPlaca
    {
        return self::create(WordMother::random());
    }

}
