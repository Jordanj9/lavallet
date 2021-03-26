<?php


namespace Cantera\Transito\Conductor\Aplicacion;


class ModificarConductorResponse
{
    private string $mensaje;
    private int $status;

    /**
     * ModificarConductorResponse constructor.
     * @param string $mensaje
     * @param int $status ;
     */
    public function __construct(string $mensaje, int $status)
    {
        $this->mensaje = $mensaje;
        $this->status = $status;
    }

    /**
     * @return string
     */
    public function getMensaje(): string
    {
        return $this->mensaje;
    }

    /**
     * @return int
     */
    public function getStatus(): int
    {
        return $this->status;
    }


}
