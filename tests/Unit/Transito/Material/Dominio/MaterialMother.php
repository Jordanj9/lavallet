<?php

namespace Tests\Unit\Transito\Material\Dominio;

use Cantera\Transito\Material\Aplicacion\MaterialRequest;
use Cantera\Transito\Material\Dominio\Material;
use Cantera\Transito\Material\Dominio\MaterialId;
use Cantera\Transito\Material\Dominio\MaterialNombre;

class MaterialMother
{

    public static function create(MaterialId $id, MaterialNombre $nombre)
    {
        return new Material($id, $nombre);
    }

    public static function fromRequest(MaterialRequest $request)
    {
        return new Material(new MaterialId($request->getId()), new MaterialNombre($request->getNombre()));
    }

    public static function random(): Material
    {
        return self::create(
            MaterialIdMother::random(),
            MaterialNombreMother::random(),
        );
    }
}
