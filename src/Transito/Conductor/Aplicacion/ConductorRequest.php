<?php


namespace Cantera\Transito\Conductor\Aplicacion;


class ConductorRequest
{
    private $id;
    private $identificacion;
    private $nombre;
    private $telefono;

    public function __construct(string $id, string $identificacion, string $nombre, string $telefono)
    {
        $this->id = $id;
        $this->identificacion = strtoupper($identificacion);
        $this->nombre = strtoupper($nombre);
        $this->telefono = strval($telefono);
    }


    /**
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @return string
     */
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

}
