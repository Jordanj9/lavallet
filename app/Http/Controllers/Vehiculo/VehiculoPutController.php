<?php

namespace App\Http\Controllers\Vehiculo;

use App\Http\Controllers\Controller;
use Cantera\Transito\Vehiculo\Aplicacion\ModificarVehiculoService;
use Cantera\Transito\Vehiculo\Aplicacion\VehiculoRequest;
use Cantera\Transito\Vehiculo\Dominio\VehiculoDuplicado;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class VehiculoPutController extends Controller
{

    private ModificarVehiculoService $service;

    /**
     * VehiculoPutController constructor.
     * @param ModificarVehiculoService $service
     */
    public function __construct(ModificarVehiculoService $service)
    {
        $this->service = $service;
    }


    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke(Request $request, $id)
    {
        $placa = strtoupper($request->placa);
        $tipo = strtoupper($request->tipo);
        $vehiculoRequest = new VehiculoRequest($id, $placa, $tipo, $request->capacidad, $request->conductor_id);
        try {
            $this->service->__invoke($vehiculoRequest);
            return response()->json(['data' => '', 'mensaje' => 'Vehiculo modificado correctamente'], Response::HTTP_OK);
        } catch (VehiculoDuplicado $exception) {
            return response()->json(['data' => null, 'mensaje' => $exception->errorCode()], Response::HTTP_BAD_REQUEST);
        }
    }
}
