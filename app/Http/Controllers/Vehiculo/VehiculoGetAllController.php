<?php

namespace App\Http\Controllers\Vehiculo;

use App\Http\Controllers\Controller;
use Cantera\Transito\Shared\Dominio\Utils;
use Cantera\Transito\Vehiculo\Aplicacion\GetVehiculoService;
use Illuminate\Http\Response;
use function Lambdish\Phunctional\map;
use Illuminate\Http\Request;

class VehiculoGetAllController extends Controller
{
    private GetVehiculoService $service;

    /**
     * VehiculoGetAllController constructor.
     * @param GetVehiculoService $service
     */
    public function __construct(GetVehiculoService $service)
    {
        $this->service = $service;
    }

    public function __invoke(Request $request)
    {
        $vehiculos = $this->service->__invoke();
        $length =  count($vehiculos);
        if(isset($request->limit) && isset($request->offset)){
            $vehiculos = Utils::take($vehiculos,$request->limit,$request->offset);
        }else if(isset($request->limit)) {
            $vehiculos = Utils::take($vehiculos,$request->limit);
        }else if(isset($request->offset)){
            $vehiculos = Utils::take($vehiculos,10,$request->offset);
        }

        $data = map(function ($item) {
            return [
                'id' => $item->getId()->value(), 'placa' => $item->getPlaca()->value(),
                'capacidad' => $item->getCapacidad()->value(), 'tipo' => $item->getTipo()->value(),
                'conductor_id' => $item->getConductorid()->value(), 'conductor' => $item->getConductor()->getNombre()->value()
            ];
        }, $vehiculos);

        return response()->json([
            'status' => Response::HTTP_OK,
            'mensaje' => $length === 0 ? 'no hay vehiculos registrados' : 'datos encontrados correctamente',
            'data' => $data,
            'length' => $length
        ],Response::HTTP_OK);

    }


}
