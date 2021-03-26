<?php


namespace Cantera\Transito\Cliente\Infraestructura\Persistencia\Eloquent;


use Cantera\Transito\Contrato\Insfraestructura\Persistencia\Eloquent\ContratoModel;
use Illuminate\Database\Eloquent\Model;

class ClienteModel extends Model
{
    protected $keyType = 'string';
    protected $table = 'clientes';
    protected $fillable = ['id', 'identificacion', 'nombre', 'telefono', 'municipio', 'departamento', 'direccion', 'tipo', 'correo', 'created_at', 'updated_at'];

    public function contratos()
    {
        return $this->hasMany(ContratoModel::class, 'cliente_id');
    }
}
