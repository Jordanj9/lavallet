<?php

namespace Tests\Unit\Transito\Material\Aplicacion\Create;

use Cantera\Transito\Material\Aplicacion\GuardarMaterialService;
use Cantera\Transito\Material\Dominio\MaterialDuplicado;
use Tests\Unit\Transito\Material\Dominio\MaterialMother;
use Tests\Unit\Transito\Material\MaterialModuleUnitTestCase;

class GuardarMaterialServiceTest extends MaterialModuleUnitTestCase
{

    private $service;

    protected function setUp(): void
    {
        $this->service = $this->service ?: new GuardarMaterialService($this->repository());
        parent::setUp();
    }


    /**
     * @test
     */
    public function testGuardarMaterial(): void
    {
        $request = MaterialRequestMother::random();
        $material = MaterialMother::fromRequest($request);
        $this->shouldSearchByNombre($material->getNombre());
        $this->shouldSave($material);
        $this->service->__invoke($request);
    }

    public function testGuardarMaterialExistente(): void
    {
        $this->expectException(MaterialDuplicado::class);
        $request = MaterialRequestMother::random();
        $material = MaterialMother::fromRequest($request);
        $this->shouldSearchByNombre($material->getNombre(), $material);
        $this->shouldSave($material);
        $this->service->__invoke($request);
    }

}
