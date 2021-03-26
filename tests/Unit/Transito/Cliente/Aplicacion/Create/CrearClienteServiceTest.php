<?php

namespace Tests\Unit\Transito\Cliente\Aplicacion\Create;

use Cantera\Transito\Cliente\Aplicacion\GuardarClienteService;
use Cantera\Transito\Cliente\Dominio\ClienteDuplicado;
use Tests\Unit\Transito\Cliente\ClienteModuleUnitTestCase;
use Tests\Unit\Transito\Cliente\Dominio\ClienteMother;

class CrearClienteServiceTest extends ClienteModuleUnitTestCase
{
    private $service;

    protected function setUp(): void
    {
        $this->service = $this->service ? :new GuardarClienteService($this->repository());
        parent::setUp();
    }

    public function testGuardarCliente(): void
    {
        $request =  ClienteRequestMother::random();
        $customer = ClienteMother::fromRequest($request);
        $this->shouldSearchByIdentificacion($customer->identificacion());
        $this->shouldSave($customer);
        $this->service->__invoke($request);
    }

    public function testGuardarClienteExistente() : void {

        $this->expectException(ClienteDuplicado::class);
        $request =  ClienteRequestMother::random();
        $customer = ClienteMother::fromRequest($request);
        $this->shouldSearchByIdentificacion($customer->identificacion(),$customer);
        $this->shouldSave($customer);
        $this->service->__invoke($request);
    }

}
