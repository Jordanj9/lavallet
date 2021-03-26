<?php

namespace Tests\Unit\Transito\Serie;

use Cantera\Transito\Serie\Dominio\ISerieRepository;
use Cantera\Transito\Serie\Dominio\Serie;
use Mockery;
use Mockery\MockInterface;
use Tests\TestCase;
use Tests\Unit\Transito\Shared\Domain\TestUtils;

class SerieModuleUnitTestCase extends TestCase
{
    private $repository;

    /**
     * @return MockInterface | ISerieRepository
     */
    protected function repository() : MockInterface {
       return $this->repository =  $this->repository ?  : Mockery::mock(ISerieRepository::class);
    }

    protected function shouldFindByType(string $type,?Serie $serie = null) : void {
        $this->repository()
             ->shouldReceive('buscarPorTipo')
             ->with(TestUtils::similarTo($type))
             ->andReturn($serie);
    }
}
