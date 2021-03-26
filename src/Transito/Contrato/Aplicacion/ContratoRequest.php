<?php


namespace Cantera\Transito\Contrato\Aplicacion;


use Cantera\Transito\Cliente\Dominio\ClienteId;

class ContratoRequest
{
    private string $id;
    private string $cliente_id;
    private array $ubicacion;
    private array $serie;
    private string $fecha;
    private array $detalles;
    private array $vehiculos;

    /**
     * ContratoRequest constructor.
     * @param string $id
     * @param string $cliente_id
     * @param array $ubicacion
     * @param array $serie
     * @param string $fecha
     * @param array $detalles
     * @param array $vehiculos
     */
    public function __construct(string $id, string $cliente_id, array $ubicacion, array $serie, string $fecha, array $detalles, array $vehiculos = [])
    {
        $this->id = $id;
        $this->cliente_id = $cliente_id;
        $this->ubicacion = $ubicacion;
        $this->serie = $serie;
        $this->fecha = $fecha;
        $this->detalles = $detalles;
        $this->vehiculos = $vehiculos;
    }

    /**
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getClienteId(): string
    {
        return $this->cliente_id;
    }

    /**
     * @return array
     */
    public function getUbicacion(): array
    {
        return $this->ubicacion;
    }

    /**
     * @return array
     */
    public function getSerie(): array
    {
        return $this->serie;
    }

    /**
     * @return string
     */
    public function getFecha(): string
    {
        return $this->fecha;
    }

    /**
     * @return array
     */
    public function getDetalles(): array
    {
        return $this->detalles;
    }

    /**
     * @return array
     */
    public function getVehiculos(): array
    {
        return $this->vehiculos;
    }

}
