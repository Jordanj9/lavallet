<?php


namespace Tests\Feature\Transito\Conductor\Update;


use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Tests\TestCase;

class ModificarConductorTest extends TestCase
{

    use RefreshDatabase;

    /**
     * @test
     */
    public function testModificarConductorCorrectamente(): void
    {

        $this->prepareConductorExisting();
        $response = $this->put('api/conductor/2445ebff-f217-4c0e-8edb-b59e28ea30a6', [
            'identificacion' => '1065848333',
            'nombre' => 'CAMILO colon',
            'telefono' => 3187545196
        ]);

        $response->assertStatus(Response::HTTP_OK);
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
