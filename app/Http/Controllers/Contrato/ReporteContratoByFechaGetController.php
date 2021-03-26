<?php

namespace App\Http\Controllers\Contrato;

use App\Http\Controllers\Controller;
use Cantera\Transito\Contrato\Aplicacion\ConsultarValesByContratoFechaService;
use Cantera\Transito\Contrato\Dominio\BuscarContratoService;
use Cantera\Transito\Contrato\Dominio\Contrato;
use Cantera\Transito\Contrato\Dominio\ContratoInexistente;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use function Lambdish\Phunctional\map;

class ReporteContratoByFechaGetController extends Controller
{

    private BuscarContratoService $buscarContrato;
    private ConsultarValesByContratoFechaService $valeService;

    /**
     * ReporteContratoByFechaGetController constructor.
     * @param BuscarContratoService $buscarContrato
     * @param ConsultarValesByContratoFechaService $valeService
     */
    public function __construct(BuscarContratoService $buscarContrato, ConsultarValesByContratoFechaService $valeService)
    {
        $this->buscarContrato = $buscarContrato;
        $this->valeService = $valeService;
    }


    public function __invoke(string $id, string $fecha_inicio, string $fecha_fin)
    {
        try {
            $contrato = $this->buscarContrato->__invoke($id);
            $vales = $this->valeService->__invoke($contrato, $fecha_inicio, $fecha_fin);
            $data = $this->map($contrato, $vales);
            $mensaje = count($vales) > 0 ? 'Datos encontrados' : 'El contrato seleccionado no tiene vales para el período seleccionado';
            return response()->json(['data' => $data, 'mensaje' => $mensaje], Response::HTTP_OK);
        } catch (ContratoInexistente $exception) {
            return response()->json(['data' => null, 'mensaje' => $exception->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    private function map(Contrato $contrato, array $vales): array
    {
        $vehiculos = map(function ($item) {
            return $item->toArray();
        }, $contrato->getVehiculos());

        $array = map(function ($item) {
            return $item->toArray();
        }, $vales);

        $detalles = map(function ($item) {
            return [
                'material' => $item->getMaterial()->toArray(),
                'termino' => ['volumen' => $item->getTermino()->getVolumen(), 'tipo' => $item->getTermino()->getTipo()],
                'transaccion' => $item->getTransaccion()->value()
            ];
        }, $contrato->getDetalles());

        return ['contrato' => $contrato->toArray(), 'serie' => $contrato->getSerie()->toArray(), 'vehiculos' => $vehiculos,
            'detalles' => $detalles, 'vales' => $array, 'cliente' => $contrato->getCliente()->toArray()];
    }
}
