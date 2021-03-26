<?php

namespace Tests\Feature\Transito\Cliente\Delete;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Tests\TestCase;

class EliminarClienteTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @test
     */
    public function testEliminarClienteCorrectamente(): void
    {
        $this->post('/api/cliente', [
            'id' => '340476c0-0674-45fb-9858-8e4072f2d430',
            'identificacion' => '1118536667',
            'nombre' => 'alberto',
            'municipio' => 'valledupar',
            'departamento' => 'cesar',
            'direccion' => 'calle7c 19 e 41',
            'telefono' => 3002885908,
            'tipo' => 'NATURAL',
            'correo' => 'alberto@gmail.com'
        ]);
        $response = $this->delete('api/cliente/340476c0-0674-45fb-9858-8e4072f2d430');
        $response->assertStatus(Response::HTTP_OK);
    }


}
