<?php


namespace Cantera\Transito\Contrato\Dominio;


use Cantera\Transito\Shared\Dominio\DomainError;

class ContratoInexistente extends DomainError
{


    /**
     * ContratoInexistente constructor.
     */
    public function __construct()
    {
    }

    public function errorCode(): string
    {
        return 'contrato_no_existe';
    }

    protected function errorMessage(): string
    {
        return 'El contrato no ha sido registrado.';
    }
}
