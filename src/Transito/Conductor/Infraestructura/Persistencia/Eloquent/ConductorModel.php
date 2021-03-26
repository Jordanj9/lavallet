<?php

namespace Cantera\Transito\Conductor\Infraestructura\Persistencia\Eloquent;

use Cantera\Transito\Vehiculo\Infraestructura\Persistencia\Eloquent\VehiculoModel;
use Illuminate\Database\Eloquent\Model;

class ConductorModel extends Model
{

    protected $keyType = 'string';
    protected $table = 'conductores';
    protected $fillable = ['id', 'identificacion', 'nombre', 'telefono', 'created_at', 'updated_at'];

    public function vehiculos()
    {
        return $this->hasMany(VehiculoModel::class,'conductor_id');
    }
}
