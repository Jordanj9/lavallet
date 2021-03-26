<?php

namespace Tests\Feature\Transito\Conductor\Index;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Unit\Transito\Conductor\Dominio\ConductorIdentificacionMother;
use Tests\Unit\Transito\Conductor\Dominio\ConductorIdMother;
use Tests\Unit\Transito\Conductor\Dominio\ConductorNombreMother;
use Tests\Unit\Transito\Conductor\Dominio\ConductorTelefonoMother;

use Tests\TestCase;

class ConductorGetAllTest extends TestCase
{

    use RefreshDatabase;

    public function testConductorGetAll(): void
    {
        $this->prepareCoductorExisting();
        $response = $this->get('api/conductor');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                [
                    'id',
                    'identificacion',
                    'nombre',
                    'telefono'
                ]
            ],
            'mensaje'
        ]);
    }

    public function prepareCoductorExisting(): void
    {
        $this->post('api/conductor', [
            'id' => ConductorIdMother::random(),
            'identificacion' => ConductorIdentificacionMother::random(),
            'nombre' => ConductorNombreMother::random(),
            'telefono' => ConductorTelefonoMother::random()
        ]);

    }

}
