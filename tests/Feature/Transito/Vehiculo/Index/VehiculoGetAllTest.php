<?php


namespace Tests\Feature\Transito\Vehiculo\Index;


use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\Unit\Transito\Conductor\Dominio\ConductorMother;
use Tests\Unit\Transito\Vehiculo\Dominio\VehiculoCapacidadMother;
use Tests\Unit\Transito\Vehiculo\Dominio\VehiculoIdMother;
use Tests\Unit\Transito\Vehiculo\Dominio\VehiculoPlacaMother;

class VehiculoGetAllTest extends TestCase
{
    use RefreshDatabase;

    public function testVehiculoGetAll(): void
    {
        $this->prepareVehiculoExisting();
        $this->prepareVehiculoExisting();
        $response = $this->get('/api/vehiculo');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                [
                    'id',
                    'placa',
                    'capacidad',
                    'tipo',
                    'conductor_id',
                    'conductor'
                ]
            ],
            'mensaje'
        ]);
    }

    public function prepareVehiculoExisting(): void
    {
        $conductor = ConductorMother::random();
        $this->post('api/conductor', [
            'id' => $conductor->getId()->value(),
            'identificacion' => $conductor->getIdentificacion()->value(),
            'nombre' => $conductor->getNombre()->value(),
            'telefono' => $conductor->getTelefono()->value()
        ]);
        $this->post('/api/vehiculo', [
            'id' => VehiculoIdMother::random()->value(),
            'placa' => VehiculoPlacaMother::random()->value(),
            'capacidad' => VehiculoCapacidadMother::random()->value(),
            'tipo' => VehiculoCapacidadMother::random()->value(),
            'conductor_id' => $conductor->getId()->value()
        ]);
    }

}
