<?php


namespace Cantera\Transito\Serie\Dominio;


use Cantera\Transito\Shared\Dominio\DomainError;

class SerieDuplicada extends DomainError
{

    private SerieTipo $type;

    /**
     * SerieDuplicada constructor.
     * @param SerieTipo $type
     */
    public function __construct(SerieTipo $type)
    {
        $this->type = $type;
        parent::__construct();
    }


    protected function errorMessage(): string
    {
        return 'serie_duplicada';
    }

    public function errorCode(): string
    {
        return sprintf('La Serie con el tipo %s ya existe', $this->type->value());
    }
}
