<?php

namespace App\Http\Controllers\Material;

use App\Http\Controllers\Controller;
use Cantera\Transito\Material\Aplicacion\EliminarMaterialService;
use Cantera\Transito\Material\Dominio\MaterialAsociado;
use Cantera\Transito\Material\Dominio\MaterialNoExiste;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class MaterialDeleteController extends Controller
{
    private EliminarMaterialService $service;

    /**
     * MaterialDeleteController constructor.
     * @param EliminarMaterialService $service
     */
    public function __construct(EliminarMaterialService $service)
    {
        $this->service = $service;
    }


    public function __invoke(string $id)
    {
        try {
            $this->service->__invoke($id);
            return response()->json(['data' => '', 'mensaje' => 'Material eliminado correctamente.'], Response::HTTP_OK);
        } catch (MaterialNoExiste | MaterialAsociado $exception) {
            return response()->json(['data' => null, 'mensaje' => $exception->errorMessage()], Response::HTTP_NOT_FOUND);
        }
    }
}
