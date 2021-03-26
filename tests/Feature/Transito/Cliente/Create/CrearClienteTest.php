<?php

namespace Tests\Feature\Transito\Cliente\Create;

use Cantera\Transito\Cliente\Infraestructura\Persistencia\Eloquent\ClienteModel;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Tests\TestCase;
use Tests\Unit\Transito\Cliente\Dominio\ClienteMother;

class CrearClienteTest extends TestCase
{
    use RefreshDatabase;


    /**
     * @test
     */
    public function testGuardarClienteCorrectamente(): void
    {
        $cliente =  ClienteMother::random();
        $response = $this->post('/api/cliente',$cliente->toArray());
        $response->assertStatus(Response::HTTP_OK);
    }

    /**
     * @test
     */
    public function testGuardarClienteDuplicado() : void {
        $cliente = ClienteMother::random();
        factory(ClienteModel::class)->create($cliente->toArray());
        $response = $this->post('/api/cliente',$cliente->toArray());
        $response->assertStatus(Response::HTTP_BAD_REQUEST);
    }

}
