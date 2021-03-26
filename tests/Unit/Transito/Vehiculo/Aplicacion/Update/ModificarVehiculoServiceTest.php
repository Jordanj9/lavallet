<?php


namespace Tests\Unit\Transito\Vehiculo\Aplicacion\Update;

use Cantera\Transito\Vehiculo\Aplicacion\ModificarVehiculoService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Unit\Transito\Vehiculo\Aplicacion\Create\VehiculoRequestMother;
use Tests\Unit\Transito\Vehiculo\Dominio\VehiculoMother;
use Tests\Unit\Transito\Vehiculo\VehiculoModuleUnitTestCase;

class ModificarVehiculoServiceTest extends VehiculoModuleUnitTestCase
{
    use RefreshDatabase;

    private $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = $this->service ?: new ModificarVehiculoService($this->repository());
    }

    /**
     * @test
     */
    public function testModificarVehiculoCorrectamente(): void
    {
        $request = VehiculoRequestMother::random();
        $vehiculo = VehiculoMother::fromRequest($request);
        $this->shouldSearchByPlaca($vehiculo->getPlaca());
        $this->shouldUpdated($vehiculo);
        $this->service->__invoke($request);
    }

}
