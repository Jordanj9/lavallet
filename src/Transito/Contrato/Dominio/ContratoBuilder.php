<?php

namespace Cantera\Transito\Contrato\Dominio;

use Cantera\Transito\Cliente\Dominio\Cliente;
use Cantera\Transito\Cliente\Dominio\ClienteId;
use Cantera\Transito\Conductor\Dominio\ConductorId;
use Cantera\Transito\Conductor\Dominio\ConductorIdentificacion;
use Cantera\Transito\Conductor\Dominio\ConductorNombre;
use Cantera\Transito\Material\Dominio\Material;
use Cantera\Transito\Material\Dominio\MaterialId;
use Cantera\Transito\Material\Dominio\MaterialNombre;
use Cantera\Transito\Serie\Dominio\Serie;
use Cantera\Transito\Serie\Dominio\SerieActual;
use Cantera\Transito\Serie\Dominio\SerieId;
use Cantera\Transito\Serie\Dominio\SeriePrefijo;
use Cantera\Transito\Serie\Dominio\SerieTipo;
use Cantera\Transito\Vehiculo\Dominio\Vehiculo;
use Cantera\Transito\Vehiculo\Dominio\VehiculoCapacidad;
use Cantera\Transito\Vehiculo\Dominio\VehiculoId;
use Cantera\Transito\Vehiculo\Dominio\VehiculoPlaca;
use Cantera\Transito\Vehiculo\Dominio\VehiculoTipo;
use function GuzzleHttp\describe_type;

final class ContratoBuilder
{
    private ?ContratoDetalle $detalles = null;
    private ?ContratoVehiculo $vehiculos = null;
    private ?ContratoTickets $tickets = null;
    private ?ContratoVales $vales = null;

    private Contrato $contrato;

    public function __construct(ContratoId $id, Serie $serie, ContratoUbicacion $ubicacion, ContratoFecha $fecha, ClienteId $clienteId)
    {
        $this->contrato = new Contrato($id, $serie, $ubicacion, $fecha, $clienteId);
    }

    public function addDetalle(TerminoValueObject $termino, TransaccionValueObject $transaccion, Material $material): self
    {

        if ($this->detalles == null) {
            $this->detalles = new ContratoDetalle();
        }

        $this->detalles = $this->detalles->add(new Detalle($material, $termino, $transaccion));
        $this->contrato->setDetalles($this->detalles);
        return $this;
    }

    public function addCliente(Cliente $cliente): self
    {
        $this->contrato->setCliente($cliente);
        return $this;
    }

    public function addVechiculo(Vehiculo $vehiculo): self
    {
        if ($this->vehiculos == null)
            $this->vehiculos = new ContratoVehiculo();

        $this->vehiculos = $this->vehiculos->add($vehiculo);
        $this->contrato->setVehiculos($this->vehiculos);
        return $this;
    }

    public function addTickets(Ticket $ticket): self
    {
        if ($this->tickets == null)
            $this->tickets = new ContratoTickets();

        $this->tickets = $this->tickets->add($ticket);
        $this->contrato->setTickets($this->tickets);
        return $this;
    }

    public function addVales(Vale $vale): self
    {
        if ($this->vales == null)
            $this->vales = new ContratoVales();

        $this->vales = $this->vales->add($vale);
        $this->contrato->setVales($this->vales);
        return $this;
    }

    public function build(): Contrato
    {
        if ($this->detalles == null)
            throw new ContratoSinEspecificaciones();

        return $this->contrato;
    }

    static function formtArray(array $model): self
    {
        $contrato = Contrato::formtArray($model);
        $builder = new self($contrato->getId(), $contrato->getSerie(), $contrato->getUbicacion(), $contrato->getFecha(), $contrato->getClienteId());
        if (isset($model['contrato_detalles']))
            $builder->llenarDetalles($model['contrato_detalles']);

        if (isset($model['contrato_vehiculos']))
            $builder->llenarVehiculos($model['contrato_vehiculos']);

        if (isset($model['contrato_tickets']))
            $builder->llenarTickets($model['contrato_tickets']);

        if (isset($model['contrato_vales']))
            $builder->llenarVales($model['contrato_vales']);

        if (isset($model['clienteobj']))
            $builder->addCliente($model['clienteobj']);

        return $builder;
    }

    private function llenarVales(array $vales)
    {
        foreach ($vales as $item) {
            $vale = Vale::fortmArray($item);
            $this->addVales($vale);
        }
    }

    private function llenarTickets(array $tickets)
    {
        foreach ($tickets as $item) {
            $ticket = Ticket::fortmArray($item);
            $this->addTickets($ticket);
        }
    }

    private function llenarDetalles(array $detalles)
    {
        foreach ($detalles as $detalle) {
            $material = new Material(new MaterialId($detalle['material']['id']), new MaterialNombre($detalle['material']['nombre']));
            $this->addDetalle(new TerminoValueObject($detalle['termino']['volumen'], $detalle['termino']['tipo']), new TransaccionValueObject($detalle['transaccion']), $material);
        }
    }

    private function llenarVehiculos(array $vehiculos)
    {
        foreach ($vehiculos as $item) {
            $vehiculo = Vehiculo::formtArray($item);
            $this->addVechiculo($vehiculo);
        }
    }

}
