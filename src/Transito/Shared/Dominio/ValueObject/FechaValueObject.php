<?php


namespace Cantera\Transito\Shared\Dominio\ValueObject;


abstract class FechaValueObject
{
    private $dia;
    private $mes;
    private $year;

    /**
     * FechaValueObject constructor.
     * @param int $dia
     * @param int $mes
     * @param int $year
     */
    public function __construct(int $dia, int $mes, int $year)
    {
        $this->dia = $dia;
        $this->mes = $mes;
        $this->year = $year;
    }

    /**
     * @return int
     */
    public function getDia(): int
    {
        return $this->dia;
    }

    /**
     * @return int
     */
    public function getMes(): int
    {
        return $this->mes;
    }

    /**
     * @return int
     */
    public function getYear(): int
    {
        return $this->year;
    }

}
