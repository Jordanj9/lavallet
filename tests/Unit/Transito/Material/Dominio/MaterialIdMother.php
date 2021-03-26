<?php


namespace Tests\Unit\Transito\Material\Dominio;


use Cantera\Transito\Material\Dominio\MaterialId;
use Tests\Unit\Transito\Shared\Domain\MotherCreator;

class MaterialIdMother
{

    public static function create(string $id): MaterialId
    {
        return new MaterialId($id);
    }

    public static function random(): MaterialId
    {
        return self::create(
            MotherCreator::random()->uuid
        );
    }
}
