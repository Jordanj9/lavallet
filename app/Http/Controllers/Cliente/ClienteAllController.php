<?php

namespace App\Http\Controllers\Cliente;

use App\Http\Controllers\Controller;
use Cantera\Transito\Cliente\Aplicacion\GetClientesService;
use Cantera\Transito\Shared\Dominio\Utils;

use Illuminate\Http\Response;
use function Lambdish\Phunctional\map;
use Illuminate\Http\Request;

class ClienteAllController extends Controller
{
    private GetClientesService $service;

    /**
     * ClienteAllController constructor.
     * @param GetClientesService $service
     */
    public function __construct(GetClientesService $service)
    {
        $this->service = $service;
    }

    public function __invoke(Request $request)
    {
        $clientes = $this->service->__invoke();

        $length =  count($clientes);

        if(isset($request->limit) && isset($request->offset)){
            $clientes = Utils::take($clientes,$request->limit,$request->offset);
        }else if(isset($request->limit)) {
            $clientes = Utils::take($clientes,$request->limit);
        }else if(isset($request->offset)){
            $clientes = Utils::take($clientes,10,$request->offset);
        }

        $data = map(function ($item) {
            return [
                'id' => $item->id()->value(), 'identificacion' => $item->identificacion()->value(),
                'nombre' => $item->nombre()->value(), 'telefono' => $item->telefono()->value(),
                'ubicacion' => ['municipio' => $item->ubicacion()->getMunicipio(), 'departamento' => $item->ubicacion()->getDepartamento(), 'direccion' => $item->ubicacion()->getDireccion()],
                'tipo' => $item->tipo()->value(),
                'correo' => $item->correo()->value()
            ];
        }, $clientes);

        return response()->json([
            'status' => Response::HTTP_OK,
            'mensaje' => $length === 0 ? 'no hay clientes registrados' : 'datos encontrados correctamente',
            'data' => $data,
            'length' => $length
        ],Response::HTTP_OK);
    }

}
