<?php

namespace Cantera\Transito\Cliente\Dominio;

use Cantera\Transito\Shared\Dominio\DomainError;

final class ClienteNoExisteConEstaIdentificacion extends DomainError
{

    private $identificacion;

    public function __construct(ClienteIdentificacion $identificacion)
    {
       $this->identificacion = $identificacion;
    }

    public function errorCode(): string
    {
        return 'el cliente no existe con esta identificacion';
    }

    public function errorMessage(): string
    {
        return sprintf('el cliente con la identificacion <%s> no existe', $this->identificacion->value());
    }
}
