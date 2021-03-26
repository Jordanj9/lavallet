<?php

namespace App\Http\Controllers\Vehiculo;

use App\Http\Controllers\Controller;
use Cantera\Transito\Vehiculo\Aplicacion\GuardarVehiculoService;
use Cantera\Transito\Vehiculo\Aplicacion\VehiculoRequest;
use Cantera\Transito\Vehiculo\Dominio\VehiculoDuplicado;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class VehiculoPostController extends Controller
{

    private GuardarVehiculoService $service;

    /**
     * VehiculoPostController constructor.
     * @param GuardarVehiculoService $service
     */
    public function __construct(GuardarVehiculoService $service)
    {
        $this->service = $service;
    }

    public function __invoke(Request $request)
    {
        $vehiculoRequest = $this->fromRequest($request);
        try {
            $this->service->__invoke($vehiculoRequest);
            return response()->json(['data' => '', 'mensaje' => 'Vehiculo guardado correctamente.'], Response::HTTP_CREATED);
        } catch (VehiculoDuplicado $exception) {
            return response()->json(['data' => null, 'mensaje' => $exception->errorCode()], Response::HTTP_BAD_REQUEST);
        }
    }

    private function fromRequest(Request $request): VehiculoRequest
    {
        $id = $request->id;
        $placa = $request->placa;
        $tipo = $request->tipo;
        $capacidad = $request->capacidad;
        $conductor_id = $request->conductor_id;
        return new VehiculoRequest($id, $placa, $tipo, $capacidad, $conductor_id);
    }
}
