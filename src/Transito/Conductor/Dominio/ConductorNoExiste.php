<?php


namespace Cantera\Transito\Conductor\Dominio;


use Cantera\Transito\Shared\Dominio\DomainError;
use phpDocumentor\Reflection\Types\Parent_;

class ConductorNoExiste extends DomainError
{
    private $id;

    /**
     * ConductorNoExiste constructor.
     * @param $id
     */
    public function __construct($id)
    {
        $this->id = $id;
        parent::__construct();
    }


    public function errorCode(): string
    {
        return 'conductor_no_existe';
    }

    public function errorMessage(): string
    {
        return sprintf('El conductor con el id %s no existe', $this->id->value());
    }
}
