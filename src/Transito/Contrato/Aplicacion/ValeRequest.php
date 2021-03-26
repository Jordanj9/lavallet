<?php


namespace Cantera\Transito\Contrato\Aplicacion;


use Cantera\Transito\Contrato\Dominio\Contrato;
use Cantera\Transito\Contrato\Dominio\Ticket;
use Cantera\Transito\Contrato\Dominio\TransaccionValueObject;
use Cantera\Transito\Shared\Dominio\ValueObject\Uuid;

class ValeRequest
{

    private string $id;
    private string $contrato_id;
    private array $serie;
    private array $detalle;
    private string $vehiculo_id;
    private string $input;
    private $output;

    /**
     * ValeRequest constructor.
     * @param string $id
     * @param string $contrato_id
     * @param array $serie
     * @param array $detalle
     * @param string $vehiculo_id
     * @param string $input
     * @param string|null $output
     */
    public function __construct(string $id, string $contrato_id, array $serie, array $detalle, string $vehiculo_id, string $input, string $output = null)
    {
        $this->id = $id;
        $this->contrato_id = $contrato_id;
        $this->serie = $serie;
        $this->detalle = $detalle;
        $this->vehiculo_id = $vehiculo_id;
        $this->input = $input;
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
     * @return string
     */
    public function getContratoId(): string
    {
        return $this->contrato_id;
    }

    /**
     * @return array
     */
    public function getSerie(): array
    {
        return $this->serie;
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
     * @return string|null
     */
    public function getOutput(): ?string
    {
        return $this->output;
    }

    static function formtArray(Contrato $contrato, Ticket $ticket, array $serie): self
    {
        $vehiculo = $contrato->getVehiculos()->existPlaca($ticket->getPlaca());
        $detalle = $contrato->getDetalles()->buscar($ticket->getMaterialNombre(), TransaccionValueObject::isCarga());
        $array = ['material_id' => $detalle->getMaterial()->getId()->value(), 'transaccion' => 'CARGA'];
        return new self(Uuid::random()->value(), $contrato->getId()->value(), $serie, $array, $vehiculo->getId()->value(), $ticket->getInput(), $ticket->getOutput());
    }


}
