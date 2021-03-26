<?php


namespace Tests\Feature\Transito\Material\Update;


use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Tests\TestCase;

class ModificarMaterialTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @test
     */
    public function testModificarMaterialCorrectamente(): void
    {
        $this->prepareMaterialExisting();

        $response = $this->put('api/material/018ffe8d-178e-4684-892a-d7f44e972c62', [
            'nombre' => 'RELLENO edit'
        ]);

        $response->assertStatus(Response::HTTP_OK);
    }

    public function testModificarMaterialDuplicado():void{
        $this->prepareMaterialExisting();
        $response = $this->put('api/material/6ecb5422-980a-4d01-9dee-62c53d4eaccb', [
            'nombre' => 'RELLENO'
        ]);
        $response->assertStatus(Response::HTTP_BAD_REQUEST);
    }

    public function prepareMaterialExisting(): void
    {
        $this->post('/api/material', [
            'id' => '018ffe8d-178e-4684-892a-d7f44e972c62',
            'nombre' => 'RELLENO'
        ]);
    }
}
