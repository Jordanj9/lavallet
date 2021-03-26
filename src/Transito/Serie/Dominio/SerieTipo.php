<?php

namespace Cantera\Transito\Serie\Dominio;

use Cantera\Transito\Shared\Dominio\ValueObject\Enum;
use InvalidArgumentException;

final class SerieTipo extends Enum
{

    private const CONTRATO = 'CONTRATO';
    private const TICKET = 'TICKET';
    private const VALET = 'VALET';

    protected function throwExceptionForInvalidValue($value) : void
    {
        throw new InvalidArgumentException(sprintf('The type selected <%s> is invalid', $value));
    }
}
