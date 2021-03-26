<?php

namespace App\Http\Controllers\Cliente;

use App\Http\Controllers\Controller;
use Cantera\Transito\Cliente\Aplicacion\ClienteRequest;
use Cantera\Transito\Cliente\Aplicacion\GuardarClienteService;
use Cantera\Transito\Cliente\Dominio\ClienteDuplicado;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ClientePostController extends Controller
{

    private GuardarClienteService $service;

    public function __construct(GuardarClienteService $service)
    {
        $this->service = $service;
    }


    public function __invoke(Request $request)
    {

        $clienteRequest = new ClienteRequest(
            $request->id,
            $request->identificacion,
            $request->nombre,
            $request->municipio,
            $request->departamento,
            $request->direccion,
            $request->telefono,
            $request->tipo,
            $request->correo
        );

        try {
            $this->service->__invoke($clienteRequest);
            return response()->json(['data' => '', 'mensaje' => 'Cliente Gurdado Correctamente'], Response::HTTP_OK);
        } catch (ClienteDuplicado $exception) {
            return response()->json(['data' => null, 'mensaje' => $exception->errorMessage()], Response::HTTP_BAD_REQUEST);
        }

    }

}
