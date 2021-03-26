<?php

namespace App\Http\Controllers\Ticket;

use App\Http\Controllers\Controller;
use Cantera\Transito\Contrato\Aplicacion\GenerarTicketService;
use Cantera\Transito\Contrato\Aplicacion\TicketRequest;
use Cantera\Transito\Contrato\Dominio\BuscarContratoService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class GenerarTicketPostController extends Controller
{
    private GenerarTicketService $service;
    private BuscarContratoService $contratoService;

    /**
     * GenerarTicketPostController constructor.
     * @param GenerarTicketService $service
     * @param BuscarContratoService $contratoService
     */
    public function __construct(GenerarTicketService $service, BuscarContratoService $contratoService)
    {
        $this->service = $service;
        $this->contratoService = $contratoService;
    }


    public function __invoke(Request $request)
    {
        $ticketRequest = new TicketRequest($request->id, $request->contrato_id, $request->detalle, $request->vehiculo_id, $request->input, $request->serie);
        try {
            $contrato = $this->contratoService->__invoke($ticketRequest->getContratoId());
            $this->service->__invoke($ticketRequest, $contrato);
            return response()->json(['data' => '', 'mensaje' => 'Ticket generado correctamente'], Response::HTTP_OK);
        } catch (\Exception $exception) {
            return response()->json(['data' => null, 'mensaje' => $exception->getMessage()], Response::HTTP_NOT_FOUND);
        }
    }


}
