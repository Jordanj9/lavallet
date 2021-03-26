<?php


namespace Cantera\Transito\Contrato\Aplicacion;


class TicketRequest
{
    private string $id;
    private string $contrato_id;
    private array $detalle;
    private string $vehiculo_id;
    private string $input;
    private $output;
    private array $serie;

    /**
     * TicketRequest constructor.
     * @param string $id
     * @param string $contrato_id
     * @param array $detalle
     * @param string $vehiculo_id
     * @param string $input
     * @param array $serie
     * @param string|null $output
     */
    public function __construct(string $id, string $contrato_id, array $detalle, string $vehiculo_id, string $input, array $serie, string $output = null)
    {
        $this->id = $id;
        $this->contrato_id = $contrato_id;
        $this->detalle = $detalle;
        $this->vehiculo_id = $vehiculo_id;
        $this->input = $input;
        $this->serie = $serie;
        $this->output = $output;
    }

    /**
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
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
    public function getContratoId(): string
    {
        return $this->contrato_id;
    }

    /**
     * @return array
     */
    public function getDetalle(): array
    {
        return $this->detalle;
    }

    /**
     * @return string
     */
    public function getVehiculoId(): string
    {
        return $this->vehiculo_id;
    }

    /**
     * @return string
     */
    public function getInput(): string
    {
        return $this->input;
    }

    /**
     * @return string
     */
    public function getOutput(): string
    {
        return $this->output;
    }


}
