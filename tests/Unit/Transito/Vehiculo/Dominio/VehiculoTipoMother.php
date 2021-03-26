<?php


namespace Tests\Unit\Transito\Vehiculo\Dominio;


use Cantera\Transito\Vehiculo\Dominio\VehiculoTipo;
use Tests\Unit\Transito\Shared\Domain\WordMother;

class VehiculoTipoMother
{
    public static function create(string $value): VehiculoTipo
    {
        return new VehiculoTipo($value);
    }

    public static function random(): VehiculoTipo
    {
        return self::create(WordMother::random());
    }

}
