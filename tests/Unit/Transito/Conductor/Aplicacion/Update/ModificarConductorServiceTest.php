<?php


namespace Tests\Unit\Transito\Conductor\Aplicacion\Update;

use Cantera\Transito\Conductor\Aplicacion\ModificarConductorService;
use Cantera\Transito\Conductor\Dominio\ConductorIdentificacion;
use Tests\Unit\transito\Conductor\Aplicacion\Create\ConductorRequestMother;
use Tests\Unit\Transito\Conductor\ConductorModuleUnitTestCase;
use Tests\Unit\transito\Conductor\Dominio\ConductorMother;

class ModificarConductorServiceTest extends ConductorModuleUnitTestCase
{
    private $service;

    protected function setUp(): void
    {
        $this->service = $this->service ?: new ModificarConductorService($this->repository());
        parent::setUp();
    }

    /**
     * @test
     */
    public function testModificarConductorCorrectamente(): void
    {
        $request = ConductorRequestMother::randomUpdated();
        $conductor = ConductorMother::fromRequest($request);
        $this->shouldSearchByIdentificacion(new ConductorIdentificacion($request->getIdentificacion()));
        $this->shouldUpdated($conductor);
        $this->service->__invoke($request);
    }

}
