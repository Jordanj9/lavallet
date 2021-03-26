<?php

namespace Cantera\Transito\Material\Aplicacion;

use Cantera\Transito\Material\Dominio\IMaterialRepository;
use Cantera\Transito\Material\Dominio\Material;
use Cantera\Transito\Material\Dominio\MaterialDuplicado;
use Cantera\Transito\Material\Dominio\MaterialId;
use Cantera\Transito\Material\Dominio\MaterialNombre;
use Cantera\Transito\Shared\Dominio\IUnitOfWork;
use Exception;
use Illuminate\Http\Response;

class GuardarMaterialService
{
    private IMaterialRepository $repository;

    /**
     * GuardarMaterialService constructor.
     * @param IMaterialRepository $repository
     */
    public function __construct(IMaterialRepository $repository)
    {
        $this->repository = $repository;
    }


    public function __invoke(MaterialRequest $request)
    {
        $nombre = new MaterialNombre($request->getNombre());
        $material = $this->repository->findByNombre($nombre);
        if ($material != null)
            throw new MaterialDuplicado($nombre);

        $material = new Material(new MaterialId($request->getId()), new MaterialNombre($request->getNombre()));
        $this->repository->save($material);
    }

}
