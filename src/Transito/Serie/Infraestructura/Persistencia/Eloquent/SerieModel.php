<?php


namespace Cantera\Transito\Serie\Infraestructura\Persistencia\Eloquent;


use Illuminate\Database\Eloquent\Model;

class SerieModel extends Model
{
    protected $keyType = 'string';
    protected $table = 'series';
    protected $fillable = ['id', 'prefijo', 'actual', 'tipo', 'created_at', 'updated_at'];

}
