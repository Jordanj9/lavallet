<?php


namespace Cantera\Transito\Municipio\Infraestructura\Eloquent;


use Cantera\Transito\Departamento\Infraestructura\Persistencia\Eloquent\DepartamentoModel;
use Illuminate\Database\Eloquent\Model;

class MunicipioModel extends Model
{
    protected $table = 'municipios';
    protected $fillable = ['id', 'nombre', 'departamento_id', 'created_at', 'updated_at'];

    public function departamento()
    {
        return $this->belongsTo(DepartamentoModel::class);
    }

}
