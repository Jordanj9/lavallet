<?php

namespace App\Http\Controllers\Departamento;

use App\Http\Controllers\Controller;
use Cantera\Transito\Departamento\Aplicacion\GetDepartamentoService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use function Lambdish\Phunctional\map;

class DepartamentoAllController extends Controller
{
    private GetDepartamentoService $service;

    /**
     * DepartamentoAllController constructor.
     * @param GetDepartamentoService $service
     */
    public function __construct(GetDepartamentoService $service)
    {
        $this->service = $service;
    }

    public function __invoke()
    {
        $departamentos = $this->service->__invoke();
        $data = map(function ($item) {
            return ['id' => $item->getId()->value(), 'nombre' => $item->getNombre()->value(),
                'municipios' => $this->municipios($item->getMunicipios())];
        }, $departamentos);

        if (count($data) > 0) {
            return response()->json(['data' => $data, 'mensaje' => 'Datos encontrados'], Response::HTTP_OK);
        } else {
            return response()->json(['data' => '', 'mensaje' => 'No hay registros.'], Response::HTTP_OK);
        }
    }

    private function municipios($array)
    {
        foreach ($array as $i) {
            $muncipios[] = $i->toArray();
        }
        return $muncipios;
    }


}
