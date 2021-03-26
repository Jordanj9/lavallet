<?php


namespace Cantera\Transito\Contrato\Dominio;


use Cantera\Transito\Shared\Dominio\Collection;

class ContratoVales extends Collection
{

    public function __construct(array $items = [])
    {
        parent::__construct($items);
    }

    protected function type(): string
    {
        return Vale::class;
    }

    public function add(Vale $vale)
    {
        return new self(array_merge($this->items(), [$vale]));
    }

    public function search(callable $fn): ?Vale
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

    public function getValeByFecha(string $fechainicio, string $fechafin): array
    {
        $array = [];
        foreach ($this->items() as $item) {
            if ($item->getFecha() >= $fechainicio && $item->getFecha() <= $fechafin)
                $array[] = $item;
        }
        return $array;
    }
}
