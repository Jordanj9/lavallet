<?php

namespace Cantera\Transito\Conductor\Aplicacion;

final class BuscarConductorRequest
{

    private string $identificacion;

    public function __construct(string $identificacion)
    {
        $this->identificacion = $identificacion;
    }

    public function getIdentificacion(): string
    {
        return $this->identificacion;
    }

}
