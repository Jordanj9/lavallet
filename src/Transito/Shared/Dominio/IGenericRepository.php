<?php


namespace Cantera\Transito\Shared\Dominio;


interface IGenericRepository
{
    public function buscar($id,$model):object;
}
