<?php


namespace Cantera\Transito\Contrato\Dominio;


use Cantera\Transito\Conductor\Dominio\ConductorIdentificacion;
use Cantera\Transito\Conductor\Dominio\ConductorNombre;
use Cantera\Transito\Material\Dominio\MaterialNombre;
use Cantera\Transito\Serie\Dominio\Serie;
use Cantera\Transito\Serie\Dominio\SerieActual;
use Cantera\Transito\Serie\Dominio\SerieId;
use Cantera\Transito\Serie\Dominio\SeriePrefijo;
use Cantera\Transito\Serie\Dominio\SerieTipo;
use Cantera\Transito\Vehiculo\Dominio\VehiculoCapacidad;
use Cantera\Transito\Vehiculo\Dominio\VehiculoPlaca;

class Vale
{
    private ValeId $id;
    private Serie $serie;
    private VehiculoPlaca $placa;
    private VehiculoCapacidad $capacidadVehiculo;
    private TicketCarga $carga;
    private MaterialNombre $material;
    private ConductorNombre $conductor;
    private ConductorIdentificacion $identificacion;
    private TransaccionValueObject $transaccion;
    private ValeEstado $estado;
    private ContratoId $contrato_id;
    private $input;
    private $output;
    private $fecha;

    /**
     * Vale constructor.
     * @param ValeId $id
     * @param Serie $serie
     * @param VehiculoPlaca $placa
     * @param VehiculoCapacidad $capacidadVehiculo
     * @param TicketCarga $carga
     * @param MaterialNombre $material
     * @param ConductorNombre $conductor
     * @param ConductorIdentificacion $identificacion
     * @param TransaccionValueObject $transaccion
     * @param ValeEstado $estado
     * @param ContratoId $contrato_id
     * @param string|null $input
     * @param string|null $output
     * @param string|null $fecha
     */
    public function __construct(ValeId $id, Serie $serie, VehiculoPlaca $placa, VehiculoCapacidad $capacidadVehiculo, TicketCarga $carga, MaterialNombre $material, ConductorNombre $conductor, ConductorIdentificacion $identificacion, TransaccionValueObject $transaccion, ValeEstado $estado, ContratoId $contrato_id, string $input = null, string $output = null, string $fecha = null)
    {
        $this->id = $id;
        $this->serie = $serie;
        $this->placa = $placa;
        $this->capacidadVehiculo = $capacidadVehiculo;
        $this->carga = $carga;
        $this->material = $material;
        $this->conductor = $conductor;
        $this->identificacion = $identificacion;
        $this->transaccion = $transaccion;
        $this->estado = $estado;
        $this->contrato_id = $contrato_id;
        $this->input = $input;
        $this->output = $output;
        $this->fecha = $fecha;
    }

    /**
     * @return ValeId
     */
    public function getId(): ValeId
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
     * @return VehiculoCapacidad
     */
    public function getCapacidadVehiculo(): VehiculoCapacidad
    {
        return $this->capacidadVehiculo;
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
    public function getMaterial(): MaterialNombre
    {
        return $this->material;
    }

    /**
     * @return ConductorNombre
     */
    public function getConductor(): ConductorNombre
    {
        return $this->conductor;
    }

    /**
     * @return ConductorIdentificacion
     */
    public function getIdentificacion(): ConductorIdentificacion
    {
        return $this->identificacion;
    }

    /**
     * @return TransaccionValueObject
     */
    public function getTransaccion(): TransaccionValueObject
    {
        return $this->transaccion;
    }

    /**
     * @return ValeEstado
     */
    public function getEstado(): ValeEstado
    {
        return $this->estado;
    }

    /**
     * @param ValeEstado $estado
     */
    public function setEstado(ValeEstado $estado): void
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
     * @return string|null
     */
    public function getInput(): ?string
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

    /**
     * @param string|null $input
     */
    public function setInput(?string $input): void
    {
        $this->input = $input;
    }

    /**
     * @param string|null $output
     */
    public function setOutput(?string $output): void
    {
        $this->output = $output;
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
            'capacidad' => $this->getCapacidadVehiculo()->value(),
            'carga' => $this->getCarga()->value(),
            'material' => $this->getMaterial()->value(),
            'conductor' => $this->getConductor()->value(),
            'identificacion' => $this->getIdentificacion()->value(),
            'transaccion' => $this->getTransaccion()->value(),
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

        return new self(new ValeId($model['id']), $serie, new VehiculoPlaca($model['placa']),
            new VehiculoCapacidad($model['capacidad']), new TicketCarga($model['carga']), new MaterialNombre($model['material']),
            new ConductorNombre($model['conductor']), new ConductorIdentificacion($model['identificacion']),
            new TransaccionValueObject($model['transaccion']), new ValeEstado($model['estado']),
            new ContratoId($model['contrato_id']), $model['input'], $model['output'], $model['created_at']);
    }


}
