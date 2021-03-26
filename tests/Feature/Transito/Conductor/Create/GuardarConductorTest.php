<?php

namespace Tests\Feature\Transito\Conductor\Create;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Tests\TestCase;

class GuardarConductorTest extends TestCase
{

    use RefreshDatabase;

    /**
     * @test
     */
    public function testGuardarConductor(): void
    {
        $response = $this->post('api/conductor', [
            'id' => '2445ebff-f217-4c0e-8edb-b59e28ea30a6',
            'identificacion' => '1065848333',
            'nombre' => 'CAMILO',
            'telefono' => '3017764758'
        ]);
        $response->assertStatus(Response::HTTP_CREATED);
    }

    /**
     * @test
     */
    public function testGuardarConductorDuplicado()
    {
        $this->prepareConductorExisting();
        $response = $this->post('api/conductor', [
            'id' => '2445ebff-f217-4c0e-8edb-b59e28ea30a6',
            'identificacion' => '1065848333',
            'nombre' => 'CAMILO',
            'telefono' => '3017764758'
        ]);
        $response->assertStatus(Response::HTTP_BAD_REQUEST);
    }

    public function prepareConductorExisting(): void
    {
        $this->post('api/conductor', [
            'id' => '2445ebff-f217-4c0e-8edb-b59e28ea30a6',
            'identificacion' => '1065848333',
            'nombre' => 'CAMILO',
            'telefono' => '3017764758'
        ]);
    }

}
