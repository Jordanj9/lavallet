<?php

namespace App\Http\Controllers\Conductor;

use App\Http\Controllers\Controller;
use Cantera\Transito\Conductor\Aplicacion\BuscarConductorRequest;
use Cantera\Transito\Conductor\Aplicacion\BuscarConductorService;
use Cantera\Transito\Conductor\Dominio\ConductorNoExiste;
use Illuminate\Http\Response;

class ConductorGetController extends Controller
{

    private BuscarConductorService $service;

    /**
     * ConductorGetController constructor.
     * @param BuscarConductorService $service
     */
    public function __construct(BuscarConductorService $service)
    {
        $this->service = $service;
    }


    public function __invoke(string $id)
    {
        try {
            $request = new BuscarConductorRequest($id);
            $response = $this->service->__invoke($request);
            return response()->json(['data' => $response == null ? $response : $response->toArray(), 'mensaje' => 'Datos encontrados'], Response::HTTP_OK);
        } catch (ConductorNoExiste $exception) {
            return response()->json(['data' => null, 'mensaje' => $exception->getMessage()], Response::HTTP_NOT_FOUND);
        }
    }
}
