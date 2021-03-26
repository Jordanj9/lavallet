<?php

namespace App\Http\Controllers\Cliente;

use App\Http\Controllers\Controller;
use Cantera\Transito\Cliente\Aplicacion\ConsultarClientesByStringService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use function Lambdish\Phunctional\map;

class ConsultarClientesGetController extends Controller
{
    private ConsultarClientesByStringService $service;

    /**
     * ConsultarClientesGetController constructor.
     * @param ConsultarClientesByStringService $service
     */
    public function __construct(ConsultarClientesByStringService $service)
    {
        $this->service = $service;
    }

    public function __invoke(string $request)
    {
        $clientes = $this->service->__invoke(strtoupper($request));

        return map(function ($item) {
            return [
                'id' => $item->id()->value(), 'identificacion' => $item->identificacion()->value(),
                'nombre' => $item->nombre()->value(), 'telefono' => $item->telefono()->value(),
                'ubicacion' => ['municipio' => $item->ubicacion()->getMunicipio(), 'departamento' => $item->ubicacion()->getDepartamento(), 'direccion' => $item->ubicacion()->getDireccion()],
                'tipo' => $item->tipo()->value(),
                'correo' => $item->correo()->value()
            ];
        }, $clientes);
    }


}
