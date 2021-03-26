<?php


namespace Cantera\Transito\Vehiculo\Infraestructura\Persistencia;


use Cantera\Transito\Cliente\Dominio\Cliente;
use Cantera\Transito\Conductor\Dominio\Conductor;
use Cantera\Transito\Conductor\Dominio\ConductorId;
use Cantera\Transito\Conductor\Infraestructura\Persistencia\ConductorElquentRepository;
use Cantera\Transito\Contrato\Dominio\Contrato;
use Cantera\Transito\Vehiculo\Dominio\IVehiculoRepository;
use Cantera\Transito\Vehiculo\Dominio\Vehiculo;
use Cantera\Transito\Vehiculo\Dominio\VehiculoAsociado;
use Cantera\Transito\Vehiculo\Dominio\VehiculoId;
use Cantera\Transito\Vehiculo\Dominio\VehiculoPlaca;
use Cantera\Transito\Vehiculo\Infraestructura\Persistencia\Eloquent\VehiculoModel;

class VehiculoEloquentRepository implements IVehiculoRepository
{
    private $model;

    public function __construct()
    {
        $this->model = new VehiculoModel();
    }

    public function all(): array
    {
        $vehiculos = VehiculoModel::all();
        if (count($vehiculos) > 0) {
            foreach ($vehiculos as $item) {
                $item->conductormodel = Conductor::formtArray($item->conductor->attributesToArray());
                $array[] = Vehiculo::formtArray($item->attributesToArray());
            }
        }
        return $array ?? [];
    }

    public function save(Vehiculo $vehiculo): void
    {
        $this->model->fill($vehiculo->toArray());
        $this->model->save();

    }

    public function existe(VehiculoPlaca $placa): bool
    {
        $ban = VehiculoModel::where('placa', $placa)->first();
        return $ban != null ? true : false;
    }


    public function updated(Vehiculo $vehiculo): void
    {
        $this->model = VehiculoModel::find($vehiculo->getId()->value());
        $this->model->fill($vehiculo->toArray());
        $this->model->save();
    }

    public function delete(VehiculoId $id): void
    {
        $this->model = VehiculoModel::find($id->value());
        if (count($this->model->contratos) > 0)
            throw new VehiculoAsociado(new VehiculoPlaca($this->model->placa));
        $this->model->delete();
    }

    public function search(VehiculoId $id): ?Vehiculo
    {
        $vehiculo = VehiculoModel::find($id->value());
        if ($vehiculo != null) {
            $cond = new ConductorElquentRepository();
            $vehiculo->conductormodel = $cond->search(new ConductorId($vehiculo->conductor_id));
            return Vehiculo::formtArray($vehiculo->attributesToArray());
        } else {
            return null;
        }

        // return $vehiculo != null ? Vehiculo::formtArray($vehiculo->attributesToArray()) : null;
    }


    public function findByPlaca(VehiculoPlaca $placa): ?Vehiculo
    {
        $vehiculo = VehiculoModel::where('placa', $placa)->first();
        if ($vehiculo != null) {
            $vehiculo->conductormodel = Conductor::formtArray($vehiculo->conductor->attributesToArray());
            return Vehiculo::formtArray($vehiculo->attributesToArray());
        } else {
            return null;
        }
        // return $vehiculo != null ? Vehiculo::formtArray($vehiculo->attributesToArray()) : null;
    }

    public function contratosVehiculo(VehiculoPlaca $placa): array
    {
        $vehiculo = VehiculoModel::where('placa', $placa)->first();
        if ($vehiculo != null) {
            $contratos = $vehiculo->contratos;
            if (count($contratos) > 0) {
                foreach ($contratos as $item) {
                    $item->objserie = $item->serie->attributesToArray();
                    $item->clienteobj = Cliente::fromArray($item->cliente->attributesToArray());
                    $contrato = Contrato::formtArray($item->attributesToArray());
                    $contrato->setCliente($item->clienteobj);
                    $array[] = $contrato;
                }
            }
        }
        return $array ?? [];

    }
}
