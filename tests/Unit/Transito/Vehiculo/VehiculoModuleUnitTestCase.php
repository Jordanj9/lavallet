<?php

namespace Tests\Unit\Transito\Vehiculo;

use Cantera\Transito\Vehiculo\Dominio\IVehiculoRepository;
use Cantera\Transito\Vehiculo\Dominio\Vehiculo;
use Cantera\Transito\Vehiculo\Dominio\VehiculoId;
use Cantera\Transito\Vehiculo\Dominio\VehiculoPlaca;
use Mockery\MockInterface;
use Mockery;
use PHPUnit\Framework\TestCase;
use Tests\Unit\Transito\Shared\Domain\TestUtils;

class VehiculoModuleUnitTestCase extends TestCase
{
    private $repository;

    /**
     * @return MockInterface|IVehiculoRepository
     */
    protected function repository(): MockInterface
    {
        return $this->repository = $this->repository ?: Mockery::mock(IVehiculoRepository::class);
    }

    protected function shouldSave(Vehiculo $vehiculo): void
    {
        $this->repository()
            ->shouldReceive('save')
            ->with(TestUtils::similarTo($vehiculo));
    }

    protected function shouldUpdated(Vehiculo $vehiculo): void
    {
        $this->repository()
            ->shouldReceive('updated')
            ->with(TestUtils::similarTo($vehiculo))
            ->once();
    }

    public function shouldDelete(VehiculoId $id)
    {
        $this->repository()
            ->shouldReceive('delete')
            ->with(TestUtils::similarTo($id))
            ->once();
    }

    protected function shouldExiste(VehiculoPlaca $placa, ?bool $bool = false)
    {
        $this->repository()
            ->shouldReceive('existe')
            ->with(TestUtils::similarTo($placa))
            ->once()
            ->andReturn($bool);
    }

    protected function shouldSearchByPlaca(VehiculoPlaca $placa, ?Vehiculo $vehiculo = null)
    {
        $this->repository()
            ->shouldReceive('findByPlaca')
            ->with(TestUtils::similarTo($placa))
            ->andReturn($vehiculo);
    }


    protected function shouldSearchById(VehiculoId $id, ?Vehiculo $vehiculo = null)
    {
        $this->repository()
            ->shouldReceive('search')
            ->with(TestUtils::similarTo($id))
            ->once()
            ->andReturn($vehiculo);
    }

}
