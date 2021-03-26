<?php

namespace Cantera\Transito\Serie\Aplicacion;

use Cantera\Transito\Serie\Dominio\ISerieRepository;
use Cantera\Transito\Serie\Dominio\Serie;
use Cantera\Transito\Serie\Dominio\SerieActual;
use Cantera\Transito\Serie\Dominio\SerieId;
use Cantera\Transito\Serie\Dominio\SeriePrefijo;
use Cantera\Transito\Serie\Dominio\SerieTipo;
use Cantera\Transito\Shared\Dominio\ValueObject\Uuid;

final class SerieFindByTypeService
{
    private ISerieRepository $repository;

    /**
     * SerieFindByTypeService constructor.
     * @param ISerieRepository $repository
     */
    public function __construct(ISerieRepository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke(string $type): ?Serie
    {
        $type = strtoupper($type);
        $serie = $this->repository->buscarPorTipo($type);
        if ($serie == null) {
            $prefijo = substr($type, 0, 4);
            $serie = new Serie(new SerieId(Uuid::random()), new SeriePrefijo($prefijo), new SerieActual(0), new SerieTipo($type));
            $this->repository->save($serie);
        }
        return $serie;
    }

}
