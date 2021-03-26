<?php

namespace Tests\Unit\Transito\Vehiculo\Aplicacion\Create;

use Cantera\Transito\Vehiculo\Aplicacion\GuardarVehiculoService;
use Cantera\Transito\Vehiculo\Dominio\VehiculoDuplicado;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Unit\Transito\Vehiculo\Dominio\VehiculoMother;
use Tests\Unit\Transito\Vehiculo\VehiculoModuleUnitTestCase;

class GuardarVehiculoServiceTest extends VehiculoModuleUnitTestCase
{

    use RefreshDatabase;

    private $service;

    protected function setUp(): void
    {
        $this->service = $this->service ?: new GuardarVehiculoService($this->repository());
        parent::setUp();
    }


    /**
     * @test
     */
    public function testGuardarVehiculo(): void
    {
        $request = VehiculoRequestMother::random();
        $vehiculo = VehiculoMother::fromRequest($request);
        $this->shouldExiste($vehiculo->getPlaca());
        $this->shouldSave($vehiculo);
        $this->service->__invoke($request);
    }

    /**
     * @test
     */
    public function testGuardarVehiculoDuplicado():void{
        $this->expectException(VehiculoDuplicado::class);
        $request = VehiculoRequestMother::random();
        $vehiculo = VehiculoMother::fromRequest($request);
        $this->shouldExiste($vehiculo->getPlaca(),true);
        $this->shouldSave($vehiculo);
        $this->service->__invoke($request);
    }
}
