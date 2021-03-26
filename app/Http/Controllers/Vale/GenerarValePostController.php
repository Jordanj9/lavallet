<?php

namespace App\Http\Controllers\Vale;

use App\Http\Controllers\Controller;
use Cantera\Transito\Contrato\Aplicacion\GenerarValeService;
use Cantera\Transito\Contrato\Aplicacion\ValeRequest;
use Cantera\Transito\Contrato\Dominio\BuscarContratoService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class GenerarValePostController extends Controller
{

    private GenerarValeService $service;
    private BuscarContratoService $contratoService;

    /**
     * GenerarValePostController constructor.
     * @param GenerarValeService $service
     * @param BuscarContratoService $contratoService
     */
    public function __construct(GenerarValeService $service, BuscarContratoService $contratoService)
    {
        $this->service = $service;
        $this->contratoService = $contratoService;
    }


    public function __invoke(Request $request)
    {
        $valeResquest = new ValeRequest($request->id, $request->contrato_id, $request->serie, $request->detalle, $request->vehiculo_id, $request->input, isset($request->output) ? $request->output : null);
        try {
            $contrato = $this->contratoService->__invoke($valeResquest->getContratoId());
            $vale = $this->service->__invoke($valeResquest, $contrato);
            return response()->json(['data' => $vale->toArray(), 'mensaje' => 'Vale generado correctamente'], Response::HTTP_OK);
        } catch (\Exception $exception) {
            return response()->json(['data' => null, 'mensaje' => $exception->getMessage()], Response::HTTP_NOT_FOUND);
        }
    }
}
