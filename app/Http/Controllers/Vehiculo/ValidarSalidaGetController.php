<?php

namespace App\Http\Controllers\Vehiculo;

use App\Http\Controllers\Controller;
use Cantera\Transito\Contrato\Aplicacion\ConsultarDetallesByContratoService;
use Cantera\Transito\Contrato\Dominio\BuscarContratoService;
use Cantera\Transito\Contrato\Dominio\ContratoId;
use Cantera\Transito\Contrato\Dominio\VehiculoSinContratoException;
use Cantera\Transito\Vehiculo\Aplicacion\ConsultarTicketorValeService;
use Cantera\Transito\Vehiculo\Dominio\VehiculoNoExiste;
use Cantera\Transito\Vehiculo\Dominio\VehiculoPlaca;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ValidarSalidaGetController extends Controller
{
    private ConsultarTicketorValeService $service;
    private BuscarContratoService $contratoService;

    /**
     * ValidarSalidaGetController constructor.
     * @param ConsultarTicketorValeService $service
     * @param BuscarContratoService $contratoService
     */
    public function __construct(ConsultarTicketorValeService $service, BuscarContratoService $contratoService)
    {
        $this->service = $service;
        $this->contratoService = $contratoService;
    }


    public function __invoke(string $placa)
    {
        try {
            $data = $this->service->__invoke(new VehiculoPlaca($placa));
            if ($data['contrato_id'] != null) {
                $contrato = $this->contratoService->__invoke(new ContratoId($data['contrato_id']));
                $data['cliente'] = $contrato->getCliente()->toArray();
            } else {
                $data['cliente'] = null;
            }
            return response()->json(['data' => $data, 'mensaje' => 'Datos encontrados'], Response::HTTP_OK);
        } catch (VehiculoSinContratoException | VehiculoNoExiste $exception) {
            return response()->json(['data' => null, 'mensaje' => $exception->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }
}
