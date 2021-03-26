<?php

namespace Tests\Unit\Transito\Serie\Dominio;

use Cantera\Transito\Serie\Dominio\Serie;
use Cantera\Transito\Serie\Dominio\SerieActual;
use Cantera\Transito\Serie\Dominio\SerieId;
use Cantera\Transito\Serie\Dominio\SeriePrefijo;
use Cantera\Transito\Serie\Dominio\SerieTipo;

final class SerieMother
{
    public static function create(SerieId $id, SeriePrefijo $prefijo, SerieActual $actual, SerieTipo $tipo): Serie
    {
        return new Serie($id, $prefijo, $actual, $tipo);
    }

    public static function random(): Serie
    {
        return self::create(
            SerieIdMother::random(),
            SeriePrefijoMother::random(),
            SerieActualMother::random(),
            SerieTipoMother::random()
        );
    }

    public static function contrato(): Serie
    {
        return self::create(
            SerieIdMother::random(),
            SeriePrefijoMother::random(),
            SerieActualMother::random(),
            SerieTipoMother::contrato()
        );
    }
}
