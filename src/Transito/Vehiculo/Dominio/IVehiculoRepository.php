<?php


namespace Cantera\Transito\Vehiculo\Dominio;


use Cantera\Transito\Shared\Dominio\IGenericRepository;

interface IVehiculoRepository
{
    public function all(): array;

    public function save(Vehiculo $vehiculo): void;

    public function updated(Vehiculo $vehiculo): void;

    public function delete(VehiculoId $id): void;

    public function search(VehiculoId $id): ?Vehiculo;

    public function findByPlaca(VehiculoPlaca $placa): ?Vehiculo;

    public function existe(VehiculoPlaca $placa): bool;

    public function contratosVehiculo(VehiculoPlaca $placa): array;
}
