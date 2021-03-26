<?php

namespace App\Http\Controllers\Conductor;

use App\Http\Controllers\Controller;
use Cantera\Transito\Conductor\Aplicacion\EliminarConductorService;
use Cantera\Transito\Conductor\Dominio\ConductorAsociado;
use Cantera\Transito\Conductor\Dominio\ConductorNoExiste;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ConductorDeleteController extends Controller
{
    private EliminarConductorService $service;

    public function __construct(EliminarConductorService $service)
    {
        $this->service = $service;
    }

    public function __invoke(string $id)
    {
        try {
            $this->service->__invoke($id);
            return response()->json(['data' => '', 'mensaje' => 'El Conductor fue eliminado correctamente.'], Response::HTTP_OK);
        } catch (ConductorNoExiste | ConductorAsociado $exception) {
            return response()->json(['data' => null, 'mensaje' => $exception->errorMessage()], Response::HTTP_OK);
        }
    }

}
