<?php


namespace Tests\Feature\Transito\Vehiculo\Update;


use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Tests\TestCase;

class ModificarVehiculoTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @test
     */
    public function testModificarVehiculoCorrectamente(): void
    {
        $this->prepareVehiculoExisting();
        $response = $this->put('api/vehiculo/b2cbdede-7212-4f7d-b22a-fc39e2115f01',[
            'placa' => 'ABC-809',
            'capacidad' => 15,
            'tipo' => 'VOLQUETA',
            'conductor_id' => '2445ebff-f217-4c0e-8edb-b59e28ea30a6'
        ]);
        $response->assertStatus(Response::HTTP_OK);
    }

    protected function prepareVehiculoExisting():void{
        $this->post('api/conductor', [
            'id' => '2445ebff-f217-4c0e-8edb-b59e28ea30a6',
            'identificacion' => '1065848333',
            'nombre' => 'CAMILO',
            'telefono' => 3017764758
        ]);

        $this->post('/api/vehiculo', [
            'id'=>'b2cbdede-7212-4f7d-b22a-fc39e2115f01',
            'placa' => 'ABC-806',
            'capacidad' => 8,
            'tipo' => 'VOLQUETA',
            'conductor_id' => '2445ebff-f217-4c0e-8edb-b59e28ea30a6'
        ]);
    }

}
