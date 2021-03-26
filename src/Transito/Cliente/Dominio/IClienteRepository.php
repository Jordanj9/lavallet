<?php

namespace Cantera\Transito\Cliente\Dominio;

interface IClienteRepository
{
    public function all(): array;

    public function save(Cliente $cliente): void;

    public function findByIdentificacion(ClienteIdentificacion $identificacion): ?Cliente;

    public function updated(Cliente $cliente): void;

    public function delete(ClienteId $id): void;

    public function search(ClienteId $id): ?Cliente;

    public function findByNombreOrIdentificacion(string $cadena): array;
}
