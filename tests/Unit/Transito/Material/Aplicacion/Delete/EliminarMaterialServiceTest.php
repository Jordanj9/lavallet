<?php


namespace Tests\Unit\Transito\Material\Aplicacion\Delete;


use Cantera\Transito\Material\Aplicacion\EliminarMaterialService;
use Cantera\Transito\Material\Dominio\IMaterialRepository;
use Cantera\Transito\Material\Dominio\Material;
use Cantera\Transito\Material\Dominio\MaterialId;
use Cantera\Transito\Material\Dominio\MaterialNoExiste;
use Cantera\Transito\Material\Dominio\MaterialNombre;
use Cantera\Transito\Shared\Dominio\IUnitOfWork;
use Tests\TestCase;
use Tests\Unit\transito\Material\Dominio\MaterialMother;
use Tests\Unit\transito\Material\MaterialModuleUnitTestCase;

class EliminarMaterialServiceTest extends MaterialModuleUnitTestCase
{
    private $service;

    protected function setUp(): void
    {
        $this->service = $this->service ?: new EliminarMaterialService($this->repository());
        parent::setUp();
    }

    public function testEliminarMaterialCorrectamente(): void
    {
        $material = MaterialMother::random();
        $this->shouldSearchById($material->getId(), $material);
        $this->shouldDelete($material->getId());
        $this->service->__invoke($material->getId());
    }

    public function testEliminarMaterialInexistente(): void
    {
        $this->expectException(MaterialNoExiste::class);
        $material = MaterialMother::random();
        $this->shouldSearchById($material->getId());
        $this->service->__invoke($material->getId());
    }

}
