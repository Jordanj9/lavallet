<?php

namespace Tests\Unit\Transito\Conductor\Aplicacion\Create;

use Cantera\Transito\Conductor\Aplicacion\GuardarConductorService;
use Cantera\Transito\Conductor\Dominio\ConductorDuplicado;
use Tests\Unit\Transito\Conductor\ConductorModuleUnitTestCase;
use Tests\Unit\Transito\Conductor\Dominio\ConductorMother;

class GuardarConductorServiceTest extends ConductorModuleUnitTestCase
{
    private $service;

    protected function setUp(): void
    {
        $this->service = $this->service ?: new GuardarConductorService($this->repository());
        parent::setUp();
    }

    /**
     * @test
     */
    public function testGuardarConductor(): void
    {
        $request = ConductorRequestMother::random();
        $conductor = ConductorMother::fromRequest($request);
        $this->shouldSearchByIdentificacion($conductor->getIdentificacion());
        $this->shouldSave($conductor);
        $this->service->__invoke($request);
    }

    /**
     * @test
     */
    public function testGuardarConductorExistente():void{
        $this->expectException(ConductorDuplicado::class);
        $request = ConductorRequestMother::random();
        $conductor = ConductorMother::fromRequest($request);
        $this->shouldSearchByIdentificacion($conductor->getIdentificacion(),$conductor);
        $this->shouldSave($conductor);
        $this->service->__invoke($request);
    }

}
