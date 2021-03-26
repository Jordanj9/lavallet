<?php


namespace Cantera\Transito\Vehiculo\Dominio;


use Cantera\Transito\Shared\Dominio\DomainError;

class VehiculoNoExiste extends DomainError
{
    private $id;


    public function __construct($id)
    {
        $this->id = $id;
        parent::__construct();
    }


    protected function errorMessage(): string
    {
        return 'vehiculo_no_existe';
    }

    public function errorCode(): string
    {
        return sprintf('El vehiculo con el id %s no se encuentra registrado', $this->id->value());
    }
}
