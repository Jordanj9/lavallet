<?php


namespace Tests\Unit\Transito\Material\Dominio;


use Cantera\Transito\Material\Dominio\MaterialNombre;
use Tests\Unit\Transito\Shared\Domain\WordMother;

class MaterialNombreMother
{

    public static function create(string $value): MaterialNombre
    {
        return new MaterialNombre($value);
    }

    public static function random(): MaterialNombre
    {
        return self::create(WordMother::random());
    }
}
