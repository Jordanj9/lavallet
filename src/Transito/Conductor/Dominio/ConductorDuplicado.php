<?php

namespace Cantera\Transito\Conductor\Dominio;

use Cantera\Transito\Shared\Dominio\DomainError;

class ConductorDuplicado extends  DomainError
{

    private ConductorIdentificacion $id;

    public function __construct(ConductorIdentificacion $id)
    {
        $this->id = $id;
        parent::__construct();
    }

    public function errorCode(): string
    {
       return 'conductor_duplicado';
    }

    protected function errorMessage(): string
    {
       return sprintf('El conductor con la  identificación <%s> ya se encuentra registrado.',$this->id->value());
    }
}
