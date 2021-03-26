<?php

namespace Cantera\Transito\Cliente\Dominio;

use Cantera\Transito\Shared\Dominio\DomainError;

class ClienteNoExiste extends DomainError
{
    private ClienteId $id;

    public function __construct(ClienteId $id)
    {
        $this->id = $id;
        parent::__construct();
    }

    public function errorCode(): string
    {
        return  'cliente_no_existe';
    }

    public function errorMessage(): string
    {
        return  sprintf('El cliente con la identificacion %s no existe',$this->id->value());
    }
}
