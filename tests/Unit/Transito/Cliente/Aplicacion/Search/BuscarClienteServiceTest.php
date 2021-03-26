<?php

namespace Tests\Unit\Transito\Cliente\Aplicacion\Search;


use Cantera\Transito\Cliente\Aplicacion\BuscarClienteService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Unit\Transito\Cliente\ClienteModuleUnitTestCase;
use Tests\Unit\Transito\Cliente\Dominio\ClienteMother;

class BuscarClienteServiceTest extends ClienteModuleUnitTestCase
{

    use RefreshDatabase;
    private $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new BuscarClienteService($this->repository());
    }

    public function testBuscarClientePorIdentificacion() : void {
        $cliente = ClienteMother::random();
        $this->shouldSearchByIdentificacion($cliente->identificacion(),$cliente);
        $this->assertEquals($cliente,$this->service->__invoke($cliente->identificacion()));
    }

}
