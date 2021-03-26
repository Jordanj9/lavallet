<?php

namespace App\Http\Controllers\Cliente;

use App\Http\Controllers\Controller;
use Cantera\Transito\Cliente\Aplicacion\ClienteRequest;
use Cantera\Transito\Cliente\Aplicacion\ModificarClienteService;
use Cantera\Transito\Cliente\Dominio\ClienteDuplicado;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ClientePutController extends Controller
{

    private ModificarClienteService $service;

    /**
     * ClientePutController constructor.
     * @param ModificarClienteService $service
     */
    public function __construct(ModificarClienteService $service)
    {
        $this->service = $service;
    }

    public function __invoke(Request $request, string $id)
    {
        $clienteRequest = new ClienteRequest(
            $request->id,
            $request->identificacion,
            $request->nombre, $request->municipio,
            $request->departamento, $request->direccion,
            $request->telefono, $request->tipo,
            $request->correo
        );

        try {
            $this->service->__invoke($clienteRequest);
            return response()->json(['data' => '', 'message' => 'Cliente Gurdado Correctamente'], Response::HTTP_OK);
        } catch (ClienteDuplicado $exception) {
            return response()->json(['data' => null, 'message' => $exception->errorMessage()], Response::HTTP_BAD_REQUEST);
        }
    }
}
