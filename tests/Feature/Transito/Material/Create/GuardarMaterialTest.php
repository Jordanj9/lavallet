<?php

namespace Tests\Feature\Transito\Material\Create;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Tests\TestCase;

class GuardarMaterialTest extends TestCase
{

    use RefreshDatabase;

    public function testGuardarMaterialCorrectamente(): void
    {
        $response = $this->post('/api/material', [
            'id' => '018ffe8d-178e-4684-892a-d7f44e972c62',
            'nombre' => 'RELLENO'
        ]);
        $response->assertStatus(Response::HTTP_CREATED);
    }

    /*public function testGuardarMaterialDuplicado(): void
    {
        $material =  MaterialMother::random();
        factory(MaterialModel::class)->create($material->toArray());
        $response = $this->post('/api/material',$material->toArray());
        $response->assertStatus(Response::HTTP_BAD_REQUEST);
    }*/


}
