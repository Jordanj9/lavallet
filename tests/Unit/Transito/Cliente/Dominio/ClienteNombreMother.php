<?php

namespace Tests\Unit\Transito\Cliente\Dominio;

use Cantera\Transito\Cliente\Dominio\ClienteNombre;
use Tests\Unit\Transito\Shared\Domain\WordMother;

class ClienteNombreMother
{

    public static function create(string $value) : ClienteNombre{
        return new ClienteNombre($value);
    }

    public static function random() : ClienteNombre{
        return self::create(WordMother::random());
    }
}
