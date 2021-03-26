<?php


namespace Cantera\Transito\Vehiculo\Dominio;


use Cantera\Transito\Shared\Dominio\DomainError;

class VehiculoAsociado extends DomainError
{

    private VehiculoPlaca $placa;

    /**
     * VehiculoAsociado constructor.
     * @param VehiculoPlaca $placa
     */
    public function __construct(VehiculoPlaca $placa)
    {
        $this->placa = $placa;
    }

    public function errorCode(): string
    {
        return "el_vehiculo_tiene_contratos_asociados_error.";
    }

    public function errorMessage(): string
    {
        return sprintf('El vehiculo %s no se puede eliminar porque tiene contratos asociados.', $this->placa->value());
    }
}
