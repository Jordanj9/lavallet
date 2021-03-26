<?php


namespace Cantera\Transito\Contrato\Insfraestructura\Persistencia;


use Cantera\Transito\Contrato\Dominio\ContratoId;
use Cantera\Transito\Contrato\Dominio\ITicketRepository;
use Cantera\Transito\Contrato\Dominio\Ticket;
use Cantera\Transito\Contrato\Dominio\TicketEstado;
use Cantera\Transito\Contrato\Dominio\TicketId;
use Cantera\Transito\Contrato\Dominio\TicketInexistente;
use Cantera\Transito\Contrato\Insfraestructura\Persistencia\Eloquent\TicketModel;
use Cantera\Transito\Serie\Infraestructura\Persistencia\Eloquent\SerieModel;
use Cantera\Transito\Vehiculo\Dominio\VehiculoPlaca;

class TicketEloquentRepository implements ITicketRepository
{

    private $model;

    public function __construct()
    {
        $this->model = new TicketModel();
    }

    public function all(): array
    {
        // TODO: Implement all() method.
    }


    public function save(Ticket $ticket, ContratoId $contratoId): void
    {
        $this->model->fill($ticket->toArray());
        $this->model->contrato_id = $contratoId->value();
        $this->model->save();
    }

    public function update(Ticket $ticket): void
    {
        $this->model = TicketModel::find($ticket->getId()->value());
        if ($ticket == null)
            throw new TicketInexistente();

        $this->model->fill($ticket->toArray());
        $this->model->save();
    }


    public function findByPlacaEstado(VehiculoPlaca $placa, TicketEstado $estado): ?Ticket
    {
        $ticket = TicketModel::where([['placa', $placa->value()], ['estado', $estado->value()]])->first();
        if ($ticket != null)
            return $this->map($ticket);

        return null;
    }

    public function search(TicketId $id): ?Ticket
    {
        $ticket = TicketModel::find($id->value());
        if ($ticket != null)
            return $this->map($ticket);

        return null;
    }

    private function map(TicketModel $model): Ticket
    {
        $prefijo = explode('-', $model->serie)[0];
        $serie = SerieModel::where('prefijo', $prefijo)->first();
        $model->serieobj = $serie->attributesToArray();
        return Ticket::fortmArray($model->attributesToArray());
    }
}
