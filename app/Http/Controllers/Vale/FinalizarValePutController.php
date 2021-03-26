<?php

namespace App\Http\Controllers\Vale;

use App\Http\Controllers\Controller;
use Cantera\Transito\Contrato\Aplicacion\FinalizarValeService;
use Cantera\Transito\Contrato\Dominio\ValeId;
use Cantera\Transito\Contrato\Dominio\ValeInexistente;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class FinalizarValePutController extends Controller
{
    private FinalizarValeService $service;

    /**
     * FinalizarValePutController constructor.
     * @param FinalizarValeService $service
     */
    public function __construct(FinalizarValeService $service)
    {
        $this->service = $service;
    }

    public function __invoke(Request $request, $id)
    {
        try {
            $vale = $this->service->__invoke(new ValeId($id), $request->output);
            return response()->json(['data' => $vale->toArray(), 'mensaje' => 'Vale modificado correctamente'], Response::HTTP_OK);
        } catch (ValeInexistente $exception) {
            return response()->json(['data' => null, 'mensaje' => $exception->errorCode()], Response::HTTP_NOT_FOUND);
        }
    }


}
