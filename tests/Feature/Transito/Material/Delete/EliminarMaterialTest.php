<?php


namespace Tests\Feature\Transito\Material\Delete;


use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Tests\TestCase;

class EliminarMaterialTest extends TestCase
{

    use RefreshDatabase;

    /**
     * @test
     */
    public function testEliminarMaterialCorrectamente(): void
    {
        $this->post('/api/material', [
            'id' => '018ffe8d-178e-4684-892a-d7f44e972c62',
            'nombre' => 'RELLENO'
        ]);

        $response = $this->delete('api/material/018ffe8d-178e-4684-892a-d7f44e972c62');
        $response->assertStatus(Response::HTTP_OK);
    }
}
