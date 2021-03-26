<?php

namespace Tests\Unit\Transito\Conductor\Aplicacion\Search;

use Cantera\Transito\Conductor\Aplicacion\BuscarConductorRequest;
use Cantera\Transito\Conductor\Aplicacion\BuscarConductorService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Unit\transito\Conductor\ConductorModuleUnitTestCase;
use Tests\Unit\transito\Conductor\Dominio\ConductorMother;

class BuscarConductorServiceTest extends ConductorModuleUnitTestCase
{
    use RefreshDatabase;
    private $service;

    public function setUp(): void
    {
        parent::setUp();
        $this->service = new BuscarConductorService($this->repository());
    }

    /**
     * @test
     */
    public function testBuscarConductor(): void
    {
        $conductor = ConductorMother::random();
        $request = new BuscarConductorRequest($conductor->getIdentificacion());
        $this->shouldSearchByIdentificacion($conductor->getIdentificacion(), $conductor);
        $this->service->__invoke($request);
    }
}
