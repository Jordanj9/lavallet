<?php

namespace Cantera\Transito\Cliente\Dominio;

class Cliente
{

    private $id;
    private $identificacion;
    private $nombre;
    private $ubicacion;
    private $telefono;
    private $tipo;
    private $correo;

    public function __construct(ClienteId $id, ClienteIdentificacion $identificacion, ClienteNombre $nombre, ClienteTelefono $telefono, ClienteUbicacion $ubicacion, ClienteTipo $tipo, ClienteCorreo $correo)
    {
        $this->id = $id;
        $this->identificacion = $identificacion;
        $this->nombre = $nombre;
        $this->telefono = $telefono;
        $this->ubicacion = $ubicacion;
        $this->tipo = $tipo;
        $this->correo = $correo;
    }


    public function id(): ClienteId
    {
        return $this->id;
    }

    public function nombre(): ClienteNombre
    {
        return $this->nombre;
    }

    public function ubicacion(): ClienteUbicacion
    {
        return $this->ubicacion;
    }

    public function telefono(): ClienteTelefono
    {
        return $this->telefono;
    }

    public function tipo(): ClienteTipo
    {
        return $this->tipo;
    }

    public function identificacion(): CLienteIdentificacion
    {
        return $this->identificacion;
    }

    public function correo(): ClienteCorreo
    {
        return $this->correo;
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id->value(),
            'identificacion' => $this->identificacion()->value(),
            'nombre' => $this->nombre()->value(),
            'telefono' => $this->telefono()->value(),
            'municipio' => $this->ubicacion()->getMunicipio(),
            'departamento' => $this->ubicacion()->getDepartamento(),
            'direccion' => $this->ubicacion()->getDireccion(),
            'tipo' => $this->tipo()->value(),
            'correo' => $this->correo()->value()
        ];
    }

    static function fromArray(array $model): self
    {
        $ubicacion = new ClienteUbicacion($model['municipio'], $model['departamento'], $model['direccion']);
        return new self(
            new ClienteId($model['id']),
            new ClienteIdentificacion($model['identificacion']),
            new ClienteNombre($model['nombre']),
            new ClienteTelefono($model['telefono']),
            $ubicacion,
            new ClienteTipo($model['tipo']),
            new ClienteCorreo($model['correo'])
        );
    }

}
