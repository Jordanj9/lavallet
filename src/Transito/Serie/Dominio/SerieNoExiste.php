<?php


namespace Cantera\Transito\Serie\Dominio;


use Cantera\Transito\Shared\Dominio\DomainError;

class SerieNoExiste extends DomainError
{
    private $type;


    public function __construct($type)
    {
        $this->type = $type;
        parent::__construct();
    }


    public function errorCode(): string
    {
        return 'Serie_no_existe';
    }

    protected function errorMessage(): string
    {
        return sprintf('La Serie con el tipo %s no existe', $this->type->value());
    }
}
