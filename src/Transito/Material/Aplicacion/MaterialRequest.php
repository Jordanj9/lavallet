<?php

namespace Cantera\Transito\Material\Aplicacion;

class MaterialRequest
{
    private string $nombre;
    private string $id;

    public function __construct(string $id, string $nombre)
    {
        $this->nombre =strtoupper($nombre);
        $this->id = $id;
    }

    public function getNombre(): string
    {
        return $this->nombre;
    }

    public function getId(): string
    {
        return $this->id;
    }

}
