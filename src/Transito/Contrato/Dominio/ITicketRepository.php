<?php


namespace Cantera\Transito\Contrato\Dominio;


use Cantera\Transito\Vehiculo\Dominio\VehiculoPlaca;

interface ITicketRepository
{

    public function all(): array;

    public function save(Ticket $ticket, ContratoId $contratoId): void;

    public function update(Ticket $ticket): void;

    public function search(TicketId $id): ?Ticket;

    public function findByPlacaEstado(VehiculoPlaca $placa, TicketEstado $estado): ?Ticket;

}
