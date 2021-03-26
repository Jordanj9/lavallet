<?php

namespace App\Http\Controllers\Contrato;

use App\Http\Controllers\Controller;
use Cantera\Transito\Contrato\Dominio\BuscarContratoService;
use Cantera\Transito\Contrato\Dominio\Contrato;
use Cantera\Transito\Contrato\Dominio\ContratoInexistente;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use function Lambdish\Phunctional\map;

class ContratoByIdGetController extends Controller
{
    private BuscarContratoService $service;

    /**
     * ContratoByIdGetController constructor.
     * @param BuscarContratoService $service
     */
    public function __construct(BuscarContratoService $service)
    {
        $this->service = $service;
    }

    public function __invoke(string $contratoId)
    {
        try {
            $contrato = $this->service->__invoke($contratoId);
            $data = $this->map($contrato);
            return response()->json(['data' => $data, 'mensaje' => 'Datos encontrados'], Response::HTTP_OK);
        } catch (ContratoInexistente $exception) {
            return response()->json(['data' => null, 'mensaje' => $exception->getMessage()], Response::HTTP_BAD_REQUEST);
        }

    }

    static function map(Contrato $contrato): array
    {
        $vehiculos = map(function ($item) {
            return $item->toArray();
        }, $contrato->getVehiculos());

        $tickets = map(function ($item) {
            return $item->toArray();
        }, $contrato->getTickets());

        $vales = map(function ($item) {
            return $item->toArray();
        }, $contrato->getVales());

        $detalles = map(function ($item) {
            return [
                'material' => $item->getMaterial()->toArray(),
                'termino' => ['volumen' => $item->getTermino()->getVolumen(), 'tipo' => $item->getTermino()->getTipo()],
                'transaccion' => $item->getTransaccion()->value()
            ];
        }, $contrato->getDetalles());

        return ['contrato' => $contrato->toArray(), 'serie' => $contrato->getSerie()->toArray(), 'vehiculos' => $vehiculos,
            'detalles' => $detalles, 'tickes' => $tickets, 'vales' => $vales, 'cliente' => $contrato->getCliente()->toArray()];
    }


}
