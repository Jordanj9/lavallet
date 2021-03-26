<?php

namespace Cantera\Transito\Material\Infraestructura\Persistencia;

use Cantera\Transito\Material\Dominio\IMaterialRepository;
use Cantera\Transito\Material\Dominio\Material;
use Cantera\Transito\Material\Dominio\MaterialAsociado;
use Cantera\Transito\Material\Dominio\MaterialId;
use Cantera\Transito\Material\Dominio\MaterialNombre;
use Cantera\Transito\Material\Infraestructura\Persistencia\Eloquent\MaterialModel;

final class MaterialEloquentRepository implements IMaterialRepository
{

    private $model;

    public function __construct()
    {
        $this->model = new MaterialModel();
    }


    public function all(): array
    {
        $materiales = MaterialModel::all();
        if (count($materiales) > 0) {
            foreach ($materiales as $item) {
                $array[] = Material::formtArray($item->attributesToArray());
            }
        }
        return $array ?? [];
    }

    /**
     * @param Material $material
     */
    public function save(Material $material): void
    {
        $this->model->fill($material->toArray());
        $this->model->save();
    }

    /**
     * @param Material $material
     */
    public function updated(Material $material): void
    {
        $this->model = MaterialModel::find($material->getId()->value());
        $this->model->nombre = $material->getNombre()->value();
        $this->model->save();
    }

    /**
     * @param MaterialId $id
     */
    public function delete(MaterialId $id): void
    {
        $this->model = MaterialModel::find($id->value());
        if (count($this->model->contratos) > 0)
            throw new MaterialAsociado(new MaterialNombre($this->model->nombre));
        $this->model->delete();
    }

    /**
     * @param MaterialId $id
     * @return bool
     */
    public function existe(MaterialId $id): bool
    {
        $ban = MaterialModel::find($id->value());
        return $ban != null ? true : false;
    }

    public function search(MaterialId $id): ?Material
    {
        $material = MaterialModel::find($id->value());
        $mat = $material != null ? Material::formtArray($material->attributesToArray()) : null;
        return $mat;
    }


    public function find(MaterialId $id): ?Material
    {
        $material = null;
        if ($this->existe($id)) {
            $this->model = MaterialModel::find($id->value());
            $material = new Material(new MaterialId($this->model->id), new MaterialNombre($this->model->nombre));
        }
        return $material;
    }

    public function findByNombre(MaterialNombre $nombre): ?Material
    {
        $material = MaterialModel::where('nombre', $nombre->value())->first();
        return $material != null ? Material::formtArray($material->attributesToArray()) : null;
    }

}
