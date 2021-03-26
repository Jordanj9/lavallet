<?php


namespace Tests\Unit\Transito\Cliente\Dominio;


use Cantera\Transito\Cliente\Dominio\ClienteCorreo;
use Tests\Unit\Transito\Shared\Domain\MotherCreator;

class ClienteCorreoMother
{

    public static function create(string $value): ClienteCorreo
    {
        return new ClienteCorreo($value);
    }

    public static function random(): ClienteCorreo
    {
        return self::create(MotherCreator::random()->email);
    }
}
