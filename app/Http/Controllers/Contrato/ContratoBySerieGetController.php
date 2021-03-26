<?php

namespace App\Http\Controllers\Contrato;

use App\Http\Controllers\Controller;
use Cantera\Transito\Contrato\Aplicacion\ConsultarContratoBySerieService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use function Lambdish\Phunctional\map;

class ContratoBySerieGetController extends Controller
{
    private ConsultarContratoBySerieService $service;

    /**
     * ContratoBySerieGetController constructor.
     * @param ConsultarContratoBySerieService $service
     */
    public function __construct(ConsultarContratoBySerieService $service)
    {
        $this->service = $service;
    }

    public function __invoke(string $serie)
    {
        try {

            $contratos = $this->service->__invoke($serie);
            $data = map(function ($item) {
                return [
                    $item->toArray(),
                ];
            }, $contratos);
            $mensaje = count($data) > 0 ? 'Datos encontrados' : 'No hay coincidencias';
            return response()->json(['data' => $data, 'mensaje' => $mensaje], Response::HTTP_OK);
        } catch (\Exception $exception) {
            return response()->json(['data' => null, 'mensaje' => $exception->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

}
