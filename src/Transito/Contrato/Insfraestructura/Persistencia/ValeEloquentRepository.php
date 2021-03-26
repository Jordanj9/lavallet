<?php


namespace Cantera\Transito\Contrato\Insfraestructura\Persistencia;


use Cantera\Transito\Contrato\Dominio\ContratoId;
use Cantera\Transito\Contrato\Dominio\IValeRepository;
use Cantera\Transito\Contrato\Dominio\Vale;
use Cantera\Transito\Contrato\Dominio\ValeEstado;
use Cantera\Transito\Contrato\Dominio\ValeId;
use Cantera\Transito\Contrato\Dominio\ValeInexistente;
use Cantera\Transito\Contrato\Insfraestructura\Persistencia\Eloquent\ValeModel;
use Cantera\Transito\Serie\Infraestructura\Persistencia\Eloquent\SerieModel;
use Cantera\Transito\Vehiculo\Dominio\VehiculoPlaca;
use Illuminate\Support\Facades\DB;
use SplObjectStorage;

class ValeEloquentRepository implements IValeRepository
{
    private $model;

    public function __construct()
    {
        $this->model = new ValeModel();
    }


    public function save(Vale $vale, ContratoId $contratoId): void
    {
        $this->model->fill($vale->toArray());
        $this->model->contrato_id = $contratoId->value();
        $this->model->save();
    }

    public function update(Vale $vale): void
    {
        $this->model = ValeModel::find($vale->getId()->value());
        if ($this->model == null)
            throw new ValeInexistente();

        $this->model->fill($vale->toArray());
        $this->model->save();
    }


    public function findByPlacaEstado(VehiculoPlaca $placa, ValeEstado $estado): ?Vale
    {
        $vale = ValeModel::where([['placa', $placa->value()], ['estado', $estado->value()]])->first();
        if ($vale != null)
            return $this->map($vale);

        return null;
    }


    public function search(ValeId $id): ?Vale
    {
        $vale = ValeModel::find($id->value());
        if ($vale != null)
            return $this->map($vale);

        return null;
    }

    public function ValesByMaterial(string $fechainicio, string $fechafin): array
    {
        $vales = ValeModel::all();
//        $carga=$vales->countBy('transaccion');
        $carga = $vales->countBy(function ($item) {
            if ($item->transaccion == 'CARGA')
                return $item->transaccion;
        });
        $vales = ValeModel::whereBetween('created_at', [$fechainicio, $fechafin])->get();

        $agrupado = $vales->groupBy('material');
        foreach ($agrupado as $key => $value) {
            $total = $value->sum('carga');
            $viajes = $value->countBy('transaccion');
            $total_carga = $value->sum(function ($item) {
                if ($item->transaccion == 'CARGA') return $item->carga;
            });
            $total_descarga = $total - $total_carga;
            $array[$key] = ['total_volumen' => $total, 'total_carga_volumen' => $total_carga, 'viajes_cargas' => isset($viajes['CARGA']) ? $viajes['CARGA'] : 0 , 'total_descarga_volumen' => $total_descarga, 'viajes_descargas' => isset($viajes['DESCARGA']) ? $viajes['DESCARGA']:0
            ];
        }
        return $array ?? [];
    }


    private function map(ValeModel $model): Vale
    {
        $prefijo = explode('-', $model->serie)[0];
        $serie = SerieModel::where('prefijo', $prefijo)->first();
        $model->serieobj = $serie->attributesToArray();
        return Vale::fortmArray($model->attributesToArray());
    }
}
