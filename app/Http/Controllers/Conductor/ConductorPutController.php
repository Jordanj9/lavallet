<?php

namespace App\Http\Controllers\Conductor;

use App\Http\Controllers\Controller;
use Cantera\Transito\Conductor\Aplicacion\ConductorRequest;
use Cantera\Transito\Conductor\Aplicacion\ModificarConductorService;
use Cantera\Transito\Conductor\Dominio\ConductorDuplicado;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ConductorPutController extends Controller
{
    private ModificarConductorService $service;


    public function __construct(ModificarConductorService $service)
    {
        $this->service = $service;
    }

    public function __invoke(Request $request, string $id)
    {
        $conductorRequest = new ConductorRequest($id, $request->identificacion, $request->nombre, $request->telefono);
        try {
            $this->service->__invoke($conductorRequest);
            return response()->json(['data' => '', 'mensaje' => 'Conductor modificado correctamente.'], Response::HTTP_OK);
        } catch (ConductorDuplicado $exception) {
            return response()->json(['data' => null, 'mensaje' => $exception->errorCode()], Response::HTTP_BAD_REQUEST);
        }

    }
}
