<?php


namespace Cantera\Transito\Material\Dominio;


use Cantera\Transito\Shared\Dominio\DomainError;

class MaterialNoExiste extends DomainError
{
    private MaterialId $id;

    /**
     * MaterialNoExiste constructor.
     * @param MaterialId $id
     */
    public function __construct(MaterialId $id)
    {
        $this->id = $id;
    }


    public function errorCode(): string
    {
        return 'cliente_no_existe';
    }

    public function errorMessage(): string
    {
        return sprintf('El material %s no existe', $this->id->value());
    }
}
