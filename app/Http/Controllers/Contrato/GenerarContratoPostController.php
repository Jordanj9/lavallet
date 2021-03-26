<?php

namespace App\Http\Controllers\Contrato;

use App\Http\Controllers\Controller;
use Cantera\Transito\Contrato\Aplicacion\ContratoRequest;
use Cantera\Transito\Contrato\Aplicacion\GuardarContratoService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class GenerarContratoPostController extends Controller
{

    private GuardarContratoService $service;

    /**
     * GenerarContratoPostController constructor.
     * @param GuardarContratoService $service
     */
    public function __construct(GuardarContratoService $service)
    {
        $this->service = $service;
    }

    public function __invoke(Request $request)
    {
        $vehiculos = isset($request->vehiculos);
        $vehiculos = $vehiculos ? $request->vehiculos : [];
        $request = new ContratoRequest($request->id, $request->cliente_id, $request->ubicacion,
            $request->serie, $request->fecha, $request->detalles, $vehiculos);
        try {
            $this->service->__invoke($request);
            return response()->json(['data' => '', 'mensaje' => 'Contrato guardado correctamente'], Response::HTTP_OK);
        } catch (\Exception $exception) {
            return response()->json(['data' => null, 'mensaje' => $exception->getMessage()], Response::HTTP_BAD_REQUEST);
        }

    }


}
