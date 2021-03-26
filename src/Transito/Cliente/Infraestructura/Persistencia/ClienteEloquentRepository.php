<?php


namespace Cantera\Transito\Cliente\Infraestructura\Persistencia;

use Cantera\Transito\Cliente\Dominio\Cliente;
use Cantera\Transito\Cliente\Dominio\ClienteAsociado;
use Cantera\Transito\Cliente\Dominio\ClienteId;
use Cantera\Transito\Cliente\Dominio\ClienteIdentificacion;
use Cantera\Transito\Cliente\Dominio\ClienteNombre;
use Cantera\Transito\Cliente\Dominio\IClienteRepository;
use Cantera\Transito\Cliente\Infraestructura\Persistencia\Eloquent\ClienteModel;

class ClienteEloquentRepository implements IClienteRepository
{
    private $model;

    public function __construct()
    {
        $this->model = new ClienteModel();
    }

    public function all(): array
    {
        $clientes = ClienteModel::all();
        if (count($clientes) > 0) {
            foreach ($clientes as $item) {
                $array[] = Cliente::fromArray($item->attributesToArray());
            }
        }
        return $array ?? [];
    }

    public function save(Cliente $cliente): void
    {
        $this->model->fill($cliente->toArray());
        $this->model->save();
    }

    public function updated(Cliente $cliente): void
    {
        $this->model = ClienteModel::find($cliente->id()->value());
        $this->model->fill($cliente->toArray());
        $result = $this->model->save();
    }

    public function delete(ClienteId $id): void
    {
        $this->model = ClienteModel::find($id->value());
        if (count($this->model->contratos) > 0)
            throw new ClienteAsociado(new ClienteNombre($this->model->nombre));
        $this->model->delete();
    }

    public function search(ClienteId $id): ?Cliente
    {
        $cliente = ClienteModel::find($id->value());
        return $cliente != null ? Cliente::fromArray($cliente->attributesToArray()) : null;
    }


    public function findByIdentificacion(ClienteIdentificacion $identificacion): ?Cliente
    {
        $cliente = ClienteModel::where('identificacion', $identificacion->value())->first();
        return $cliente != null ? Cliente::fromArray($cliente->attributesToArray()) : null;
    }


    public function findByNombreOrIdentificacion(string $cadena): array
    {
        $clientes = ClienteModel::where('nombre', 'like', "%$cadena%")->orWhere('identificacion', 'like', "%$cadena%")->get();
        if (count($clientes) > 0) {
            foreach ($clientes as $item) {
                $array[] = Cliente::fromArray($item->attributesToArray());
            }
        }
        return $array ?? [];
    }
}
