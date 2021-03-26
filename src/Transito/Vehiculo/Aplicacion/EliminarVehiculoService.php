<?php


namespace Cantera\Transito\Vehiculo\Aplicacion;


use Cantera\Transito\Cliente\Dominio\ClienteId;
use Cantera\Transito\Conductor\Dominio\ConductorId;
use Cantera\Transito\Shared\Dominio\IUnitOfWork;
use Cantera\Transito\Vehiculo\Dominio\IVehiculoRepository;
use Cantera\Transito\Vehiculo\Dominio\VehiculoId;
use Cantera\Transito\Vehiculo\Dominio\VehiculoNoExiste;
use Exception;
use Illuminate\Http\Response;

class EliminarVehiculoService
{
    private IVehiculoRepository $repository;

    /**
     * EliminarVehiculoService constructor.
     * @param IVehiculoRepository $repository
     */
    public function __construct(IVehiculoRepository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke(string $id)
    {
        $id = new VehiculoId($id);
        $vehiculo = $this->repository->search($id);
        if ($vehiculo == null)
            throw new VehiculoNoExiste($id);

        $this->repository->delete($id);
    }


}
