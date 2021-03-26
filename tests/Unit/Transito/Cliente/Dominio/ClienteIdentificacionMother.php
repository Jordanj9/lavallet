<?php

namespace Tests\Unit\Transito\Cliente\Dominio;

use Cantera\Transito\Cliente\Dominio\ClienteIdentificacion;
use Tests\Unit\Transito\Shared\Domain\NationalCodeMother;

final class ClienteIdentificacionMother
{
   public static function create(string $value) : ClienteIdentificacion {
       return new ClienteIdentificacion($value);
   }

   public static function random() : ClienteIdentificacion {
       return self::create(NationalCodeMother::random());
   }

}
