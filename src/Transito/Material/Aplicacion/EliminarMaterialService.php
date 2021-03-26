<?php


namespace Cantera\Transito\Material\Aplicacion;

use Cantera\Transito\Material\Dominio\IMaterialRepository;
use Cantera\Transito\Material\Dominio\MaterialId;
use Cantera\Transito\Material\Dominio\MaterialNoExiste;
use Cantera\Transito\Shared\Dominio\IUnitOfWork;
use Exception;
use Illuminate\Http\Response;

class EliminarMaterialService
{
    private IMaterialRepository $repository;

    /**
     * EliminarMaterialService constructor.
     * @param IMaterialRepository $repository
     */
    public function __construct(IMaterialRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @param string $id
     */
    public function __invoke(string $id)
    {
        $materiaId = new MaterialId($id);
        $material = $this->repository->search($materiaId);
        if ($material == null)
            throw new MaterialNoExiste($materiaId);

        $this->repository->delete(new MaterialId($id));
    }


}
