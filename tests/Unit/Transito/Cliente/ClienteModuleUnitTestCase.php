<?php

namespace Tests\Unit\Transito\Cliente;

use Cantera\Transito\Cliente\Dominio\Cliente;
use Cantera\Transito\Cliente\Dominio\ClienteId;
use Cantera\Transito\Cliente\Dominio\ClienteIdentificacion;
use Cantera\Transito\Cliente\Dominio\IClienteRepository;
use PHPUnit\Framework\TestCase;
use Mockery;
use Mockery\MockInterface;
use Tests\Unit\Transito\Shared\Domain\TestUtils;

abstract class ClienteModuleUnitTestCase extends TestCase
{
    private $repository;

    /**
     * @return MockInterface|IClienteRepository
     */
    protected function repository(): MockInterface
    {
        return $this->repository = $this->repository ?: Mockery::mock(IClienteRepository::class);
    }


    protected function shouldSave(Cliente $cliente): void
    {
        $this->repository()
            ->shouldReceive('save')
            ->with(TestUtils::similarTo($cliente));
    }

    protected function shouldUpdated(Cliente $cliente): void
    {
        $this->repository()
            ->shouldReceive('updated')
            ->with(TestUtils::similarTo($cliente))
            ->once();
    }


    protected function shouldSearchByIdentificacion(ClienteIdentificacion $identificacion, ?Cliente $cliente = null)
    {
        $this->repository()
            ->shouldReceive('findByIdentificacion')
            ->with(TestUtils::similarTo($identificacion))
            ->once()
            ->andReturn($cliente);
    }

    protected function shouldSearchById(ClienteId $id, ?Cliente $cliente)
    {
        $this->repository()
            ->shouldReceive('search')
            ->with(TestUtils::similarTo($id))
            ->once()
            ->andReturn($cliente);
    }

    public function shouldDelete(ClienteId $id)
    {
        $this->repository()
            ->shouldReceive('delete')
            ->with(TestUtils::similarTo($id))
            ->once();
    }

}
