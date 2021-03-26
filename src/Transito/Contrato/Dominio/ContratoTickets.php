<?php


namespace Cantera\Transito\Contrato\Dominio;


use Cantera\Transito\Shared\Dominio\Collection;

class ContratoTickets extends Collection
{

    public function __construct(array $items = [])
    {
        parent::__construct($items);
    }

    protected function type(): string
    {
        return Ticket::class;
    }

    public function add(Ticket $ticket)
    {
        return new self(array_merge($this->items(), [$ticket]));
    }

    public function exist(TicketId $ticketId): ?Ticket
    {
        foreach ($this->items() as $item) {
            if ($ticketId->equals($item->getId()))
                return $item;
        }
    }

    public function search(callable $fn): ?Ticket
    {
        foreach ($this->items() as $item) {
            if ($fn($item))
                return $item;
        }
        return null;
    }

    public function contarCarga(callable $fn): int
    {
        $total = 0;
        foreach ($this->items() as $item) {
            if ($fn($item))
                $total += $item->getCarga()->value();
        }
        return $total;
    }
}
