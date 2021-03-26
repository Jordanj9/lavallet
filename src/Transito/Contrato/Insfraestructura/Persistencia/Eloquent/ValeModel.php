<?php


namespace Cantera\Transito\Contrato\Insfraestructura\Persistencia\Eloquent;


use Illuminate\Database\Eloquent\Model;

class ValeModel extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;
    protected $table = 'vales';
    protected $fillable = ['id', 'serie', 'placa', 'capacidad', 'carga', 'material', 'conductor', 'identificacion', 'transaccion', 'estado', 'input', 'output', 'contrato_id', 'created_at', 'updated_at'];

    public function contrato()
    {
        return $this->belongsTo(ContratoModel::class);
    }

}
