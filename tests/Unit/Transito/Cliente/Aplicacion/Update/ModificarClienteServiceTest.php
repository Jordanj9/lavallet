<?php


namespace Tests\Unit\Transito\Cliente\Aplicacion\Update;

use Cantera\Transito\Cliente\Aplicacion\ClienteRequest;
use Cantera\Transito\Cliente\Aplicacion\ModificarClienteService;
use Cantera\Transito\Cliente\Dominio\Cliente;
use Cantera\Transito\Cliente\Dominio\ClienteIdentificacion;
use Cantera\Transito\Cliente\Dominio\ClienteNombre;
use Cantera\Transito\Cliente\Dominio\ClienteTelefono;
use Cantera\Transito\Cliente\Dominio\ClienteTipo;
use Cantera\Transito\Cliente\Dominio\ClienteUbicacion;
use Cantera\Transito\Cliente\Dominio\IClienteRepository;
use Cantera\Transito\Shared\Dominio\IUnitOfWork;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\Unit\Transito\Cliente\Aplicacion\Create\ClienteRequestMother;
use Tests\Unit\Transito\Cliente\ClienteModuleUnitTestCase;
use Tests\Unit\Transito\Cliente\Dominio\ClienteMother;

class ModificarClienteServiceTest extends ClienteModuleUnitTestCase
{
    use RefreshDatabase;
    private $service;

    protected function setUp(): void
    {
        $this->service = $this->service ?: new ModificarClienteService($this->repository());
        parent::setUp();
    }

    /**
     * @test
     */
    public function testModificarClienteCorrectamente(): void
    {

        $request =  ClienteRequestMother::random();
        $customer = ClienteMother::fromRequest($request);
        $this->shouldSearchByIdentificacion($customer->identificacion());
        $this->shouldUpdated($customer);
        $this->service->__invoke($request);

    }

}
