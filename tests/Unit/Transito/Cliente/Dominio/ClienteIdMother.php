<?php


namespace Tests\Unit\Transito\Cliente\Dominio;


use Cantera\Transito\Cliente\Dominio\ClienteId;
use Tests\Unit\Transito\Shared\Domain\MotherCreator;

final class ClienteIdMother
{
   public static function create(string $id) : ClienteId {
      return new ClienteId($id);
   }

   public static function random() : ClienteId {
       return self::create(
         MotherCreator::random()->uuid
       );
   }
}
