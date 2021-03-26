<?php

namespace App\Http\Controllers\Contrato;

use App\Http\Controllers\Controller;
use Cantera\Transito\Contrato\Aplicacion\ModificarDetallesContratoService;
use Cantera\Transito\Contrato\Dominio\ContratoInexistente;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DetallesContratoPutController extends Controller
{
    private ModificarDetallesContratoService $service;

    /**
     * DetallesContratoPutController constructor.
     * @param ModificarDetallesContratoService $service
     */
    public function __construct(ModificarDetallesContratoService $service)
    {
        $this->service = $service;
    }

    public function __invoke(Request $request)
    {
        try {
            $this->service->__invoke($request->id, $request->detalles, $request->vehiculos);
            return response()->json(['data' => '', 'mensaje' => 'Detalles del contrato modificados correctamente'], Response::HTTP_OK);
        } catch (ContratoInexistente $exception) {
            return response()->json(['data' => null, 'mensaje' => $exception->errorCode()], Response::HTTP_NOT_FOUND);
        }
    }


}
