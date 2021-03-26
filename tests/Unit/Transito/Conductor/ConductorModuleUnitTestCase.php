<?php


namespace Tests\Unit\Transito\Conductor;

use Cantera\Transito\Conductor\Dominio\Conductor;
use Cantera\Transito\Conductor\Dominio\ConductorId;
use Cantera\Transito\Conductor\Dominio\ConductorIdentificacion;
use Cantera\Transito\Conductor\Dominio\IConductorRepository;
use Mockery;
use Mockery\MockInterface;
use PHPUnit\Framework\TestCase;
use Tests\Unit\Transito\Shared\Domain\TestUtils;

class ConductorModuleUnitTestCase extends TestCase
{
    private $repository;

    /**
     * @return MockInterface|IConductorRepository
     */
    protected function repository(): MockInterface
    {
        return $this->repository = $this->repository ?: Mockery::mock(IConductorRepository::class);
    }

    protected function shouldSave(Conductor $conductor): void
    {
        $this->repository()
            ->shouldReceive('save')
            ->with(TestUtils::similarTo($conductor));
    }

    protected function shouldSearch(ConductorIdentificacion $identificacion, ?Conductor $conductor = null)
    {
        $this->repository()
            ->shouldReceive('search')
            ->with(TestUtils::similarTo($identificacion))
            ->once()
            ->andReturn($conductor);
    }

    protected function shouldUpdated(Conductor $conductor): void
    {
        $this->repository()
            ->shouldReceive('updated')
            ->with(TestUtils::similarTo($conductor))
            ->once();
    }

    public function shouldDelete(ConductorId $id)
    {
        $this->repository()
            ->shouldReceive('delete')
            ->with(TestUtils::similarTo($id))
            ->once();
    }


    protected function shouldSearchByIdentificacion(ConductorIdentificacion $identificacion, ?Conductor $conductor = null)
    {
        $this->repository()
            ->shouldReceive('findByIdentificacion')
            ->with(TestUtils::similarTo($identificacion))
//            ->once()
            ->andReturn($conductor);
    }

    protected function shouldSearchById(ConductorId $id, ?Conductor $conductor)
    {
        $this->repository()
            ->shouldReceive('search')
            ->with(TestUtils::similarTo($id))
            ->once()
            ->andReturn($conductor);
    }

}
