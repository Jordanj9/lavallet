<?php

namespace Cantera\Transito\Contrato\Insfraestructura\Persistencia;

use Cantera\Transito\Cliente\Dominio\Cliente;
use Cantera\Transito\Conductor\Dominio\Conductor;
use Cantera\Transito\Conductor\Infraestructura\Persistencia\Eloquent\ConductorModel;
use Cantera\Transito\Contrato\Dominio\Contrato;
use Cantera\Transito\Contrato\Dominio\ContratoBuilder;
use Cantera\Transito\Contrato\Dominio\ContratoDetalle;
use Cantera\Transito\Contrato\Dominio\ContratoId;
use Cantera\Transito\Contrato\Dominio\ContratoVehiculo;
use Cantera\Transito\Contrato\Dominio\IContratoRepository;
use Cantera\Transito\Contrato\Insfraestructura\Persistencia\Eloquent\ContratoModel;
use Cantera\Transito\Serie\Infraestructura\Persistencia\Eloquent\SerieModel;
use Illuminate\Database\Eloquent\Model;

class ContratoEloquentRepository implements IContratoRepository
{
    private $model;

    public function __construct()
    {
        $this->model = new ContratoModel();
    }

    public function all(): array
    {
        $contratos = ContratoModel::orderBy('serie_actual', 'DESC')->get();
        if (count($contratos) > 0) {
            foreach ($contratos as $item) {
                $item->clienteobj = Cliente::fromArray($item->cliente->attributesToArray());
                $item->objserie = $item->serie->attributesToArray();
                $contrato = Contrato::formtArray($item->attributesToArray());
                $contrato->setCliente($item->clienteobj);
                $array[] = $contrato;
            }
        }
        return $array ?? [];
    }

    public function save(Contrato $contrato): void
    {
        $modelo = ContratoModel::find($contrato->getId()->value());
        if ($modelo != null) $this->model = $modelo;
        $this->model->fill($contrato->toArray());
        $this->model->save();
        $this->syncDetalles($contrato->getDetalles());
        $this->syncVehiculos($contrato->getVehiculos());
        //$this->syncTickets($contrato->getTickets());
    }


    public function search(ContratoId $contratoId, bool $dependencias = false): ?ContratoBuilder
    {
        $contrato = ContratoModel::find($contratoId->value());

        if ($contrato != null) {
            $contrato->objserie = $contrato->serie->attributesToArray();

            if ($dependencias) {
                $builder = $this->dependencias($contrato);
                $cliente = Cliente::fromArray($contrato->cliente->attributesToArray());
                $builder->addCliente($cliente);
                return $builder;
            }
            return ContratoBuilder::formtArray($contrato->attributesToArray());
        } else {
            return null;
        }
    }

    public function findBySerie(string $cadena): array
    {
        $contratos = ContratoModel::where('serie_prefijo', 'like', "%$cadena%")->orWhere('serie_actual', 'like', "%$cadena%")->get();
        if (count($contratos) > 0) {
            foreach ($contratos as $item) {
                $item->objserie = $item->serie->attributesToArray();
                $array[] = Contrato::formtArray($item->attributesToArray());
            }
        }
        return $array ?? [];
    }


    private function dependencias(ContratoModel $model): ContratoBuilder
    {

        $detalles = $model->materials;
        $vehiculos = $model->vehiculos;
        $arrayDetalles = $arrayVehiculos = $arrayTickets = $arrayVales = null;
        if (count($detalles) > 0) {
            foreach ($detalles as $de) {
                $arrayDetalles[] = [
                    'material' => ['id' => $de->id, 'nombre' => $de->nombre],
                    'termino' => ['volumen' => $de->pivot->volumen, 'tipo' => $de->pivot->tipo],
                    'transaccion' => $de->pivot->transaccion
                ];
            }
            $model->contrato_detalles = $arrayDetalles;
        }
        if (count($vehiculos) > 0) {
            foreach ($vehiculos as $ve) {
                $arrayVehiculos[] = [
                    'id' => $ve->id,
                    'placa' => $ve->placa,
                    'capacidad' => $ve->capacidad,
                    'tipo' => $ve->tipo,
                    'conductor_id' => $ve->conductor_id,
                    'conductormodel' => Conductor::formtArray(ConductorModel::find($ve->conductor_id)->attributesToArray())
                ];
            }
            $model->contrato_vehiculos = $arrayVehiculos;
        }

        if (count($model->tickets) > 0) {
            foreach ($model->tickets as $ticket) {
                $ticket->serieobj = $this->map($ticket);
                $arrayTickets[] = $ticket->attributesToArray();
            }
        }
        $model->contrato_tickets = $arrayTickets;

        if (count($model->vales) > 0) {
            foreach ($model->vales as $vale) {
                $vale->serieobj = $this->map($vale);
                $arrayVales[] = $vale->attributesToArray();
            }
        }

        $model->contrato_vales = $arrayVales;

        return ContratoBuilder::formtArray($model->attributesToArray());
    }

    private function syncDetalles(ContratoDetalle $detalles): void
    {
        foreach ($detalles as $detalle) {
            $array[] = [
                'material_id'=>$detalle->getMaterial()->getId()->value(),
                'volumen' => $detalle->getTermino()->getVolumen(),
                'tipo' => $detalle->getTermino()->getTipo(),
                'transaccion' => $detalle->getTransaccion()->value()
            ];
        }
//        dd($array);
        $this->model->materials()->detach();
        $this->model->materials()->attach($array);
    }

    private function syncVehiculos(ContratoVehiculo $vehiculos): void
    {
        $array = null;
        foreach ($vehiculos as $vehiculo) {
            $array[] = $vehiculo->getId()->value();
        }
        if ($array != null) $this->model->vehiculos()->sync($array);
    }

    private function map(Model $model): array
    {
        $prefijo = explode('-', $model->serie)[0];
        $serie = SerieModel::where('prefijo', $prefijo)->first();
        return $serie->attributesToArray();
    }


}
