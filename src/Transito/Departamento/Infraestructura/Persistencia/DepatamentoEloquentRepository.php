<?php


namespace Cantera\Transito\Departamento\Infraestructura\Persistencia;


use Cantera\Transito\Departamento\Dominio\Departamento;
use Cantera\Transito\Departamento\Dominio\IDepartamentoRepository;
use Cantera\Transito\Departamento\Infraestructura\Persistencia\Eloquent\DepartamentoModel;

class DepatamentoEloquentRepository implements IDepartamentoRepository
{
    private $model;

    public function __construct()
    {
        $this->model = new DepartamentoModel();
    }

    public function all(): array
    {
        $deptos = DepartamentoModel::all();
        if (count($deptos) > 0) {
            foreach ($deptos as $item) {
                $item->mun = $this->llenarMunicipios($item);

                $array[] = Departamento::formtArray($item->attributesToArray());
            }
        }
        return $array ?? [];
    }

    private function llenarMunicipios(DepartamentoModel $model)
    {
        if (count($model->municipios) > 0)
            $array = null;
        foreach ($model->municipios as $item) {
            $array[] = ['id' => $item->id, 'nombre' => $item->nombre, 'departamento_id' => $item->departamento_id];
        }
        return $array ?? null;
    }
}
