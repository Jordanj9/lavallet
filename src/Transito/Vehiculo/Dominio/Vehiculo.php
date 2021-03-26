<?php

declare(strict_types=1);

namespace Cantera\Transito\Vehiculo\Dominio;

use Cantera\Transito\Conductor\Dominio\Conductor;
use Cantera\Transito\Conductor\Dominio\ConductorId;

class Vehiculo
{
    private $id;
    private $placa;
    private $capacidad;
    private $tipo;
    private $conductor;
    private $conductor_id;

    public function __construct(VehiculoId $id, VehiculoPlaca $placa, VehiculoCapacidad $capacidad, VehiculoTipo $tipo, ConductorId $conductor_id)
    {
        $this->id = $id;
        $this->placa = $placa;
        $this->capacidad = $capacidad;
        $this->tipo = $tipo;
        $this->conductor_id = $conductor_id;
    }

    public function addConductor(Conductor $conductor): void
    {
        $this->conductor = $conductor;
    }

    /**
     * @return Conductor|null
     */
    public function getConductor(): ?Conductor
    {
        return $this->conductor;
    }

    public function getId(): VehiculoId
    {
        return $this->id;
    }

    public function getPlaca(): VehiculoPlaca
    {
        return $this->placa;
    }

    public function getCapacidad(): VehiculoCapacidad
    {
        return $this->capacidad;
    }

    public function getTipo(): VehiculoTipo
    {
        return $this->tipo;
    }

    /**
     * @return ConductorId
     */
    public function getConductorId(): ConductorId
    {
        return $this->conductor_id;
    }

    /**
     * @return array
     */
    public function toArray(): array
    {
        return [
            'id' => $this->getId()->value(),
            'placa' => $this->getPlaca()->value(),
            'tipo' => $this->getTipo()->value(),
            'capacidad' => $this->getCapacidad()->value(),
            'conductor_id' => $this->getConductorId()->value(),
            'conductor' => $this->getConductor() != null ? $this->getConductor()->toArray() : null
        ];
    }

    /**
     * @param array $model
     * @return static
     */
    static function formtArray(array $model): self
    {
        $vehiculo = new self(new VehiculoId($model['id']), new VehiculoPlaca($model['placa']), new VehiculoCapacidad(intval($model['capacidad'])), new VehiculoTipo($model['tipo']), new ConductorId($model['conductor_id']));
        $vehiculo->addConductor($model['conductormodel']);
        return $vehiculo;
    }

}
