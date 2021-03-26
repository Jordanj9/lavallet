<?php

namespace Tests\Unit\Transito\Cliente\Aplicacion\Delete;

use Cantera\Transito\Cliente\Aplicacion\EliminarClienteService;
use Cantera\Transito\Cliente\Dominio\ClienteNoExiste;
use Tests\Unit\Transito\Cliente\ClienteModuleUnitTestCase;
use Tests\Unit\Transito\Cliente\Dominio\ClienteIdMother;
use Tests\Unit\Transito\Cliente\Dominio\ClienteMother;

class EliminarClienteServiceTest extends ClienteModuleUnitTestCase
{
    private $service;

    public function setUp(): void
    {
        parent::setUp();
        $this->service =  new EliminarClienteService($this->repository());
    }

    public function testEliminarClienteCorrectamente(): void
    {
        $cliente = ClienteMother::random();
        $this->shouldSearchById($cliente->id(),$cliente);
        $this->shouldDelete($cliente->id());
        $this->service->__invoke($cliente->id());
    }

    public function testEliminarClienteInExistente() : void {
       $this->expectException(ClienteNoExiste::class);
       $id = ClienteIdMother::random();
       $this->shouldSearchById($id, null);
       $this->service->__invoke($id);
    }

}
