<?php


namespace Tests\Feature\Transito\Material\Index;


use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\Unit\Transito\Material\Dominio\MaterialIdMother;
use Tests\Unit\Transito\Material\Dominio\MaterialNombreMother;

class MaterialesGetAllTest extends TestCase
{

    use RefreshDatabase;

    public function testMaterialeGetAll(): void
    {
        $this->prepareMaterialExisting();
        $this->prepareMaterialExisting();
        $response = $this->get('/api/material');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data'=>[['id','nombre']],
            'mensaje'
        ],$response);
    }

    public function prepareMaterialExisting(): void
    {
        $this->post('/api/material', [
            'id' => MaterialIdMother::random(),
            'nombre' => MaterialNombreMother::random()
        ]);
    }

}
