<?php


namespace Cantera\Transito\Material\Aplicacion;

final class GuardarMaterialResponse
{
    private string $mensaje;
    private int $status;

    /**
     * GuardarMaterialResponse constructor.
     * @param string $mensaje
     * @param int $status
     */
    public function __construct(string $mensaje, int $status)
    {
        $this->mensaje = $mensaje;
        $this->status = $status;
    }

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
