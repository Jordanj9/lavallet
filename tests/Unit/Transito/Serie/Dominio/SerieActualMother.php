<?php

declare(strict_types=1);

namespace Tests\Unit\Transito\Serie\Dominio;

use Cantera\Transito\Serie\Dominio\SerieActual;
use Tests\Unit\Transito\Shared\Domain\IntegerMother;

final class SerieActualMother
{
        public static function create(int $number ): SerieActual{
            return new SerieActual($number);
        }

        public static function random() :  SerieActual {
            return self::create(
                 IntegerMother::between(0,10000)
            );
        }
}
