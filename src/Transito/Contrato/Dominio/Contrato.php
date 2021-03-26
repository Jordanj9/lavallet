<?php

namespace Cantera\Transito\Contrato\Dominio;

use Cantera\Transito\Cliente\Dominio\Cliente;
use Cantera\Transito\Cliente\Dominio\ClienteId;
use Cantera\Transito\Material\Dominio\Material;
use Cantera\Transito\Material\Dominio\MaterialId;
use Cantera\Transito\Material\Dominio\MaterialNombre;
use Cantera\Transito\Serie\Dominio\Serie;
use Cantera\Transito\Serie\Dominio\SerieActual;
use Cantera\Transito\Serie\Dominio\SerieId;
use Cantera\Transito\Serie\Dominio\SeriePrefijo;
use Cantera\Transito\Serie\Dominio\SerieTipo;
use Cantera\Transito\Vehiculo\Dominio\Vehiculo;
use Cantera\Transito\Vehiculo\Dominio\VehiculoId;
use Cantera\Transito\Vehiculo\Dominio\VehiculoPlaca;

final class Contrato
{
    private $id;
    private $serie;
    private $ubicacion;
    private $fecha;
    private ContratoDetalle $detalles;
    private ContratoVehiculo $vehiculos;
    private $clienteId;
    private ContratoTickets $tickets;
    private ContratoVales $vales;
    private Cliente $cliente;

    public function __construct(ContratoId $id, Serie $serie, ContratoUbicacion $ubicacion, ContratoFecha $fecha, ClienteId $clienteId)
    {
        $this->id = $id;
        $this->serie = $serie;
        $this->ubicacion = $ubicacion;
        $this->fecha = $fecha;
        $this->clienteId = $clienteId;
        $this->vehiculos = new ContratoVehiculo();
        $this->detalles = new ContratoDetalle();
        $this->tickets = new ContratoTickets();
        $this->vales = new ContratoVales();
    }

    public function getTickets(): ContratoTickets
    {
        return $this->tickets;
    }

    /**
     * @return ContratoVales
     */
    public function getVales(): ContratoVales
    {
        return $this->vales;
    }

    public function getClienteId(): ClienteId
    {
        return $this->clienteId;
    }

    public function getId(): ContratoId
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

    public function getUbicacion(): ContratoUbicacion
    {
        return $this->ubicacion;
    }

    public function getFecha(): ContratoFecha
    {
        return $this->fecha;
    }

    public function getVehiculos(): ContratoVehiculo
    {
        return $this->vehiculos;
    }

    /**
     * @return Cliente
     */
    public function getCliente(): Cliente
    {
        return $this->cliente;
    }

    /**
     * @param Cliente $cliente
     */
    public function setCliente(Cliente $cliente): void
    {
        $this->cliente = $cliente;
    }

    /**
     * @return ContratoDetalle
     */
    public function getDetalles(): ContratoDetalle
    {
        return $this->detalles;
    }

    public function setDetalles(ContratoDetalle $detalles): void
    {
        $this->detalles = $detalles;
    }

    public function addDetalle(TerminoValueObject $termino, TransaccionValueObject $transaccion, Material $material)
    {
        $this->detalles = $this->detalles->add(new Detalle($material, $termino, $transaccion));
    }

    public function setVehiculos(ContratoVehiculo $vehiculos): void
    {
        $this->vehiculos = $vehiculos;
    }

    public function addVehiculo(Vehiculo $vehiculo)
    {
        $this->vehiculos = $this->vehiculos->add($vehiculo);
    }

    public function setTickets(ContratoTickets $tickets)
    {
        $this->tickets = $tickets;
    }

    /**
     * @param ContratoVales $vales
     */
    public function setVales(ContratoVales $vales): void
    {
        $this->vales = $vales;
    }

    private function addContratoTickets(Ticket $ticket): void
    {
        $this->tickets = $this->tickets->add($ticket);
    }

    private function addContratoVales(Vale $vale): void
    {
        $this->vales = $this->vales->add($vale);
    }

    public function addTicket(TicketId $id, VehiculoId $vehiculoId, MaterialId $materialId, TicketCarga $carga, Serie $serie): ?Ticket
    {

        $vehiculo = $this->vehiculos ? $this->vehiculos->exist($vehiculoId) : null;
        if ($vehiculo == null)
            throw new VehiculoSinContratoException('Atención!, No se puede genera un ticket porque el vehículo no tiene contrato asociado.');

        if (!$this->tipoTransaccion($materialId, TransaccionValueObject::isCarga()))
            throw new TipoTransaccionExeption('Atención!, No se puede generar un ticket un para el tipo de transacción DESCARGA.');


        $detalle = $this->tieneCantidadPendiente($materialId, TransaccionValueObject::isCarga());

        $total = $this->calcularVolumenPendiente($detalle, TransaccionValueObject::isCarga());

        if ($total <= 0)
            throw  new VolumenDisponibleExeption('Atención!, La cantidad de carga ingresada supera el volumen disponible del contrato.');

        if ($total < $carga->value())
            $carga = new TicketCarga($total);

        $material = $detalle->getMaterial();

        if (!$this->tieneTicketPendienteVehiculo($vehiculo->getPlaca()))
            throw new TicketPendienteExeption('Atencion!, El vehiculo ya tiene un ticket pendiente, debe finalizar el ticket pendiente.');

        $ticket = new Ticket(new TicketId($id), $serie, $vehiculo->getPlaca(), $carga, $material->getNombre(), $vehiculo->getConductor()->getNombre(), TicketEstado::isPendiente(), $this->getId());
        $this->addContratoTickets($ticket);
        $volumenPendiente = $detalle->getTermino()->getVolumen() - $ticket->getCarga()->value();
        $message = "Se ha generado un ticket con serie:" . $ticket->getSerie()->value() . " placa:" . $ticket->getPlaca()->value() . " carga:" . $ticket->getCarga()->value() . " material:" . $ticket->getMaterialNombre()->value() . " nombre del conductor:" . $ticket->getConductorNombre()->value() . " volumen pendiente:" . $volumenPendiente . ".";
        return $ticket;

    }


    public function addVale(ValeId $id, VehiculoId $vehiculoId, MaterialId $materialId, TransaccionValueObject $transaccion, Serie $serie, $carga = 0): ?Vale
    {
        $vehiculo = $this->vehiculos ? $this->vehiculos->exist($vehiculoId) : null;
        if ($vehiculo == null)
            throw new VehiculoSinContratoException('Atención!, No se puede genera un vale porque el vehículo no tiene contrato asociado.');

        $detalle = $this->tieneCantidadPendiente($materialId, $transaccion);
        if ($transaccion->equals(TransaccionValueObject::isCarga())) {
            $ticket = $this->buscarTicket($vehiculo->getPlaca(), $detalle->getMaterial()->getNombre());
            $vale = new Vale(new ValeId($id), $serie, $vehiculo->getPlaca(), $vehiculo->getCapacidad(), $ticket->getCarga(), $ticket->getMaterialNombre(), $ticket->getConductorNombre(), $vehiculo->getConductor()->getIdentificacion(), $transaccion, ValeEstado::isFinalizado(), $this->getId(), $ticket->getInput());
        } else {
            $total = $this->calcularVolumenPendiente($detalle, TransaccionValueObject::isDescarga());
            if ($total <= 0)
                throw  new VolumenDisponibleExeption('Atención!, La cantidad de carga ingresada supera el volumen disponible del contrato.');

            $carga = $vehiculo->getCapacidad()->value();
            if ($total < $vehiculo->getCapacidad()->value())
                $carga = $total;

            $vale = new Vale(new ValeId($id), $serie, $vehiculo->getPlaca(), $vehiculo->getCapacidad(), new TicketCarga($carga), $detalle->getMaterial()->getNombre(), $vehiculo->getConductor()->getNombre(), $vehiculo->getConductor()->getIdentificacion(), $transaccion, ValeEstado::isPendiente(), $this->getId());
        }
        $this->addContratoVales($vale);
        return $vale;
    }


    private function buscarTicket(VehiculoPlaca $vehiculoPlaca, MaterialNombre $materialNombre): ?Ticket
    {
        $ticket = $this->tickets->search(function (Ticket $item) use ($vehiculoPlaca, $materialNombre) {
            return $item->getPlaca() == $vehiculoPlaca and $item->getMaterialNombre() == $materialNombre and $item->getEstado()->equals(TicketEstado::isPendiente());
        });
        return $ticket;
    }

    private function calcularVolumenPendiente(Detalle $detalle, TransaccionValueObject $trasaccion): int
    {
        $tickets = $this->tickets->contarCarga(function (Ticket $item) use ($detalle) {
            return $item->getMaterialNombre() == $detalle->getMaterial()->getNombre() and $item->getEstado()->equals(TicketEstado::isPendiente());
        });

        $vales = $this->vales->contarCarga(function (Vale $item) use ($detalle, $trasaccion) {
            return $item->getMaterial() == $detalle->getMaterial()->getNombre() and $item->getTransaccion()->equals($trasaccion);
        });
        return $detalle->getTermino()->getVolumen() - $vales - $tickets;
    }

    private function tieneTicketPendienteVehiculo(VehiculoPlaca $vehiculoPlaca)
    {
        $ticket = $this->tickets->search(function (Ticket $item) use ($vehiculoPlaca) {
            return $item->getPlaca() == $vehiculoPlaca and $item->getEstado()->equals(TicketEstado::isPendiente());
        });
        return $ticket == null;
    }

    private function tieneCantidadPendiente(MaterialId $materialId, TransaccionValueObject $operacion): Detalle
    {
        $detalle = $this->detalles->search(function (Detalle $item) use ($materialId, $operacion) {
            return $item->getMaterial()->getId()->equals($materialId) && $item->getTransaccion()->equals($operacion);
        });
        return $detalle;
    }

    private function tipoTransaccion(MaterialId $materialId, TransaccionValueObject $operacion)
    {
        $detalle = $this->detalles->search(function (Detalle $item) use ($materialId, $operacion) {
            return $item->getMaterial()->getId()->equals($materialId) && $item->getTransaccion()->equals($operacion);
        });
        return $detalle !== null;
    }

    /**
     * @return array
     */
    public function toArray(): array
    {
        return [
            'id' => $this->getId()->value(),
            'departamento' => $this->getUbicacion()->getDepartamento(),
            'municipio' => $this->getUbicacion()->getMunicipio(),
            'direccion' => $this->getUbicacion()->getDireccion(),
            'fecha' => $this->getFecha()->getYear() . "-" . $this->getFecha()->getMes() . "-" . $this->getFecha()->getDia(),
            'serie_id' => $this->getSerie()->getId()->value(),
            'serie_prefijo' => $this->getSerie()->getPrefijo()->value(),
            'serie_actual' => $this->getSerie()->getActual()->value(),
            'cliente_id' => $this->getClienteId()->value()
        ];
    }

    static function formtArray(array $model): self
    {
        $serie = new Serie(new SerieId($model['objserie']['id']), new SeriePrefijo($model['serie_prefijo']), new SerieActual($model['serie_actual']), new SerieTipo($model['objserie']['tipo']));
        $ubicacion = new ContratoUbicacion($model['municipio'], $model['departamento'], $model['direccion']);
        $aux = explode('-', $model['fecha']);
        $fecha = new ContratoFecha($aux[2], $aux[1], $aux[0]);
        return new self(new ContratoId($model['id']), $serie, $ubicacion, $fecha, new ClienteId($model['cliente_id']));
    }


}
