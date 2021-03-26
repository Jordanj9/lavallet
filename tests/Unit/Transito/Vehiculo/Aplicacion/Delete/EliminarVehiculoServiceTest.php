<?php

namespace Tests\Unit\Transito\Vehiculo\Aplicacion\Delete;

use Cantera\Transito\Vehiculo\Aplicacion\EliminarVehiculoService;
use Cantera\Transito\Vehiculo\Dominio\VehiculoNoExiste;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Unit\Transito\Vehiculo\Dominio\VehiculoIdMother;
use Tests\Unit\Transito\Vehiculo\Dominio\VehiculoMother;
use Tests\Unit\Transito\Vehiculo\VehiculoModuleUnitTestCase;

class EliminarVehiculoServiceTest extends VehiculoModuleUnitTestCase
{
    use RefreshDatabase;

    private $service;

    public function setUp(): void
    {
        parent::setUp();
        $this->service = $this->service ?: new EliminarVehiculoService($this->repository());
    }

    /**
     * @test
     */
    public function testEliminarVehiculoCorrectamente(): void
    {
        $vehiculo = VehiculoMother::random();
        $this->shouldSearchById($vehiculo->getId(), $vehiculo);
        $this->shouldDelete($vehiculo->getId());
        $this->service->__invoke($vehiculo->getId()->value());
    }

    /**
     * @test
     */
    public function testEliminarVehiculoInExistente(): void
    {
        $this->expectException(VehiculoNoExiste::class);
        $id = VehiculoIdMother::random();
        $this->shouldSearchById($id);
        $this->service->__invoke($id->value());
    }
}
