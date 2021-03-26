<?php


namespace Cantera\Transito\Material\Aplicacion;


use Cantera\Transito\Contrato\Dominio\IValeRepository;
use Cantera\Transito\Material\Dominio\IMaterialRepository;

class ReporteMovimientoMaterialService
{

    private IValeRepository $valeRepository;
    private IMaterialRepository $materialRepository;

    /**
     * ReporteMovimientoMaterialService constructor.
     * @param IValeRepository $valeRepository
     * @param IMaterialRepository $materialRepository
     */
    public function __construct(IValeRepository $valeRepository, IMaterialRepository $materialRepository)
    {
        $this->valeRepository = $valeRepository;
        $this->materialRepository = $materialRepository;
    }

    public function __invoke(string $fechainicio, string $fechafin): array
    {
       return $this->valeRepository->ValesByMaterial($fechainicio, $fechafin);
    }


}
