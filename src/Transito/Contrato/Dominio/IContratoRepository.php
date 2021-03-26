<?php


namespace Cantera\Transito\Contrato\Dominio;


use Cantera\Transito\Vehiculo\Dominio\VehiculoPlaca;

interface IContratoRepository
{

    public function all(): array;

    public function save(Contrato $contrato): void;

    public function search(ContratoId $contratoId, bool $dependencias = false): ?ContratoBuilder;

    public function findBySerie(string $cadena): array;

}
