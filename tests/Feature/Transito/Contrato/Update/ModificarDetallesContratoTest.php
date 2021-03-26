<?php


namespace Tests\Feature\Transito\Contrato\Update;


use Cantera\Transito\Cliente\Infraestructura\Persistencia\Eloquent\ClienteModel;
use Cantera\Transito\Serie\Infraestructura\Persistencia\Eloquent\SerieModel;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Tests\Feature\Transito\Contrato\Create\GenerarContratoTest;
use Tests\TestCase;
use Tests\Unit\Transito\Cliente\Dominio\ClienteMother;
use Tests\Unit\Transito\Cliente\Dominio\ClienteUbicacionMother;
use Tests\Unit\Transito\ContratoMother;
use Tests\Unit\Transito\Material\Dominio\MaterialMother;
use Tests\Unit\Transito\Serie\Dominio\SerieMother;

class ModificarDetallesContratoTest extends TestCase
{

    use RefreshDatabase;

    public function testModificarDetallesContratoCorrectamente(): void
    {
//        $cliente = ClienteMother::random();
//        factory(ClienteModel::class)->create($cliente->toArray());
//        $serie = SerieMother::random();
//        factory(SerieModel::class)->create($serie->toArray());
        $contrato = ContratoMother::random();
        $id = $this->prepareContratoExisting();
        $response = $this->putJson('api/contrato/' . $contrato->getId()->value(), [
            'id' => $contrato->getId()->value(),
            'detalles' => [
                ['material' => $this->prepareMaterialExisting(), 'termino' => ['volumen' => rand(1, null), 'tipo' => 'DEFINIDO'], 'transaccion' => 'CARGA'],
                ['material' => $this->prepareMaterialExisting(), 'termino' => ['volumen' => rand(1, null), 'tipo' => 'DEFINIDO'], 'transaccion' => 'DESCARGA'],
                ['material' => $this->prepareMaterialExisting(), 'termino' => ['volumen' => rand(1, null), 'tipo' => 'DEFINIDO'], 'transaccion' => 'CARGA'],
            ],
            'vehiculos' => [
                ['id' => 'ceb1e15a-500c-4a1d-9182-ee75be402059'],
                ['id' => '80b8c3a6-0701-4b82-a7db-83e97c8b541f']
            ]
        ]);
        $response->assertStatus(Response::HTTP_NOT_FOUND);
    }


    public function prepareContratoExisting(){
        $cliente = ClienteMother::random();
        factory(ClienteModel::class)->create($cliente->toArray());
        $serie = SerieMother::random();
        factory(SerieModel::class)->create($serie->toArray());
        $ubicacion = ClienteUbicacionMother::random();
        $id = '44617016-170a-45ea-9bcb-de3750503fc1';
        $response = $this->postJson('api/contrato', [
            'id' => $id,
            'cliente_id' => $cliente->id()->value(),
            'ubicacion' => [
                'departamento' => $ubicacion->getDepartamento(),
                'municipio' => $ubicacion->getMunicipio(),
                'direccion' => $ubicacion->getDireccion()
            ],
            'serie' => [
                'id' => $serie->getId()->value(),
                'prefijo' => $serie->getPrefijo()->value(),
                'actual' => $serie->getActual()->value(),
                'tipo' => $serie->getTipo()->value()
            ],
            'fecha' => '03/05/2020',
            'detalles' => [
                ['material' => $this->prepareMaterialExisting(), 'termino' => ['volumen' => rand(1, null), 'tipo' => 'DEFINIDO'], 'transaccion' => 'CARGA'],
                ['material' => $this->prepareMaterialExisting(), 'termino' => ['volumen' => rand(1, null), 'tipo' => 'DEFINIDO'], 'transaccion' => 'DESCARGA'],
                ['material' => $this->prepareMaterialExisting(), 'termino' => ['volumen' => rand(1, null), 'tipo' => 'DEFINIDO'], 'transaccion' => 'CARGA'],
            ],
            'vehiculos' => [
                ['id' => 'ceb1e15a-500c-4a1d-9182-ee75be402059']
            ]
        ]);
        return $id;
    }
    public function prepareMaterialExisting()
    {
        $material = MaterialMother::random();
        $this->post('/api/material', [
            'id' => $material->getId()->value(),
            'nombre' => $material->getNombre()->value()
        ]);
        return $material->getId()->value();
    }
}
