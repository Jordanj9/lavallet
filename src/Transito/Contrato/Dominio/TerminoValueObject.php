<?php

namespace Cantera\Transito\Contrato\Dominio;


class TerminoValueObject
{
    private $volumen;
    private $tipo;

    /**
     * TerminoValueObject constructor.
     * @param $volumen
     * @param $tipo
     */
    public function __construct(int $volumen, string $tipo)
    {
        $this->ensureIsValidTheType($tipo);
        $this->tipo = $tipo;
        $this->volumen = $volumen;
    }

    private function ensureIsValidTheType(string $tipo)
    {
        if(strtoupper($tipo) != 'DEFINIDO' && strtoupper($tipo) != 'INDEFINIDO')
         throw new \InvalidArgumentException(sprintf('The type selected <%s> is invalid', $tipo));
    }

    /**
     * @return int
     */
    public function getVolumen(): int
    {
        return $this->volumen;
    }

    /**
     * @return string
     */
    public function getTipo(): string
    {
        return $this->tipo;
    }


}
