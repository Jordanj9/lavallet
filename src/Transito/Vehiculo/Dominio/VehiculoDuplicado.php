<?php


namespace Cantera\Transito\Vehiculo\Dominio;


use Cantera\Transito\Shared\Dominio\DomainError;

class VehiculoDuplicado extends DomainError
{
    private VehiculoPlaca $placa;

    /**
     * VehiculoDuplicado constructor.
     * @param VehiculoPlaca $placa
     */
    public function __construct(VehiculoPlaca $placa)
    {
        $this->placa = $placa;
        parent::__construct();
    }


    public function errorCode(): string
    {
        return 'vehiculo_duplicado';
    }

    protected function errorMessage(): string
    {
        return sprintf('El vehiculo con la placa <%s> ya se encuentra registrado', $this->placa->value());
    }
}
