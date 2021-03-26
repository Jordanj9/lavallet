<?php

namespace App\Http\Controllers\Ticket;

use App\Http\Controllers\Controller;
use Cantera\Transito\Contrato\Aplicacion\FinalizarTicketService;
use Cantera\Transito\Contrato\Aplicacion\GenerarValeService;
use Cantera\Transito\Contrato\Aplicacion\ValeRequest;
use Cantera\Transito\Contrato\Dominio\BuscarContratoService;
use Cantera\Transito\Contrato\Dominio\Ticket;
use Cantera\Transito\Contrato\Dominio\TicketId;
use Cantera\Transito\Contrato\Dominio\TicketInexistente;
use Cantera\Transito\Serie\Aplicacion\SerieFindByTypeService;
use Cantera\Transito\Shared\Dominio\ValueObject\Uuid;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class FinalizarTicketPutController extends Controller
{
    private FinalizarTicketService $service;
    private BuscarContratoService $contratoService;
    private GenerarValeService $valeService;
    private SerieFindByTypeService $serieService;

    /**
     * FinalizarTicketPutController constructor.
     * @param FinalizarTicketService $service
     * @param BuscarContratoService $contratoService
     * @param GenerarValeService $valeService
     * @param SerieFindByTypeService $serieService
     */
    public function __construct(FinalizarTicketService $service, BuscarContratoService $contratoService, GenerarValeService $valeService, SerieFindByTypeService $serieService)
    {
        $this->service = $service;
        $this->contratoService = $contratoService;
        $this->valeService = $valeService;
        $this->serieService = $serieService;
    }


    public function __invoke(Request $request, $id)
    {
        try {
            $contrato = $this->contratoService->__invoke($request->contrato_id);
            $ticket = $contrato->getTickets()->exist(new TicketId($id));
            if ($ticket == null)
                return response()->json('ticket no existe', Response::HTTP_NOT_FOUND);

            $serie = $this->serieService->__invoke('VALET');
            $ticket->setOutput($request->output);
            $valeRequest = ValeRequest::formtArray($contrato, $ticket, $serie->toArray());
            $vale = $this->valeService->__invoke($valeRequest, $contrato);
            $this->service->__invoke($ticket);
            return response()->json(['data' => $vale->toArray(), 'mensaje' => 'Vale generado correctamente'], Response::HTTP_OK);
        } catch (TicketInexistente $exception) {
            return response()->json(['data' => null, 'mensaje' => $exception->errorCode()], Response::HTTP_NOT_FOUND);
        }

    }


}
