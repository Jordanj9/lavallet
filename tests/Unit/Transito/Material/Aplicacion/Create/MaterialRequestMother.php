<?php


namespace tests\Unit\Transito\Material\Aplicacion\Create;


use Cantera\Transito\Material\Aplicacion\MaterialRequest;
use tests\Unit\Transito\Shared\Domain\MotherCreator;

class MaterialRequestMother
{
    public static function create(string $id, string $nombre)
    {
        return new MaterialRequest($id, $nombre);
    }

    public static function random(): MaterialRequest
    {
        return self::create(
            MotherCreator::random()->uuid,
            MotherCreator::random()->name
        );
    }
}
