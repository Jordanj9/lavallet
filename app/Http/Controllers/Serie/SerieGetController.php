<?php

namespace App\Http\Controllers\Serie;

use App\Http\Controllers\Controller;
use Cantera\Transito\Serie\Aplicacion\SerieFindByTypeService;
use Cantera\Transito\Serie\Dominio\SerieDuplicada;
use Cantera\Transito\Serie\Dominio\SerieNoExiste;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class SerieGetController extends Controller
{
    private SerieFindByTypeService $service;

    /**
     * SerieGetController constructor.
     * @param SerieFindByTypeService $service
     */
    public function __construct(SerieFindByTypeService $service)
    {
        $this->service = $service;
    }

    public function __invoke(string $type)
    {
        try {
            $response = $this->service->__invoke($type);
            return response()->json(['data' => $response->toArray(), 'mensaje' => 'Datos encontrados'], Response::HTTP_OK);
        } catch (SerieNoExiste | SerieDuplicada $exception) {
            return response()->json(['data' => null, 'mensaje' => $exception->errorCode()], Response::HTTP_NOT_FOUND);
        }
    }


}
