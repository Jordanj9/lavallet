<?php


namespace Cantera\Transito\Contrato\Aplicacion;


use Cantera\Transito\Contrato\Dominio\IContratoRepository;

class ConsultarContratoBySerieService
{

    private IContratoRepository $repository;

    /**
     * ConsultarContratoBySerieService constructor.
     * @param IContratoRepository $repository
     */
    public function __construct(IContratoRepository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke(string $serie): array
    {
        return $this->repository->findBySerie($serie);
    }
}
