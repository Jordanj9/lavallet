<?php

namespace Tests\Unit\Transito\Cliente\Dominio;

use Cantera\Transito\Cliente\Dominio\ClienteTelefono;
use Tests\Unit\Transito\Shared\Domain\MotherCreator;

final class ClienteTelefonoMother
{

    public static function create(string $value) : ClienteTelefono{
        return new ClienteTelefono($value);
    }

    public static function random() : ClienteTelefono{
        return self::create(MotherCreator::random()->e164PhoneNumber);
    }
}
