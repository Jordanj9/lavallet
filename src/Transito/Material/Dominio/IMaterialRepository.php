<?php

namespace Cantera\Transito\Material\Dominio;

use Cantera\Transito\Shared\Dominio\IGenericRepository;

interface IMaterialRepository
{
    public function all(): array;

    public function save(Material $material): void;

    public function updated(Material $material): void;

    public function delete(MaterialId $id): void;

    public function findByNombre(MaterialNombre $nombre): ?Material;

    public function existe(MaterialId $id): bool;

    public function find(MaterialId $id): ?Material;

    public function search(MaterialId $id): ?Material;
}
