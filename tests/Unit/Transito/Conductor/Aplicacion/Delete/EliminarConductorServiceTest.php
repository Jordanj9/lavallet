<?php

namespace Tests\Unit\Transito\Conductor\Aplicacion\Delete;

use Cantera\Transito\Conductor\Aplicacion\EliminarConductorService;
use Cantera\Transito\Conductor\Dominio\ConductorNoExiste;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Unit\transito\Conductor\ConductorModuleUnitTestCase;
use Tests\Unit\transito\Conductor\Dominio\ConductorIdMother;
use Tests\Unit\transito\Conductor\Dominio\ConductorMother;

class EliminarConductorServiceTest extends ConductorModuleUnitTestCase
{
    use RefreshDatabase;

    private $service;

    public function setUp(): void
    {
        parent::setUp();
        $this->service = new EliminarConductorService($this->repository());
    }

    /**
     * @test
     */
    public function testEliminarConductorCorrectamente(): void
    {
        $conductor = ConductorMother::random();
        $this->shouldSearchById($conductor->getId(),$conductor);
        $this->shouldDelete($conductor->getId());
        $this->service->__invoke($conductor->getId());
    }

    /**
     * @test
     */
    public function testEliminarConductorInExistente():void{
        $this->expectException(ConductorNoExiste::class);
        $id = ConductorIdMother::random();
        $this->shouldSearchById($id,null);
        $this->service->__invoke($id);
    }
}
