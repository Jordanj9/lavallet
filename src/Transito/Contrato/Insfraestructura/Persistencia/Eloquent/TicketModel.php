<?php


namespace Cantera\Transito\Contrato\Insfraestructura\Persistencia\Eloquent;


use Illuminate\Database\Eloquent\Model;

class TicketModel extends Model
{

    protected $keyType = 'string';
    public $incrementing = false;
    protected $table = 'tickets';
    protected $fillable = ['id', 'serie', 'placa', 'carga', 'material', 'conductor', 'estado', 'input', 'output', 'contrato_id', 'created_at', 'updated_at'];

    public function contrato()
    {
        return $this->belongsTo(ContratoModel::class);
    }
}
