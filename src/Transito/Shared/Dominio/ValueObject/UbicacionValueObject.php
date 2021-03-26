<?php

namespace Cantera\Transito\Shared\Dominio\ValueObject;

abstract class UbicacionValueObject
{
    private $municipio;
    private $departamento;
    private $direccion;


    public function __construct(string $municipio,string $departamento,string $direccion)
    {
        $this->municipio = $municipio;
        $this->departamento = $departamento;
        $this->direccion = $direccion;
    }

    public function getMunicipio(): string
    {
        return $this->municipio;
    }

    public function getDepartamento(): string
    {
        return $this->departamento;
    }

    public function getDireccion(): string
    {
        return $this->direccion;
    }

}
