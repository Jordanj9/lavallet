<?php

namespace App\Http\Controllers\Conductor;

use App\Http\Controllers\Controller;
use Cantera\Transito\Conductor\Aplicacion\GetConductoresService;
use Cantera\Transito\Shared\Dominio\Utils;
use Illuminate\Http\Response;
use function Lambdish\Phunctional\map;
use Illuminate\Http\Request;

class ConductorAllController extends Controller
{
    private GetConductoresService $service;

    /**
     * ConductorAllController constructor.
     * @param GetConductoresService $service
     */
    public function __construct(GetConductoresService $service)
    {
        $this->service = $service;
    }

    public function __invoke(Request $request)
    {
        $conductores = $this->service->__invoke();

        $length =  count($conductores);

        if(isset($request->limit) && isset($request->offset)){
            $conductores = Utils::take($conductores,$request->limit,$request->offset);
        }else if(isset($request->limit)) {
            $conductores  = Utils::take($conductores,$request->limit);
        }else if(isset($request->offset)){
            $conductores = Utils::take($conductores,10,$request->offset);
        }

        $data = map(function ($item) {
            return [
                'id' => $item->getId()->value(), 'identificacion' => $item->getIdentificacion()->value(),
                'nombre' => $item->getNombre()->value(), 'telefono' => $item->getTelefono()->value()
            ];
        }, $conductores);

        return response()->json([
            'status' => Response::HTTP_OK,
            'mensaje' => $length === 0 ? 'no hay conductores registrados' : 'datos encontrados correctamente',
            'data' => $data,
            'length' => $length
        ],Response::HTTP_OK);

    }

}
