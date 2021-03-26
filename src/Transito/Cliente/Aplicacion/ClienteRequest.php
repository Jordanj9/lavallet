<?php


namespace Cantera\Transito\Cliente\Aplicacion;


class ClienteRequest
{
    private $id;
    private $identificacion;
    private $nombre;
    private $municipio;
    private $departamento;
    private $direccion;
    private $telefono;
    private $tipo;
    private $correo;

    public function __construct(string $id, string $identificacion, string $nombre, string $municipio, string $departamento, string $direccion, string $telefono, string $tipo,string $correo)
    {
        $this->id = $id;
        $this->identificacion = $identificacion;
        $this->nombre = strtoupper($nombre);
        $this->municipio = strtoupper($municipio);
        $this->departamento = strtoupper($departamento);
        $this->direccion = strtoupper($direccion);
        $this->telefono = strval($telefono);
        $this->tipo = strtoupper($tipo);
        $this->correo = $correo;
    }

    public function id(): string
    {
        return $this->id;
    }

    public function identificacion(): string
    {
        return $this->identificacion;
    }

    public function nombre(): string
    {
        return $this->nombre;
    }

    public function municipio(): string
    {
        return $this->municipio;
    }

    public function departamento(): string
    {
        return $this->departamento;
    }

    public function direccion(): string
    {
        return $this->direccion;
    }

    public function telefono(): string
    {
        return $this->telefono;
    }


    public function tipo(): string
    {
        return $this->tipo;
    }

    /**
     * @return string
     */
    public function getCorreo(): string
    {
        return $this->correo;
    }

}
