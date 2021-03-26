<?php


namespace Cantera\Transito\Conductor\Dominio;


use Cantera\Transito\Shared\Dominio\DomainError;

class ConductorAsociado extends DomainError
{
    private ConductorNombre $nombre;

    /**
     * ConductorAsociado constructor.
     * @param ConductorNombre $nombre
     */
    public function __construct(ConductorNombre $nombre)
    {
        $this->nombre = $nombre;
    }


    public function errorCode(): string
    {
        return "el_conductor_tiene_vehiculos_asociados_error.";
    }

    public function errorMessage(): string
    {
        return sprintf('El conductor %s no se puede eliminar porque tiene vehiculos asociados.', $this->nombre->value());
    }
}
