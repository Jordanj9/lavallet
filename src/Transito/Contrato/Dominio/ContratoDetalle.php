<?php

namespace Cantera\Transito\Contrato\Dominio;

use Cantera\Transito\Material\Dominio\MaterialId;
use Cantera\Transito\Material\Dominio\MaterialNombre;
use Cantera\Transito\Shared\Dominio\Collection;

class ContratoDetalle extends Collection
{


    public function __construct(array $items = [])
    {
        parent::__construct($items);
    }


    protected function type(): string
    {
        return Detalle::class;
    }

    public function add(Detalle $detalle)
    {
        return new self(array_merge($this->items(), [$detalle]));
    }

    public function exist(MaterialId $materialId): ?Detalle
    {

        foreach ($this->items() as $item) {
            if ($materialId->equals($item->getMaterial()->getId()))
                return $item;
        }
    }

    public function buscar(MaterialNombre $nombre, TransaccionValueObject $transaccion): ?Detalle
    {

        foreach ($this->items() as $item) {
            if ($nombre->equals($item->getMaterial()->getNombre()) && $transaccion->equals($item->getTransaccion()))
                return $item;
        }
    }

    function search(callable $fn): ?Detalle
    {

        foreach ($this->items() as $item) {
            if ($fn($item))
                return $item;
        }

        return null;
    }

}
