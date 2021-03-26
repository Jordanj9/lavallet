<?php

namespace App\Providers;

use Cantera\Transito\Cliente\Dominio\IClienteRepository;
use Cantera\Transito\Cliente\Infraestructura\Persistencia\ClienteEloquentRepository;
use Cantera\Transito\Conductor\Dominio\IConductorRepository;
use Cantera\Transito\Conductor\Infraestructura\Persistencia\ConductorElquentRepository;
use Cantera\Transito\Contrato\Dominio\IContratoRepository;
use Cantera\Transito\Contrato\Dominio\ITicketRepository;
use Cantera\Transito\Contrato\Dominio\IValeRepository;
use Cantera\Transito\Contrato\Insfraestructura\Persistencia\ContratoEloquentRepository;
use Cantera\Transito\Contrato\Insfraestructura\Persistencia\TicketEloquentRepository;
use Cantera\Transito\Contrato\Insfraestructura\Persistencia\ValeEloquentRepository;
use Cantera\Transito\Departamento\Dominio\IDepartamentoRepository;
use Cantera\Transito\Departamento\Infraestructura\Persistencia\DepatamentoEloquentRepository;
use Cantera\Transito\Material\Dominio\IMaterialRepository;
use Cantera\Transito\Material\Infraestructura\Persistencia\MaterialEloquentRepository;
use Cantera\Transito\Serie\Dominio\ISerieRepository;
use Cantera\Transito\Serie\Infraestructura\Persistencia\SerieEloquentRepository;
use Cantera\Transito\Vehiculo\Dominio\IVehiculoRepository;
use Cantera\Transito\Vehiculo\Infraestructura\Persistencia\VehiculoEloquentRepository;
use Illuminate\Support\ServiceProvider;
use function Psy\bin;

class AppServiceProvider extends ServiceProvider
{

    public function register()
    {
        $this->app->bind(IConductorRepository::class, ConductorElquentRepository::class);
        $this->app->bind(IClienteRepository::class, ClienteEloquentRepository::class);
        $this->app->bind(IMaterialRepository::class, MaterialEloquentRepository::class);
        $this->app->bind(IVehiculoRepository::class, VehiculoEloquentRepository::class);
        $this->app->bind(IVehiculoRepository::class, VehiculoEloquentRepository::class);
        $this->app->bind(IContratoRepository::class, ContratoEloquentRepository::class);
        $this->app->bind(ITicketRepository::class, TicketEloquentRepository::class);
        $this->app->bind(IValeRepository::class, ValeEloquentRepository::class);
        $this->app->bind(ISerieRepository::class, SerieEloquentRepository::class);
        $this->app->bind(IDepartamentoRepository::class,DepatamentoEloquentRepository::class);
    }

    public function boot()
    {
        //
    }
}
