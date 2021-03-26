<?php

namespace Cantera\Transito\Serie\Dominio;

interface ISerieRepository
{
    /**
     * @param string $type
     * @return Serie|null
     */
    public function buscarPorTipo(string $type): ?Serie;

    public function save(Serie $serie): void;

    public function exist(SerieTipo $tipo): bool;

    public function update(Serie $serie): void;

    public function incrementrarSerie(SerieId $serieId): ?Serie;
}
