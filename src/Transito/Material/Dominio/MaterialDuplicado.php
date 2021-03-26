<?php


namespace Cantera\Transito\Material\Dominio;


use Cantera\Transito\Shared\Dominio\DomainError;

class MaterialDuplicado extends DomainError
{
    private MaterialNombre $nombre;

    /**
     * MaterialDuplicado constructor.
     * @param MaterialNombre $nombre
     */
    public function __construct(MaterialNombre $nombre)
    {
        $this->nombre = $nombre;
    }


    public function errorCode(): string
    {
        return  'material_duplicado';
    }

    public function errorMessage(): string
    {
        return  sprintf('El material con el nombre %s ya se encuentra registrado',$this->nombre->value());
    }
}
