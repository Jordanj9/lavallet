<?php


namespace Cantera\Transito\Vehiculo\Aplicacion;


class VehiculoRequest
{

    private $id;
    private $placa;
    private $tipo;
    private $capacidad;
    private $conductor_id;

    public function __construct(string $id, string $placa, string $tipo, int $capacidad, string $conductor_id)
    {
        $this->id = $id;
        $this->placa = strtoupper($placa);
        $this->tipo = strtoupper($tipo);
        $this->capacidad = $capacidad;
        $this->conductor_id = $conductor_id;
    }

    /**
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
    }

    public function getPlaca(): string
    {
        return $this->placa;
    }

    public function getTipo(): string
    {
        return $this->tipo;
    }

    public function getCapacidad(): int
    {
        return $this->capacidad;
    }

    public function getConductorId(): string
    {
        return $this->conductor_id;
    }
}
