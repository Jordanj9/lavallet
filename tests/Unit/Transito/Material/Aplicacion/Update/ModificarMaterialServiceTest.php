<?php


namespace Tests\Unit\Transito\Material\Aplicacion\Update;


use Cantera\Transito\Material\Aplicacion\MaterialRequest;
use Cantera\Transito\Material\Aplicacion\ModificarMaterialService;
use Cantera\Transito\Material\Dominio\IMaterialRepository;
use Cantera\Transito\Material\Dominio\Material;
use Cantera\Transito\Material\Dominio\MaterialDuplicado;
use Cantera\Transito\Material\Dominio\MaterialId;
use Cantera\Transito\Material\Dominio\MaterialNombre;
use Cantera\Transito\Shared\Dominio\IUnitOfWork;
use Tests\TestCase;
use Tests\Unit\transito\Material\Aplicacion\Create\MaterialRequestMother;
use Tests\Unit\transito\Material\Dominio\MaterialMother;
use Tests\Unit\transito\Material\MaterialModuleUnitTestCase;

class ModificarMaterialServiceTest extends MaterialModuleUnitTestCase
{
    private $service;

    public function setUp(): void
    {
        $this->service = $this->service ?: new ModificarMaterialService($this->repository());
        parent::setUp();
    }

    /**
     * @test
     */
    public function testModificarMaterialCorrectamente(): void
    {
        $request = MaterialRequestMother::random();
        $material = MaterialMother::fromRequest($request);
        $this->shouldSearchByNombre($material->getNombre());
        $this->shouldUpdated($material);
        $this->service->__invoke($request);
    }

}
