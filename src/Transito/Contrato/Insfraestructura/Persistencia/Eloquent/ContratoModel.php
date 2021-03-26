<?php


namespace Cantera\Transito\Contrato\Insfraestructura\Persistencia\Eloquent;


use Cantera\Transito\Cliente\Infraestructura\Persistencia\Eloquent\ClienteModel;
use Cantera\Transito\Material\Infraestructura\Persistencia\Eloquent\MaterialModel;
use Cantera\Transito\Serie\Infraestructura\Persistencia\Eloquent\SerieModel;
use Cantera\Transito\Vehiculo\Infraestructura\Persistencia\Eloquent\VehiculoModel;
use Illuminate\Database\Eloquent\Model;

class ContratoModel extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;
    protected $table = 'contratos';
    protected $fillable = ['id', 'departamento', 'municipio', 'direccion', 'fecha', 'serie_prefijo', 'serie_actual', 'serie_id', 'cliente_id', 'created_at', 'updated_at'];

    public function materials()
    {
        return $this->belongsToMany(MaterialModel::class, 'detalles', 'contrato_id', 'material_id')
            ->withPivot('volumen', 'tipo', 'transaccion')
            ->withTimestamps();
    }

    public function vehiculos()
    {
        return $this->belongsToMany(VehiculoModel::class, 'contrato_vehiculos', 'contrato_id', 'vehiculo_id')
            ->withTimestamps();
    }

    public function cliente()
    {
        return $this->belongsTo(ClienteModel::class);
    }

    public function serie()
    {
        return $this->belongsTo(SerieModel::class);
    }

    public function tickets()
    {
        return $this->hasMany(TicketModel::class, 'contrato_id');
    }

    public function vales()
    {
        return $this->hasMany(ValeModel::class, 'contrato_id');
    }

}
