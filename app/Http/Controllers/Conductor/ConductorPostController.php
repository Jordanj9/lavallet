<?php

namespace App\Http\Controllers\Conductor;

use App\Http\Controllers\Controller;
use Cantera\Transito\Conductor\Aplicacion\ConductorRequest;
use Cantera\Transito\Conductor\Aplicacion\GuardarConductorService;
use Cantera\Transito\Conductor\Dominio\ConductorDuplicado;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ConductorPostController extends Controller
{

    private GuardarConductorService $service;

    public function __construct(GuardarConductorService $service)
    {
        $this->service = $service;
    }

    public function __invoke(Request $request)
    {
        $request = new ConductorRequest($request->id, $request->identificacion, $request->nombre, $request->telefono);
        try {
            $this->service->__invoke($request);
            return response()->json(['data' => '', 'mensaje' => 'Conductor guardado correctamente.'], Response::HTTP_CREATED);
        } catch (ConductorDuplicado $exception) {
            return response()->json(['data' => null, 'mensaje' => $exception->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }
}
