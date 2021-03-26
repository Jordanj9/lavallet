<?php


namespace Cantera\Transito\Contrato\Aplicacion;


use Cantera\Transito\Contrato\Dominio\IValeRepository;
use Cantera\Transito\Contrato\Dominio\Vale;
use Cantera\Transito\Contrato\Dominio\ValeEstado;
use Cantera\Transito\Contrato\Dominio\ValeId;
use Cantera\Transito\Contrato\Dominio\ValeInexistente;

class FinalizarValeService
{
    private IValeRepository $repository;

    /**
     * FinalizarValeService constructor.
     * @param IValeRepository $repository
     */
    public function __construct(IValeRepository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke(ValeId $valeId, string $output): ?Vale
    {
        $vale = $this->repository->search($valeId);
        if ($vale == null)
            throw new ValeInexistente();

        $vale->setOutput($output);
        $vale->setEstado(ValeEstado::isFinalizado());
        $this->repository->update($vale);
        return $vale;
    }


}
