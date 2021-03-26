<?php

namespace Cantera\Transito\Conductor\Dominio;

class Conductor
{
    private ConductorId $id;
    private ConductorIdentificacion $identificacion;
    private ConductorNombre $nombre;
    private CondutorTelefono $telefono;

    public function __construct(ConductorId $id, ConductorIdentificacion $identificacion, ConductorNombre $nombre, CondutorTelefono $telefono)
    {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->telefono = $telefono;
        $this->identificacion = $identificacion;
    }

    /**
     * @return ConductorId
     */
    public function getId(): ConductorId
    {
        return $this->id;
    }

    public function getIdentificacion(): ConductorIdentificacion
    {
        return $this->identificacion;
    }

    public function getNombre(): ConductorNombre
    {
        return $this->nombre;
    }

    public function getTelefono(): CondutorTelefono
    {
        return $this->telefono;
    }

    public function toArray(): array
    {
        return [
            'id' => $this->getId()->value(),
            'identificacion' => $this->getIdentificacion()->value(),
            'nombre' => $this->getNombre()->value(),
            'telefono' => $this->getTelefono()->value()
        ];
    }

    static function formtArray(array $model): self
    {
        return new self(new ConductorId($model['id']), new ConductorIdentificacion($model['identificacion']), new ConductorNombre($model['nombre']), new CondutorTelefono($model['telefono']));
    }


}
