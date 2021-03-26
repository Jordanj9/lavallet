<?php

namespace Tests\Unit\Transito\Cliente\Dominio;

use Cantera\Transito\Cliente\Aplicacion\ClienteRequest;
use Cantera\Transito\Cliente\Dominio\Cliente;
use Cantera\Transito\Cliente\Dominio\ClienteCorreo;
use Cantera\Transito\Cliente\Dominio\ClienteId;
use Cantera\Transito\Cliente\Dominio\ClienteIdentificacion;
use Cantera\Transito\Cliente\Dominio\ClienteNombre;
use Cantera\Transito\Cliente\Dominio\ClienteTelefono;
use Cantera\Transito\Cliente\Dominio\ClienteTipo;
use Cantera\Transito\Cliente\Dominio\ClienteUbicacion;

final class ClienteMother
{
    public static function create(ClienteId $id, ClienteIdentificacion $identificacion, ClienteNombre $nombre, ClienteTelefono $telefono, ClienteUbicacion $ubicacion, ClienteTipo $clienteTipo, ClienteCorreo $correo): Cliente
    {
        return new Cliente($id, $identificacion, $nombre, $telefono, $ubicacion, $clienteTipo, $correo);
    }

    public static function fromRequest(ClienteRequest $request): Cliente
    {
        return new Cliente(
            new ClienteId($request->id()),
            new ClienteIdentificacion($request->identificacion()),
            new ClienteNombre($request->nombre()),
            new ClienteTelefono($request->telefono()),
            new ClienteUbicacion($request->municipio(), $request->departamento(), $request->direccion()),
            new ClienteTipo($request->tipo()),
            new ClienteCorreo($request->getCorreo())
        );
    }

    public static function random(): Cliente
    {
        return self::create(
            ClienteIdMother::random(),
            ClienteIdentificacionMother::random(),
            ClienteNombreMother::random(),
            ClienteTelefonoMother::random(),
            ClienteUbicacionMother::random(),
            ClienteTipoMother::random(),
            ClienteCorreoMother::random()
        );
    }
}
