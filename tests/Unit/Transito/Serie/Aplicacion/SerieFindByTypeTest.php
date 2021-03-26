<?php

namespace Tests\Unit\Transito\Serie\Aplicacion;

use Cantera\Transito\Serie\Aplicacion\SerieFindByTypeService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Unit\Transito\Serie\Dominio\SerieMother;
use Tests\Unit\Transito\Serie\SerieModuleUnitTestCase;

class SerieFindByTypeTest extends SerieModuleUnitTestCase
{

    use RefreshDatabase;

    private $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = $this->service ?: new SerieFindByTypeService($this->repository());
    }

    /**
     * @test
     */
    public function testBuscarSerieCorrectamentePorTipo(): void
    {
        $serie = SerieMother::contrato();
        $type = $serie->getTipo();
        $this->shouldFindByType($type, $serie);
        $this->service->__invoke($type);
    }

}
