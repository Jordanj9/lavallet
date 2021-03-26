<?php

namespace App\Http\Controllers\Vale;

use App\Http\Controllers\Controller;
use Cantera\Transito\Material\Aplicacion\ReporteMovimientoMaterialService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ReporteByMaterialGetController extends Controller
{
    private ReporteMovimientoMaterialService $service;

    /**
     * ReporteByMaterialGetController constructor.
     * @param ReporteMovimientoMaterialService $service
     */
    public function __construct(ReporteMovimientoMaterialService $service)
    {
        $this->service = $service;
    }

    public function __invoke(string $fechainicio, string $fechafin)
    {
        try {
            $data = $this->service->__invoke($fechainicio, $fechafin);
            return response()->json(['data' => $data, 'mensaje' => 'Datos encontrados'], Response::HTTP_OK);
        } catch (\Exception $exception) {
            return response()->json(['data' => null, 'mensaje' => $exception->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }


}
