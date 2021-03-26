<?php

namespace Cantera\Transito\Conductor\Aplicacion;

class BuscarConductorResponse
{
    private string $id;
    private string $identificacion;
    private string $nombre;
    private string $telefono;

    public function __construct(string $id, string $identificacion, string $nombre, string $telefono)
    {
        $this->id = $id;
        $this->identificacion = $identificacion;
        $this->nombre = $nombre;
        $this->telefono = $telefono;
    }

    public function getId() : string  {
        return $this->id;
    }

    public function getIdentificacion(): string
    {
        return $this->identificacion;
    }

    public function getNombre(): string
    {
        return $this->nombre;
    }

    public function getTelefono(): string
    {
        return $this->telefono;
    }


    public static function fromArray(array $array) : self {
        return new self(
            $array['id'],
            $array['identificacion'],
            $array['nombre'],
            $array['telefono']
        );
    }

    public function toArray() : array {
        return [
          'id' => $this->id,
          'identificacion' => $this->identificacion,
          'nombre' => $this->nombre,
          'telefono' => $this->telefono
        ];
    }

}

