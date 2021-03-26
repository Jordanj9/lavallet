<?php

declare(strict_types=1);

namespace Tests\Unit\Transito\Serie\Dominio;

use Cantera\Transito\Serie\Dominio\SeriePrefijo;
use Tests\Unit\Transito\Shared\Domain\MotherCreator;

final class SeriePrefijoMother
{
    public static function create(string $prefijo): SeriePrefijo{
        return new SeriePrefijo($prefijo);
    }

    public static function random() :  SeriePrefijo{
        return self::create(
            MotherCreator::random()->word
        );
    }
}
