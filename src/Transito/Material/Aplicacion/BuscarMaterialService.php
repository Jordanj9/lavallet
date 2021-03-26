<?php


namespace Cantera\Transito\Material\Aplicacion;


use Cantera\Transito\Material\Dominio\IMaterialRepository;
use Cantera\Transito\Material\Dominio\MaterialId;
use Cantera\Transito\Material\Dominio\MaterialNoExiste;

class BuscarMaterialService
{
    private IMaterialRepository $repository;

    /**
     * BuscarMaterialService constructor.
     * @param IMaterialRepository $repository
     */
    public function __construct(IMaterialRepository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke(string $id)
    {
        $materiaId = new MaterialId($id);
        $material = $this->repository->search($materiaId);
        if ($material == null)
            throw new MaterialNoExiste($materiaId);

        return $material;
    }


}
