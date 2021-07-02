<?php

namespace Tests\Feature\Transito\Cliente\Index;

use Cantera\Transito\Cliente\Infraestructura\Persistencia\Eloquent\ClienteModel;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\Unit\Transito\Cliente\Dominio\ClienteMother;

class ClienteGetAllTest extends TestCase
{
    use RefreshDatabase;

    public function testCustomerGetAll(): void
    {
        $cliente = ClienteMother::random();
        factory(ClienteModel::class)->create($cliente->toArray());
        $response = $this->get('/api/cliente');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                [
                    'id',
                    'identificacion',
                    'nombre',
                    'telefono',
                    'ubicacion' => ['municipio', 'departamento', 'direccion'],
                    'tipo',
                    'correo'
                ]
            ],
            'mensaje'
        ]);
    }

    public function testCustomerGetAllWithLimit(): void
    {
        factory(ClienteModel::class, 10)->create();
        $response = $this->get('/api/cliente?limit=2');
        $response->assertStatus(200);
        $response->assertJsonCount(1,'data');
    }

    public function testCustomerGetAllWithOffset(): void
    {
        factory(ClienteModel::class, 10)->create();
        $response = $this->get('/api/cliente?offset=2');
        $response->assertStatus(200);
        $response->assertJsonCount(9, 'data');
    }

    public function testCustomerGetAllWithOffsetAndLimit(): void
    {
        factory(ClienteModel::class, 10)->create();
        $response = $this->get('/api/cliente?limit=20&offset=2');
        $response->assertStatus(200);
        $response->assertJsonCount(9, 'data');
    }

}
