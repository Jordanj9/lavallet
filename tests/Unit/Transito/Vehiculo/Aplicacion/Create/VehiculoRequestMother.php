<?php


namespace Tests\Unit\Transito\Vehiculo\Aplicacion\Create;

use Cantera\Transito\Vehiculo\Aplicacion\VehiculoRequest;
use Tests\Unit\Transito\Shared\Domain\IntegerMother;
use Tests\Unit\Transito\Shared\Domain\MotherCreator;
use Tests\Unit\Transito\Shared\Domain\WordMother;

class VehiculoRequestMother
{
    public static function create(string $id, string $placa, string $tipo, int $capacidad, string $conductor_id): VehiculoRequest
    {
        return new VehiculoRequest($id, $placa, $tipo, $capacidad, $conductor_id);
    }

    public static function random(): VehiculoRequest
    {
        return self::create(
            MotherCreator::random()->uuid,
            WordMother::random(),
            WordMother::random(),
            IntegerMother::random(),
            MotherCreator::random()->uuid
        );
    }

}
