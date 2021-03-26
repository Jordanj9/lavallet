<?php


namespace Cantera\Transito\Vehiculo\Infraestructura\Persistencia\Eloquent;


use Cantera\Transito\Conductor\Infraestructura\Persistencia\Eloquent\ConductorModel;
use Cantera\Transito\Contrato\Insfraestructura\Persistencia\Eloquent\ContratoModel;
use Illuminate\Database\Eloquent\Model;

class VehiculoModel extends Model
{
    protected $keyType = 'string';
    protected $table = 'vehiculos';
    protected $fillable = ['id', 'placa', 'capacidad', 'tipo', 'conductor_id', 'created_at', 'updated_at'];

    public function contratos()
    {
        return $this->belongsToMany(ContratoModel::class, 'contrato_vehiculos', 'vehiculo_id', 'contrato_id')
            ->withTimestamps();
    }

    public function conductor()
    {
        return $this->belongsTo(ConductorModel::class);
    }
}
