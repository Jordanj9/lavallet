<?php

namespace Cantera\Transito\Cliente\Dominio;

use Cantera\Transito\Shared\Dominio\DomainError;

class ClienteDuplicado extends DomainError
{
    private ClienteIdentificacion $identificacion;

    public function __construct(ClienteIdentificacion $identificacion)
    {
        $this->identificacion = $identificacion;
    }

    public function errorCode(): string
    {
        return  'cliente_duplicado';
    }

    public  function errorMessage(): string
    {
            return  sprintf('El cliente con la identificacion <%s> ya se encuentra registrado',$this->identificacion->value());
    }
}
