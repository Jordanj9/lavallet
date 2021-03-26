<?php

namespace App\Http\Controllers\Contrato;

use App\Http\Controllers\Controller;
use Cantera\Transito\Contrato\Aplicacion\ConsultarDetallesByContratoService;
use Cantera\Transito\Contrato\Dominio\ContratoId;
use Cantera\Transito\Contrato\Dominio\ContratoInexistente;
use Cantera\Transito\Contrato\Dominio\ContratoSinEspecificaciones;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use function Lambdish\Phunctional\map;

class ConsultarDestallesByContratoGetContoller extends Controller
{
    private ConsultarDetallesByContratoService $service;

    /**
     * ConsultarDestallesByContratoGetContoller constructor.
     * @param ConsultarDetallesByContratoService $service
     */
    public function __construct(ConsultarDetallesByContratoService $service)
    {
        $this->service = $service;
    }

    public function __invoke(string $contrato_id)
    {
        try {
            $detalles = $this->service->__invoke(new ContratoId($contrato_id));
            $data = map(function ($item) use ($contrato_id) {
                return [
                    'material' => $item->getMaterial()->toArray(),
                    'termino' => ['volumen' => $item->getTermino()->getVolumen(), 'tipo' => $item->getTermino()->getTipo()],
                    'transaccion' => $item->getTransaccion()->value(), 'contrato_id' => $contrato_id
                ];
            }, $detalles[0]);
            if (count($data) > 0) {
                return response()->json(['data' => $data, 'mensaje' => 'Datos encontrados'], Response::HTTP_OK);
            } else {
                return response()->json(['data' => '', 'mensaje' => 'No hay registros.'], Response::HTTP_OK);
            }
        } catch (ContratoSinEspecificaciones | ContratoInexistente $exception) {
            return response()->json(['data' => null, 'mensaje' => $exception->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }


}
