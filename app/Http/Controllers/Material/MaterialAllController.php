<?php

namespace App\Http\Controllers\Material;

use App\Http\Controllers\Controller;
use Cantera\Transito\Material\Aplicacion\GetMaterialesService;
use Cantera\Transito\Shared\Dominio\Utils;
use Illuminate\Http\Response;
use function Lambdish\Phunctional\map;
use Illuminate\Http\Request;

class MaterialAllController extends Controller
{
    private GetMaterialesService $service;

    /**
     * MaterialAllController constructor.
     * @param GetMaterialesService $service
     */
    public function __construct(GetMaterialesService $service)
    {
        $this->service = $service;
    }

    public function __invoke(Request $request)
    {
        $materiales = $this->service->__invoke();

        $length =  count($materiales);

        if(isset($request->limit) && isset($request->offset)){
            $materiales = Utils::take($materiales ,$request->limit,$request->offset);
        }else if(isset($request->limit)) {
            $materiales = Utils::take($materiales,$request->limit);
        }else if(isset($request->offset)){
            $materiales = Utils::take($materiales,10,$request->offset);
        }

        $data = map(function ($item) {
            return ['id' => $item->getId()->value(), 'nombre' => $item->getNombre()->value()];
        }, $materiales);

        return response()->json([
            'status' => Response::HTTP_OK,
            'mensaje' => $length === 0 ? 'no hay materiales registrados' : 'datos encontrados correctamente',
            'data' => $data,
            'length' => $length
        ],Response::HTTP_OK);
    }


}
