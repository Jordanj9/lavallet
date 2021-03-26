<?php

namespace Cantera\Transito\Conductor\Dominio;

use Cantera\Transito\Shared\Dominio\ValueObject\StringValueObject;

class ConductorIdentificacion extends  StringValueObject
{
    public function __construct(string $value)
    {
        parent::__construct($value);
    }
}
