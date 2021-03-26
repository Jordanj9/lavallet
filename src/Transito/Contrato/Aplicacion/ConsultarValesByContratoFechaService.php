<?php


namespace Cantera\Transito\Contrato\Aplicacion;


use Cantera\Transito\Contrato\Dominio\Contrato;
use Cantera\Transito\Contrato\Dominio\IContratoRepository;
use Cantera\Transito\Contrato\Dominio\IValeRepository;

class ConsultarValesByContratoFechaService
{

    private IContratoRepository $contratoRepository;
    private IValeRepository $valeRepository;

    /**
     * ConsultarValesByContratoFechaService constructor.
     * @param IContratoRepository $contratoRepository
     * @param IValeRepository $valeRepository
     */
    public function __construct(IContratoRepository $contratoRepository, IValeRepository $valeRepository)
    {
        $this->contratoRepository = $contratoRepository;
        $this->valeRepository = $valeRepository;
    }

    public function __invoke(Contrato $contrato, string $fechainicio, string $fechafin):array
    {
        return $contrato->getVales()->getValeByFecha($fechainicio, $fechafin);
    }


}
