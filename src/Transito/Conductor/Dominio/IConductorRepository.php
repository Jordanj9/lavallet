<?php

namespace Cantera\Transito\Conductor\Dominio;


interface IConductorRepository
{

    public function all(): array;

    public function save(Conductor $conductor): void;

    public function updated(Conductor $conductor): void;

    public function delete(ConductorId $id): void;

    public function findByIdentificacion(ConductorIdentificacion $identificacion): ?Conductor;

    public function search(ConductorId $id): ?Conductor;

    public function existe(ConductorIdentificacion $identificacion): bool;

}
