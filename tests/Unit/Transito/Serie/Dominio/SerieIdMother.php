<?php


namespace Tests\Unit\Transito\Serie\Dominio;


use Cantera\Transito\Serie\Dominio\SerieId;
use Tests\Unit\Transito\Shared\Domain\MotherCreator;

class SerieIdMother
{
    public static function create(string $id): SerieId
    {
        return new SerieId($id);
    }

    public static function random(): SerieId
    {
        return self::create(
            MotherCreator::random()->uuid
        );
    }
}
