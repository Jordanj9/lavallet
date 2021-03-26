<?php


namespace Cantera\Transito\Contrato\Dominio;


use Cantera\Transito\Shared\Dominio\DomainError;

class ValeInexistente extends DomainError
{

    /**
     * ValeInexistente constructor.
     */
    public function __construct()
    {
    }

    public function errorCode(): string
    {
        return "vale_no_existe";
    }

    protected function errorMessage(): string
    {
        return "El vale no ha sido generado";
    }

}
