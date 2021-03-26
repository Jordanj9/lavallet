<?php


namespace Cantera\Transito\Serie\Infraestructura\Persistencia;


use Cantera\Transito\Serie\Dominio\ISerieRepository;
use Cantera\Transito\Serie\Dominio\Serie;
use Cantera\Transito\Serie\Dominio\SerieDuplicada;
use Cantera\Transito\Serie\Dominio\SerieId;
use Cantera\Transito\Serie\Dominio\SerieNoExiste;
use Cantera\Transito\Serie\Dominio\SerieTipo;
use Cantera\Transito\Serie\Infraestructura\Persistencia\Eloquent\SerieModel;

class SerieEloquentRepository implements ISerieRepository
{

    private $model;

    public function __construct()
    {
        $this->model = new SerieModel();
    }

    public function save(Serie $serie): void
    {
        $existe = $this->exist($serie->getTipo());
        if ($existe)
            throw new SerieDuplicada($serie->getTipo());

        $this->model->fill($serie->toArray());
        $this->model->save();

    }

    public function buscarPorTipo(string $type): ?Serie
    {
        $serie = SerieModel::where('tipo', $type)->first();
        return $serie != null ? Serie::formtArray($serie->attributesToArray()) : null;
    }

    public function exist(SerieTipo $tipo): bool
    {
        $existe = SerieModel::where('tipo', $tipo->value())->first();

        return $existe == null ? false : true;
    }


    public function update(Serie $serie): void
    {
        $this->model = SerieModel::find($serie->getId()->value());
        $this->model->fill($serie->toArray());
        $this->model->save();
    }

    public function incrementrarSerie(SerieId $serieId): ?Serie
    {
        $this->model = SerieModel::find($serieId->value());
        if ($this->model == null)
            throw new SerieNoExiste($serieId);

        $this->model->actual = $this->model->actual + 1;
        //$this->model->save();
        return Serie::formtArray($this->model->attributesToArray());
    }
}
