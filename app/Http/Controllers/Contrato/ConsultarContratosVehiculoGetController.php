<?php

namespace App\Http\Controllers\Contrato;

use App\Http\Controllers\Controller;
use Cantera\Transito\Contrato\Aplicacion\ConsultarContratosVehiculoService;
use Cantera\Transito\Contrato\Dominio\VehiculoSinContratoException;
use Cantera\Transito\Vehiculo\Dominio\VehiculoNoExiste;
use Cantera\Transito\Vehiculo\Dominio\VehiculoPlaca;
use Illuminate\Http\Response;
use function Lambdish\Phunctional\map;

class ConsultarContratosVehiculoGetController extends Controller
{
    private ConsultarContratosVehiculoService $service;

    /**
     * ConsultarContratosVehiculoGetController constructor.
     * @param ConsultarContratosVehiculoService $service
     */
    public function __construct(ConsultarContratosVehiculoService $service)
    {
        $this->service = $service;
    }

    public function __invoke(string $placa)
    {
        try {
            $contratos = $this->service->__invoke(new VehiculoPlaca($placa));
            $vehiculo = $contratos['vehiculo'];
            $data = map(function ($item) use ($vehiculo) {
                return [
                    'id' => $item->getId()->value(), 'departamento' => $item->getUbicacion()->getDepartamento(),
                    'municipio' => $item->getUbicacion()->getMunicipio(), 'direccion' => $item->getUbicacion()->getDireccion(),
                    'fecha' => $item->getFecha()->getYear() . "-" . $item->getFecha()->getMes() . "-" . $item->getFecha()->getDia(),
                    'serie' => $item->getSerie()->value(), 'cliente_id' => $item->getClienteId()->value(), 'cliente' => $item->getCliente()->toArray(),
                    'vehiculo' => $vehiculo->toArray()
                ];
            }, $contratos['contratos']);
            if (count($data) > 0) {
                return response()->json(['data' => $data, 'mensaje' => 'Datos encontrados'], Response::HTTP_OK);
            } else {
                return response()->json(['data' => '', 'mensaje' => 'No hay registros.'], Response::HTTP_OK);
            }
        } catch (VehiculoSinContratoException | VehiculoNoExiste $exception) {
            return response()->json(['data' => null, 'mensaje' => $exception->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

}
