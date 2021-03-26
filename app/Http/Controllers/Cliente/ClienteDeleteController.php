<?php

namespace App\Http\Controllers\Cliente;

use App\Http\Controllers\Controller;
use Cantera\Transito\Cliente\Aplicacion\EliminarClienteService;
use Cantera\Transito\Cliente\Dominio\ClienteAsociado;
use Cantera\Transito\Cliente\Dominio\ClienteNoExiste;
use Illuminate\Http\Response;


class ClienteDeleteController extends Controller
{
    private EliminarClienteService $service;

    /**
     * ClienteDeleteController constructor.
     * @param EliminarClienteService $service
     */
    public function __construct(EliminarClienteService $service)
    {
        $this->service = $service;
    }

    public function __invoke(string $id)
    {

        try {
            $this->service->__invoke($id);
            return response()->json(['data' => '', 'mensaje' => 'Cliente eliminado correctamente.'], Response::HTTP_OK);
        } catch (ClienteNoExiste | ClienteAsociado $exception) {
            return response()->json(['data' => null, 'mensaje' => $exception->errorMessage()], Response::HTTP_NOT_FOUND);
        }
    }

}
