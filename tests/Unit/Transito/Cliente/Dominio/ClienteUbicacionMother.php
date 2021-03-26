<?php

namespace Tests\Unit\Transito\Cliente\Dominio;


use Cantera\Transito\Cliente\Dominio\ClienteUbicacion;
use Tests\Unit\Transito\Shared\Domain\MotherCreator;
use Tests\Unit\Transito\Shared\Domain\WordMother;

final class ClienteUbicacionMother
{

    public static function create(string $municipio,string $departamento,string $direccion) : ClienteUbicacion{
        return new ClienteUbicacion($municipio,$departamento,$direccion);
    }

    public static function random() : ClienteUbicacion{
        return self::create(
            WordMother::random(),
            WordMother::random(),
            MotherCreator::random()->address
        );
    }
}
