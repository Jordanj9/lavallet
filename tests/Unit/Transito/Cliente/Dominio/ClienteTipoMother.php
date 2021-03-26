<?php

namespace Tests\Unit\Transito\Cliente\Dominio;

use Cantera\Transito\Cliente\Dominio\ClienteTipo;
use Tests\Unit\Transito\Shared\Domain\RandomElementPicker;

final class ClienteTipoMother
{

    public static function create(string $value) : ClienteTipo{
        return new ClienteTipo($value);
    }

    public static function random() : ClienteTipo{
        return self::create(RandomElementPicker::from('NATURAL','JURIDICA'));
    }
}
