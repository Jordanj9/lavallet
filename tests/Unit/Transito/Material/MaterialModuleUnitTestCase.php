<?php


namespace Tests\Unit\Transito\Material;

use Cantera\Transito\Material\Dominio\IMaterialRepository;
use Cantera\Transito\Material\Dominio\Material;
use Cantera\Transito\Material\Dominio\MaterialId;
use Cantera\Transito\Material\Dominio\MaterialNombre;
use Mockery;
use Mockery\MockInterface;
use PHPUnit\Framework\TestCase;
use Tests\Unit\Transito\Shared\Domain\TestUtils;

class MaterialModuleUnitTestCase extends TestCase
{
    private $repository;

    /**
     * @return MockInterface|IMaterialRepository
     */
    protected function repository(): MockInterface
    {
        return $this->repository = $this->repository ?: Mockery::mock(IMaterialRepository::class);
    }

    protected function shouldSave(Material $material): void
    {
        $this->repository()
            ->shouldReceive('save')
            ->with(TestUtils::similarTo($material));
    }

    protected function shouldUpdated(Material $material): void
    {
        $this->repository()
            ->shouldReceive('updated')
            ->with(TestUtils::similarTo($material))
            ->once();
    }

    protected function shouldSearchByNombre(MaterialNombre $nombre, ?Material $material = null)
    {
        $this->repository()
            ->shouldReceive('findByNombre')
            ->with(TestUtils::similarTo($nombre))
            ->once()
            ->andReturn($material);
    }

    protected function shouldSearchById(MaterialId $id, ?Material $material = null)
    {
        $this->repository()
            ->shouldReceive('search')
            ->with(TestUtils::similarTo($id))
            ->once()
            ->andReturn($material);
    }

    public function shouldDelete(MaterialId $id)
    {
        $this->repository()
            ->shouldReceive('delete')
            ->with(TestUtils::similarTo($id))
            ->once();
    }
}
