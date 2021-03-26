<?php

namespace Cantera\Transito\Material\Infraestructura\Persistencia\Eloquent;

use Cantera\Transito\Contrato\Insfraestructura\Persistencia\Eloquent\ContratoModel;
use Illuminate\Database\Eloquent\Model;

class MaterialModel extends Model
{
    protected $keyType = 'string';
    protected $table = 'materiales';
    protected $fillable = ['id', 'nombre', 'created_at', 'updated_at'];

    public function contratos()
    {
        return $this->belongsToMany(ContratoModel::class, 'detalles', 'material_id', 'contrato_id')
            ->withPivot('volumen', 'tipo', 'transaccion');
    }
}
