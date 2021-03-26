<?php


namespace Cantera\Transito\Contrato\Dominio;

use DomainException;
use Throwable;

class TipoTransaccionExeption extends DomainException
{
    public function __construct($message = "", $code = 0, Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}
