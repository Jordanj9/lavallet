<?php


namespace Cantera\Transito\Material\Dominio;


use Cantera\Transito\Shared\Dominio\DomainError;

class MaterialAsociado extends DomainError
{

    private MaterialNombre $nombre;

    /**
     * MaterialAsociado constructor.
     * @param MaterialNombre $nombre
     */
    public function __construct(MaterialNombre $nombre)
    {
        $this->nombre = $nombre;
    }

    public function errorCode(): string
    {
        return "el_material_tiene_contratos_asociados_error.";
    }

    public function errorMessage(): string
    {
        return sprintf('El material %s no se puede eliminar porque tiene contratos asociados.', $this->nombre->value());
    }
}
