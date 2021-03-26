<?php


namespace Cantera\Transito\Departamento\Infraestructura\Persistencia\Eloquent;


use Cantera\Transito\Municipio\Infraestructura\Eloquent\MunicipioModel;
use Illuminate\Database\Eloquent\Model;

class DepartamentoModel extends Model
{
    protected $table = 'departamentos';
    protected $fillable = ['id', 'nombre', 'created_at', 'updated_at'];

    public function municipios()
    {
        return $this->hasMany(MunicipioModel::class, 'departamento_id');
    }
}
