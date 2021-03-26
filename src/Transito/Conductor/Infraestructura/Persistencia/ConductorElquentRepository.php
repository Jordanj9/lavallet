<?php

namespace Cantera\Transito\Conductor\Infraestructura\Persistencia;

use Cantera\Transito\Conductor\Dominio\Conductor;
use Cantera\Transito\Conductor\Dominio\ConductorAsociado;
use Cantera\Transito\Conductor\Dominio\ConductorId;
use Cantera\Transito\Conductor\Dominio\ConductorIdentificacion;
use Cantera\Transito\Conductor\Dominio\ConductorNombre;
use Cantera\Transito\Conductor\Dominio\IConductorRepository;
use Cantera\Transito\Conductor\Infraestructura\Persistencia\Eloquent\ConductorModel;

class ConductorElquentRepository implements IConductorRepository
{

    private $model;

    public function __construct()
    {
        $this->model = new ConductorModel();
    }

    public function all(): array
    {
        $conductores = ConductorModel::all();
        if (count($conductores) > 0) {
            foreach ($conductores as $item) {
                $array[] = Conductor::formtArray($item->attributesToArray());
            }
        }
        return $array ?? [];
    }

    public function findByIdentificacion(ConductorIdentificacion $identificacion): ?Conductor
    {
        $conductor = ConductorModel::where('identificacion', $identificacion->value())->first();
        return $conductor != null ? Conductor::formtArray($conductor->attributesToArray()) : null;
    }

    public function save($conductor): void
    {
        $this->model->fill($conductor->toArray());
        $this->model->save();
    }

    /**
     * @param Conductor $conductor
     */
    public function updated(Conductor $conductor): void
    {
        $this->model = ConductorModel::find($conductor->getId()->value());
        $this->model->fill($conductor->toArray());
        $this->model->save();
    }

    public function delete(ConductorId $id): void
    {
        $this->model = ConductorModel::find($id->value());
        if (count($this->model->vehiculos) > 0)
            throw new ConductorAsociado(new ConductorNombre($this->model->nombre));
        $this->model->delete();
    }


    public function search(ConductorId $id): ?Conductor
    {
        $conductor = ConductorModel::find($id->value());
        return $conductor != null ? Conductor::formtArray($conductor->attributesToArray()) : null;
    }

    public function existe(ConductorIdentificacion $identificacion): bool
    {
        $ban = ConductorModel::find($identificacion->value());
        return $ban != null;
    }
}
