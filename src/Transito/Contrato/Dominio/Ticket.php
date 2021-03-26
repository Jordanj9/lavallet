<?php

namespace Cantera\Transito\Contrato\Dominio;

use Cantera\Transito\Conductor\Dominio\ConductorNombre;
use Cantera\Transito\Material\Dominio\MaterialNombre;
use Cantera\Transito\Serie\Dominio\Serie;
use Cantera\Transito\Serie\Dominio\SerieActual;
use Cantera\Transito\Serie\Dominio\SerieId;
use Cantera\Transito\Serie\Dominio\SeriePrefijo;
use Cantera\Transito\Serie\Dominio\SerieTipo;
use Cantera\Transito\Vehiculo\Dominio\VehiculoPlaca;

class Ticket
{
    private $id;
    private $serie;
    private $placa;
    private $carga;
    private $materialNombre;
    private $conductorNombre;
    private $estado;
    private $contrato_id;
    private $input;
    private $output;
    private $fecha;

    /**
     * Ticket constructor.
     * @param TicketId $id
     * @param Serie $serie
     * @param VehiculoPlaca $placa
     * @param TicketCarga $carga
     * @param MaterialNombre $materialNombre
     * @param ConductorNombre $conductorNombre
     * @param TicketEstado $estado
     * @param ContratoId $contrato_id
     * @param string|null $input
     * @param string|null $output
     * @param string|null $fecha ;
     */
    public function __construct(TicketId $id, Serie $serie, VehiculoPlaca $placa, TicketCarga $carga, MaterialNombre $materialNombre, ConductorNombre $conductorNombre, TicketEstado $estado, ContratoId $contrato_id, string $input = null, string $output = null, string $fecha = null)
    {
        $this->id = $id;
        $this->serie = $serie;
        $this->placa = $placa;
        $this->carga = $carga;
        $this->estado = $estado;
        $this->materialNombre = $materialNombre;
        $this->conductorNombre = $conductorNombre;
        $this->contrato_id = $contrato_id;
        $this->input = $input;
        $this->output = $output;
        $this->fecha = $fecha;
    }

    /**
     * @return TicketId
     */
    public function getId(): TicketId
    {
        return $this->id;
    }

    /**
     * @return Serie
     */
    public function getSerie(): Serie
    {
        return $this->serie;
    }

    /**
     * @return VehiculoPlaca
     */
    public function getPlaca(): VehiculoPlaca
    {
        return $this->placa;
    }

    /**
     * @return TicketCarga
     */
    public function getCarga(): TicketCarga
    {
        return $this->carga;
    }

    /**
     * @return MaterialNombre
     */
    public function getMaterialNombre(): MaterialNombre
    {
        return $this->materialNombre;
    }

    /**
     * @return ConductorNombre
     */
    public function getConductorNombre(): ConductorNombre
    {
        return $this->conductorNombre;
    }

    /**
     * @return TicketEstado
     */
    public function getEstado(): TicketEstado
    {
        return $this->estado;
    }

    /**
     * @param TicketEstado $estado
     */
    public function setEstado(TicketEstado $estado): void
    {
        $this->estado = $estado;
    }

    /**
     * @return ContratoId
     */
    public function getContratoId(): ContratoId
    {
        return $this->contrato_id;
    }

    /**
     * @return string
     */
    public function getInput(): string
    {
        return $this->input;
    }

    /**
     * @param string|null $input
     */
    public function setInput(?string $input): void
    {
        $this->input = $input;
    }

    /**
     * @return string|null
     */
    public function getOutput(): ?string
    {
        return $this->output;
    }

    /**
     * @param string|null $ouput
     */
    public function setOutput(?string $ouput): void
    {
        $this->output = $ouput;
    }

    /**
     * @return string|null
     */
    public function getFecha(): ?string
    {
        return $this->fecha;
    }

    /**
     * @return array
     */
    public function toArray(): array
    {
        return [
            'id' => $this->getId()->value(),
            'serie' => $this->getSerie()->value(),
            'placa' => $this->getPlaca()->value(),
            'carga' => $this->getCarga()->value(),
            'material' => $this->getMaterialNombre()->value(),
            'conductor' => $this->getConductorNombre()->value(),
            'estado' => $this->getEstado()->value(),
            'input' => $this->getInput(),
            'output' => $this->getOutput(),
            'contrato_id' => $this->getContratoId()->value(),
            'fecha' => $this->getFecha()
        ];
    }

    static function fortmArray(array $model): self
    {
        $actual = explode('-', $model['serie'])[1];
        $serie = new Serie(new SerieId($model['serieobj']['id']), new SeriePrefijo($model['serieobj']['prefijo']),
            new SerieActual($actual), new SerieTipo($model['serieobj']['tipo']));

        return new self(new TicketId($model['id']), $serie, new VehiculoPlaca($model['placa']),
            new TicketCarga($model['carga']), new MaterialNombre($model['material']),
            new ConductorNombre($model['conductor']), new TicketEstado($model['estado']), new ContratoId($model['contrato_id']), $model['input'], $model['output'], $model['created_at']);
    }

}
