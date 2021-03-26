<?php

namespace App\Http\Controllers\Material;

use App\Http\Controllers\Controller;
use Cantera\Transito\Material\Aplicacion\MaterialRequest;
use Cantera\Transito\Material\Aplicacion\ModificarMaterialService;
use Cantera\Transito\Material\Dominio\MaterialDuplicado;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class MaterialPutController extends Controller
{

    private ModificarMaterialService $service;

    /**
     * MaterialPutController constructor.
     * @param ModificarMaterialService $service
     */
    public function __construct(ModificarMaterialService $service)
    {
        $this->service = $service;
    }

    public function __invoke(Request $request, string $id)
    {
        $materialRequest = new MaterialRequest($id, $request->nombre);
        try {
            $this->service->__invoke($materialRequest);
            return response()->json(['data' => '', 'mensaje' => 'Material modificado correctamente.'], Response::HTTP_OK);
        } catch (MaterialDuplicado $exception) {
            return response()->json(['data' => null, 'mensaje' => $exception->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }
}
