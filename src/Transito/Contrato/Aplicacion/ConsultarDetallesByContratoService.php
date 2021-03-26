<?php


namespace Cantera\Transito\Contrato\Aplicacion;


use Cantera\Transito\Contrato\Dominio\ContratoId;
use Cantera\Transito\Contrato\Dominio\ContratoInexistente;
use Cantera\Transito\Contrato\Dominio\IContratoRepository;

class ConsultarDetallesByContratoService
{
    private IContratoRepository $repository;

    /**
     * ConsultarDetallesByContratoService constructor.
     * @param IContratoRepository $repository
     */
    public function __construct(IContratoRepository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke(ContratoId $contrato_id): array
    {

        $builder = $this->repository->search($contrato_id, true);
        if ($builder == null)
            throw new ContratoInexistente();

        $contrato = $builder->build();

        return array($contrato->getDetalles());
    }

}
