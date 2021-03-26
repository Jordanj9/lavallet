<?php


namespace Cantera\Transito\Contrato\Dominio;


use Cantera\Transito\Vehiculo\Dominio\VehiculoPlaca;

interface IValeRepository
{
    public function save(Vale $vale, ContratoId $contratoId): void;

    public function update(Vale $vale): void;

    public function search(ValeId $id): ?Vale;

    public function findByPlacaEstado(VehiculoPlaca $placa, ValeEstado $estado): ?Vale;

    public function ValesByMaterial(string $fechainicio, string $fechafin): array;
}
