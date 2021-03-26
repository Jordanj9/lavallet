<?php


namespace Tests\Feature\Transito\Conductor\Delete;


use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Tests\TestCase;

class EliminarConductorTest extends TestCase
{

    use RefreshDatabase;

    /**
     * @test
     */
    public function testEliminarConductorCorrectamente(): void
    {
        $this->post('api/conductor', [
            'id' => '2445ebff-f217-4c0e-8edb-b59e28ea30a6',
            'identificacion' => '1065848333',
            'nombre' => 'CAMILO',
            'telefono' => '3017764758'
        ]);
        $response = $this->delete('api/conductor/2445ebff-f217-4c0e-8edb-b59e28ea30a6');

        $response->assertStatus(Response::HTTP_OK);
    }

}
