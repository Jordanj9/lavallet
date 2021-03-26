<?php


namespace Cantera\Transito\Contrato\Dominio;


use Cantera\Transito\Shared\Dominio\DomainError;

class TicketInexistente extends DomainError
{


    /**
     * TicketInexistente constructor.
     */
    public function __construct()
    {
    }

    public function errorCode(): string
    {
        return "ticket_no_existe";
    }

    protected function errorMessage(): string
    {
        return "El ticket no ha sido generado";
    }
}
