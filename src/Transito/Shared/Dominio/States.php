<?php

namespace Cantera\Transito\Shared\Dominio;

use Cantera\Transito\Shared\Dominio\ValueObject\Enum;

class States extends  Enum
{
    private const OK = 'OK';
    private const NO_FOUND = 'RESOURCE_NO_FOUND';
    private const RESOURCE_DUPLICATED = 'RESOURCE_DUPLICATED';
    private const ERROR = 'ERROR';


    protected function throwExceptionForInvalidValue($value) : void
    {
        throw new \InvalidArgumentException(sprintf('The type selected <%s> is invalid', $value));
    }
}
