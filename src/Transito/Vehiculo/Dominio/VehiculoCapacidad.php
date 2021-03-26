<?php


namespace Cantera\Transito\Vehiculo\Dominio;

use Cantera\Transito\Shared\Dominio\ValueObject\IntValueObject;

class VehiculoCapacidad extends IntValueObject
{
   public function __construct(int $value)
   {
       $this->ensureIsValidCapacidad($value);
       parent::__construct($value);
   }

    private function ensureIsValidCapacidad(int $value) : void {
        if($value <= 0)
            throw new \InvalidArgumentException(sprintf('<%s> does not allow the value <%s>.', static::class, $value));
    }
}
