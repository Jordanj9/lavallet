<?php

namespace Tests\Unit\Transito\Serie\Dominio;


use Cantera\Transito\Serie\Dominio\SerieTipo;
use Tests\Unit\Transito\Shared\Domain\RandomElementPicker;

final class SerieTipoMother
{
    public static function create(string $number ): SerieTipo{
        return new SerieTipo($number);
    }

    public static function random() :  SerieTipo{
        return self::create(
            RandomElementPicker::from('VALET','CONTRATO','TICKET')
        );
    }

    public static function contrato() : SerieTipo {
        return new SerieTipo('CONTRATO');
    }
}
