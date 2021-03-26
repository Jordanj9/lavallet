<?php

namespace App\Http\Controllers\Contrato;

use App\Http\Controllers\Controller;
use Cantera\Transito\Contrato\Aplicacion\ContratoAllService;
use Cantera\Transito\Shared\Dominio\Utils;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use function Lambdish\Phunctional\map;

class ContratoAllController extends Controller
{
    private ContratoAllService $service;

    /**
     * ContratoAllController constructor.
     * @param ContratoAllService $service
     */
    public function __construct(ContratoAllService $service)
    {
        $this->service = $service;
    }

    public function __invoke(Request $request)
    {
        $contratos = $this->service->__invoke();

        $length =  count($contratos);

        if(isset($request->limit) && isset($request->offset)){
            $contratos = Utils::take($contratos,$request->limit,$request->offset);
        }else if(isset($request->limit)) {
            $contratos = Utils::take($contratos,$request->limit);
        }else if(isset($request->offset)){
            $contratos = Utils::take($contratos,10,$request->offset);
        }

        $data = map(function ($item) {
            return [
                'contrato' => $item->toArray(),
                'cliente' => $item->getCliente()->toArray()
            ];
        }, $contratos);

        return response()->json([
            'status' => Response::HTTP_OK,
            'mensaje' => $length === 0 ? 'no hay contratos registrados' : 'datos encontrados correctamente',
            'data' => $data,
            'length' => $length
        ],Response::HTTP_OK);
    }


}
