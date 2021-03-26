<?php

declare(strict_types=1);

namespace Cantera\Transito\Material\Dominio;

class Material
{
    private $id;
    private $nombre;

    public function __construct(MaterialId $id, MaterialNombre $nombre)
    {
        $this->id = $id;
        $this->nombre = $nombre;
    }

    public function getId(): MaterialId
    {
        return $this->id;
    }

    public function getNombre(): MaterialNombre
    {
        return $this->nombre;
    }

    public function toArray(): array
    {
        return [
            'id' => $this->getId()->value(),
            'nombre' => $this->getNombre()->value()
        ];
    }

    static function formtArray(array $model): self
    {
        return new self(new MaterialId($model['id']), new MaterialNombre($model['nombre']));
    }

}
