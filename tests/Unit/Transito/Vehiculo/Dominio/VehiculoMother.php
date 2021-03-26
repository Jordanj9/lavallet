<?php

namespace Tests\Unit\Transito\Vehiculo\Dominio;

use Cantera\Transito\Conductor\Dominio\ConductorId;
use Cantera\Transito\Vehiculo\Aplicacion\VehiculoRequest;
use Cantera\Transito\Vehiculo\Dominio\Vehiculo;
use Cantera\Transito\Vehiculo\Dominio\VehiculoCapacidad;
use Cantera\Transito\Vehiculo\Dominio\VehiculoId;
use Cantera\Transito\Vehiculo\Dominio\VehiculoPlaca;
use Cantera\Transito\Vehiculo\Dominio\VehiculoTipo;
use Tests\Unit\Transito\Conductor\Dominio\ConductorIdMother;

class VehiculoMother
{
    public static function create(VehiculoId $id, VehiculoPlaca $placa, VehiculoCapacidad $capacidad, VehiculoTipo $tipo, ConductorId $conductor_id): Vehiculo
    {
        return new Vehiculo($id, $placa, $capacidad, $tipo, $conductor_id);
    }

    public static function fromRequest(VehiculoRequest $request): Vehiculo
    {
        return new Vehiculo(
            new VehiculoId($request->getId()),
            new VehiculoPlaca($request->getPlaca()),
            new VehiculoCapacidad($request->getCapacidad()),
            new VehiculoTipo($request->getTipo()),
            new ConductorId($request->getConductorId())
        );
    }


    public static function random(): Vehiculo
    {
        return self::create(
            VehiculoIdMother::random(),
            VehiculoPlacaMother::random(),
            VehiculoCapacidadMother::random(),
            VehiculoTipoMother::random(),
            ConductorIdMother::random()
        );
    }

}
