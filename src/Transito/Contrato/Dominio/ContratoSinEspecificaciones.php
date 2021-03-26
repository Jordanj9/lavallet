<?php


namespace Cantera\Transito\Contrato\Dominio;


use Cantera\Transito\Shared\Dominio\DomainError;

class ContratoSinEspecificaciones extends  DomainError
{


    public function __construct()
    {
    }

    public function errorCode(): string
    {
       return 'contrato_sin_especifaciones';
    }

    protected function errorMessage(): string
    {
       return 'Al contrato no se le han definido detalles.';
    }
}
