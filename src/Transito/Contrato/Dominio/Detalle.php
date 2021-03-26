<?php

namespace Cantera\Transito\Contrato\Dominio;

use Cantera\Transito\Material\Dominio\Material;
use Cantera\Transito\Material\Dominio\MaterialId;

class Detalle
{
    private $material;
    private $termino;
    private $transaccion;

    public function __construct(Material $material, TerminoValueObject $termino,TransaccionValueObject $transaccion)
    {
        $this->material = $material;
        $this->termino = $termino;
        $this->transaccion = $transaccion;
    }

    /**
     * @return Material
     */
    public function getMaterial(): Material
    {
        return $this->material;
    }

    /**
     * @return TerminoValueObject
     */
    public function getTermino(): TerminoValueObject
    {
        return $this->termino;
    }


    /**
     * @return TransaccionValueObject
     */
    public function getTransaccion(): TransaccionValueObject
    {
        return $this->transaccion;
    }



}
