<?php

namespace App\Http\Controllers\Vehiculo;

use App\Http\Controllers\Controller;
use Cantera\Transito\Vehiculo\Aplicacion\EliminarVehiculoService;
use Cantera\Transito\Vehiculo\Dominio\VehiculoAsociado;
use Cantera\Transito\Vehiculo\Dominio\VehiculoNoExiste;
use Illuminate\Http\Response;

class VehiculoDeleteController extends Controller
{

    private EliminarVehiculoService $service;

    /**
     * VehiculoDeleteController constructor.
     * @param EliminarVehiculoService $service
     */
    public function __construct(EliminarVehiculoService $service)
    {
        $this->service = $service;
    }


    public function __invoke(string $id)
    {
        try {
            $this->service->__invoke($id);
            return response()->json(['data' => '', 'mensaje' => 'El Vehiculo fue eliminado correctamente.'], Response::HTTP_OK);
        } catch (VehiculoNoExiste | VehiculoAsociado $exception) {
            return response()->json(['data' => null, 'mensaje' => $exception->errorCode()], Response::HTTP_BAD_REQUEST);
        }

    }
}
