<?php

namespace Cantera\Transito\Cliente\Aplicacion;

use Cantera\Transito\Cliente\Dominio\Cliente;
use Cantera\Transito\Cliente\Dominio\ClienteCorreo;
use Cantera\Transito\Cliente\Dominio\ClienteDuplicado;
use Cantera\Transito\Cliente\Dominio\ClienteId;
use Cantera\Transito\Cliente\Dominio\ClienteIdentificacion;
use Cantera\Transito\Cliente\Dominio\ClienteNombre;
use Cantera\Transito\Cliente\Dominio\ClienteTelefono;
use Cantera\Transito\Cliente\Dominio\ClienteTipo;
use Cantera\Transito\Cliente\Dominio\ClienteUbicacion;
use Cantera\Transito\Cliente\Dominio\IClienteRepository;

class GuardarClienteService
{

    private IClienteRepository $repository;

    public function __construct(IClienteRepository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke(ClienteRequest $request)
    {

        $identificacion = new ClienteIdentificacion($request->identificacion());
        $cliente = $this->repository->findByIdentificacion($identificacion);

        if ($cliente != null)
            throw new ClienteDuplicado($identificacion);

        $id = new ClienteId($request->id());
        $nombre = new ClienteNombre($request->nombre());
        $telefono = new ClienteTelefono($request->telefono());
        $ubicacion = new ClienteUbicacion($request->municipio(), $request->departamento(), $request->direccion());
        $tipo = new ClienteTipo($request->tipo());
        $correo = new ClienteCorreo($request->getCorreo());
        $cliente = new Cliente($id, $identificacion, $nombre, $telefono, $ubicacion, $tipo, $correo);
        $this->repository->save($cliente);
    }
}
