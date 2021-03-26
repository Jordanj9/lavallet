<?php

namespace App\Http\Controllers\Material;

use App\Http\Controllers\Controller;
use Cantera\Transito\Material\Aplicacion\GuardarMaterialService;
use Cantera\Transito\Material\Aplicacion\MaterialRequest;
use Cantera\Transito\Material\Dominio\MaterialDuplicado;
use Illuminate\Http\Request;
use Illuminate\Http\Response;


class MaterialPostController extends Controller
{
    private GuardarMaterialService $service;

    /**
     * MaterialPostController constructor.
     * @param GuardarMaterialService $service
     */
    public function __construct(GuardarMaterialService $service)
    {
        $this->service = $service;
    }

    public function __invoke(Request $request)
    {
        $Materialrequest = new MaterialRequest($request->id, $request->nombre);
        try {
            $this->service->__invoke($Materialrequest);
            return response()->json(['data' => '', 'mensaje' => 'Material guardado correctamente.'], Response::HTTP_CREATED);
        } catch (MaterialDuplicado $exception) {
            return response()->json(['data' => null, 'mensaje' => $exception->getMessage()], Response::HTTP_OK);
        }
    }
}
