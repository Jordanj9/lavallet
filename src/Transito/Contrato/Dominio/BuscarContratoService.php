<?php


namespace Cantera\Transito\Contrato\Dominio;


class BuscarContratoService
{
    private IContratoRepository $repository;

    /**
     * BuscarContratoService constructor.
     * @param IContratoRepository $repository
     */
    public function __construct(IContratoRepository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke(string $contrato_id): Contrato
    {

        $contratoBuilder = $this->repository->search(new ContratoId($contrato_id), true);

        if ($contratoBuilder == null)
            throw new ContratoInexistente();

        return $contratoBuilder->build();
    }


}
