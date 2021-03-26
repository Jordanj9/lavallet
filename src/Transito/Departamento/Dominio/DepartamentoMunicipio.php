<?php


namespace Cantera\Transito\Departamento\Dominio;


use Cantera\Transito\Municipio\Dominio\Municipio;
use Cantera\Transito\Shared\Dominio\Collection;

class DepartamentoMunicipio extends Collection
{

    public function __construct(array $items = [])
    {
        parent::__construct($items);
    }

    protected function type(): string
    {
        return Municipio::class;
    }

    public function add(Municipio $municipio)
    {
        return new self(array_merge($this->items(), [$municipio]));
    }

    public function search(callable $fn): ?Municipio
    {

        foreach ($this->items() as $item) {
            if ($fn($item))
                return $item;
        }

        return null;
    }
}
