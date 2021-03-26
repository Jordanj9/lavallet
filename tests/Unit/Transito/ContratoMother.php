<?php


namespace Tests\Unit\Transito;


use Cantera\Transito\Cliente\Dominio\Cliente;
use Cantera\Transito\Cliente\Dominio\ClienteId;
use Cantera\Transito\Contrato\Dominio\Contrato;
use Cantera\Transito\Contrato\Dominio\ContratoBuilder;
use Cantera\Transito\Contrato\Dominio\ContratoDetalle;
use Cantera\Transito\Contrato\Dominio\ContratoFecha;
use Cantera\Transito\Contrato\Dominio\ContratoId;
use Cantera\Transito\Contrato\Dominio\ContratoSerie;
use Cantera\Transito\Contrato\Dominio\ContratoUbicacion;
use Cantera\Transito\Contrato\Dominio\TerminoValueObject;
use Cantera\Transito\Contrato\Dominio\TransaccionValueObject;
use Cantera\Transito\Material\Dominio\Material;
use Cantera\Transito\Serie\Dominio\Serie;
use Cantera\Transito\Serie\Dominio\SerieId;
use Tests\Unit\Transito\Cliente\Dominio\ClienteIdMother;
use Tests\Unit\Transito\Material\Dominio\MaterialMother;
use Tests\Unit\Transito\Serie\Dominio\SerieMother;


final class ContratoMother
{
    public static function create(ContratoId $id, Serie $serie, ContratoUbicacion $ubicacion, ContratoFecha $fecha, ClienteId $clienteId) :  Contrato{
        $builder = new ContratoBuilder($id,$serie,$ubicacion, $fecha, $clienteId);
        return  $builder->build();
    }

    public static function random() : Contrato {
        $builder = new ContratoBuilder(
            new ContratoId('d8608f70-5b7b-4cc4-bfb9-006378c9600a'),
            SerieMother::random(),
            new ContratoUbicacion('VALLEDUPAR', 'CESAR', 'CLL38#18D-30'),
            new ContratoFecha(5, 10, 2020),
            ClienteIdMother::random()
        );

        $iteraciones = rand(1,5);
        for($i = 0; $i < $iteraciones; $i++) {
            $material = MaterialMother::random();
            $contrato = $builder->addDetalle(
                new TerminoValueObject(8, 'DEFINIDO'),
                new TransaccionValueObject('CARGA'),
                $material)->build();

            $builder->addDetalle(new TerminoValueObject(8, 'DEFINIDO'), new TransaccionValueObject('CARGA'), $material);
        }
        return $builder->build();
    }

    public static function contratoConUnSoloDetalle(TerminoValueObject $termino, TransaccionValueObject $transaccion, Material $material) : Contrato {

        $builder = new ContratoBuilder(
            new ContratoId('d8608f70-5b7b-4cc4-bfb9-006378c9600a'),
            SerieMother::random(),
            new ContratoUbicacion('VALLEDUPAR', 'CESAR', 'CLL38#18D-30'),
            new ContratoFecha(5, 10, 2020),
            ClienteIdMother::random()
        );

        $builder->addDetalle($termino,$transaccion,$material);

        return $builder->build();
    }
}
