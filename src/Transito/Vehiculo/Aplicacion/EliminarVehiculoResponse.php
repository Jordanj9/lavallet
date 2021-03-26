<?php


namespace Cantera\Transito\Vehiculo\Aplicacion;


class EliminarVehiculoResponse
{
    private string $mensaje;
    private int $status;

    /**
     * EliminarVehiculoResponse constructor.
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
