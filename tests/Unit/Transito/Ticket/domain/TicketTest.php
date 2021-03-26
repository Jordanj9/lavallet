<?php

namespace Tests\Unit\Transito\Ticket\domain;

use Cantera\Transito\Cliente\Dominio\Cliente;
use Cantera\Transito\Cliente\Dominio\ClienteCorreo;
use Cantera\Transito\Cliente\Dominio\ClienteId;
use Cantera\Transito\Cliente\Dominio\ClienteIdentificacion;
use Cantera\Transito\Cliente\Dominio\ClienteNombre;
use Cantera\Transito\Cliente\Dominio\ClienteTelefono;
use Cantera\Transito\Cliente\Dominio\ClienteTipo;
use Cantera\Transito\Cliente\Dominio\ClienteUbicacion;
use Cantera\Transito\Conductor\Dominio\Conductor;
use Cantera\Transito\Conductor\Dominio\ConductorId;
use Cantera\Transito\Conductor\Dominio\ConductorIdentificacion;
use Cantera\Transito\Conductor\Dominio\ConductorNombre;
use Cantera\Transito\Conductor\Dominio\CondutorTelefono;
use Cantera\Transito\Contrato\Dominio\Contrato;
use Cantera\Transito\Contrato\Dominio\ContratoFecha;
use Cantera\Transito\Contrato\Dominio\ContratoId;
use Cantera\Transito\Contrato\Dominio\ContratoUbicacion;
use Cantera\Transito\Contrato\Dominio\TerminoValueObject;
use Cantera\Transito\Contrato\Dominio\TicketCarga;
use Cantera\Transito\Contrato\Dominio\TicketId;
use Cantera\Transito\Contrato\Dominio\TipoTransaccionExeption;
use Cantera\Transito\Contrato\Dominio\TransaccionValueObject;
use Cantera\Transito\Contrato\Dominio\VehiculoSinContratoException;
use Cantera\Transito\Contrato\Dominio\VolumenDisponibleExeption;
use Cantera\Transito\Material\Dominio\Material;
use Cantera\Transito\Material\Dominio\MaterialId;
use Cantera\Transito\Material\Dominio\MaterialNombre;
use Cantera\Transito\Serie\Dominio\Serie;
use Cantera\Transito\Serie\Dominio\SerieActual;
use Cantera\Transito\Serie\Dominio\SeriePrefijo;
use Cantera\Transito\Serie\Dominio\SerieTipo;
use Cantera\Transito\Vehiculo\Dominio\Vehiculo;
use Cantera\Transito\Vehiculo\Dominio\VehiculoCapacidad;
use Cantera\Transito\Vehiculo\Dominio\VehiculoId;
use Cantera\Transito\Vehiculo\Dominio\VehiculoPlaca;
use Cantera\Transito\Vehiculo\Dominio\VehiculoTipo;
use PHPUnit\Framework\TestCase;
use Ramsey\Uuid\Uuid;
use Tests\Unit\Transito\ContratoMother;
use Tests\Unit\Transito\Material\Dominio\MaterialMother;
use Tests\Unit\Transito\Serie\Dominio\SerieIdMother;
use Tests\Unit\Transito\Serie\Dominio\SerieMother;
use Tests\Unit\Transito\Vehiculo\Dominio\VehiculoMother;

class TicketTest extends TestCase
{
    /**
     * Escenario:  Genera ticket sin volumen disponible en el contrato
     * HU 30. Como Usuario Quiero generar un ticket para llevar un control de las cargas que se van a realizar
     * Criterio de Aceptación:
     * 1.1. El ticket se genera solo si el vehículo está asociado a un contrato.
     * 1.2. El ticket se genera solo si existe volumen disponible en el contrato.
     * 1.3. debe haber máximo un ticket pendiente por vehículo
     * 1.4. solo se genera un ticket si la transacción es carga
     * Dado
     * El usuario tiene un material con id “1“ nombre “RELLENO”.
     * un cliente con id ”1”, identificación “123456789-7”, nombre “CONSTRUCTORA MAYALES”, municipio “VALLEDUPAR“, departamento “CESAR“, dirección “CLL38#18d-30”, teléfono “3152556478” y tipo “JURIDICA”.
     * Un conductor con id “1“ identificación “123456”, nombre “FABIAN”, teléfono “3005228888”.
     * El usuario tiene un vehículo con id “1“ placa “ADF-123A”, capacidad “8”, tipo “VOLQUETA” y conductor_id “1“.
     * Un contrato con id ”4”, serie “123”, cliente_id “1“, municipio “VALLEDUPAR”, departamento “CESAR”, dirección “CLL38#18d-30”, día “05”, mes “10”, año “2020”.
     * Un contrato detalle con operación “CARGA”, volumen “8”, tipo “DEFINIDO“ y material_id “1“.
     * Un contrato vehículo con vehiculo_id “1”
     * Cuando
     * va a generar un ticket con carga “12” , material_id “1“ y vehiculo_id “1“
     * Entonces
     * El sistema presentará el mensaje. “Atención!, La cantidad de carga ingresada supera el volumen disponible del contrato.”.
     * @test
     */

    public function testGenerarTicketSinVolumenDisponible(): void
    {
        $serie = SerieMother::random();
        $material = MaterialMother::random();
        $vehiculo = VehiculoMother::random();
        $contrato = ContratoMother::contratoConUnSoloDetalle(
            new TerminoValueObject(0, 'DEFINIDO'),
            new TransaccionValueObject('CARGA'),
            $material
        );
        $contrato->addVehiculo($vehiculo);
        try {
            $contrato->addTicket(new TicketId('cf04083c-c3a9-4ced-8a29-06923212f1d5'),$vehiculo->getId(), $material->getId(), new TicketCarga(8),$serie);
        } catch (VolumenDisponibleExeption $exception) {
            $this->assertEquals('Atención!, La cantidad de carga ingresada supera el volumen disponible del contrato.', $exception->getMessage());
        }
    }

    /**
     * Escenario:  Genera ticket sin contrato
     * HU 30. Como Usuario Quiero generar un ticket para llevar un control de las cargas que se van a realizar
     * Criterio de Aceptación:
     * 1.1. El ticket se genera solo si el vehículo está asociado a un contrato.
     * 1.2. El ticket se genera solo si existe volumen disponible en el contrato.
     * 1.3. debe haber máximo un ticket pendiente por vehículo
     * 1.4. solo se genera un ticket si la transacción es carga
     * Dado
     * El usuario tiene un material con id “1“ nombre “RELLENO”.
     * un cliente con id ”1”, identificación “123456789-7”, nombre “CONSTRUCTORA MAYALES”, municipio “VALLEDUPAR“, departamento “CESAR“, dirección “CLL38#18d-30”, teléfono “3152556478” y tipo “JURIDICA”.
     * Un conductor con id “1“ identificación “123456”, nombre “FABIAN”, teléfono “3005228888”.
     * El usuario tiene un vehículo con id “1“ placa “ADF-123A”, capacidad “8”, tipo “VOLQUETA” y conductor_id “1“.
     * Un contrato con id ”4”, serie “123”, cliente_id “1“, municipio “VALLEDUPAR”, departamento “CESAR”, dirección “CLL38#18d-30”, día “05”, mes “10”, año “2020”.
     * Un contrato detalle con operación “CARGA”, volumen “8”, tipo “DEFINIDO“ y material_id “1“.
     * Cuando
     * Va a generar un ticket con carga “5” , material_id “1“ y vehiculo_id “1“
     * Entonces
     * El sistema presentará el mensaje. “Atención!, No se puede genera un ticket porque el vehículo no tiene contrato asociado.”
     * @test
     */
    public function testGenerarTicketDeVehiculoSinContrato(): void
    {
        $serie = SerieMother::random();
        $material = MaterialMother::random();
        $vehiculo = VehiculoMother::random();
        $contrato = ContratoMother::contratoConUnSoloDetalle(
            new TerminoValueObject(8, 'DEFINIDO'),
            new TransaccionValueObject('CARGA'),
            $material
        );
        try {
            $contrato->addTicket(new TicketId('cf04083c-c3a9-4ced-8a29-06923212f1d5'),$vehiculo->getId(), $material->getId(), new TicketCarga(5),$serie);
        } catch (VehiculoSinContratoException $exception) {
            $this->assertEquals('Atención!, No se puede genera un ticket porque el vehículo no tiene contrato asociado.', $exception->getMessage());
        }
    }

    /**
     * Escenario: Genera ticket con transacción descarga
     * HU 30. Como Usuario Quiero generar un ticket para llevar un control de las cargas que se van a realizar
     * Criterio de Aceptación:
     * 1.1. El ticket se genera solo si el vehículo está asociado a un contrato.
     * 1.2. El ticket se genera solo si existe volumen disponible en el contrato.
     * 1.3. debe haber máximo un ticket pendiente por vehículo.
     * 1.4. solo se genera un ticket si la transacción es carga.
     * Dado
     * un cliente con id ”1”, identificación “123456789-7”, nombre “CONSTRUCTORA MAYALES”, municipio “VALLEDUPAR“, departamento “CESAR“, dirección “CLL38#18d-30”, teléfono “3152556478” y tipo “JURIDICA”.
     * Un conductor con id “1“ identificación “123456”, nombre “FABIAN”, teléfono “3005228888”.
     * El usuario tiene un vehículo con id “1“ placa “ADF-123A”, capacidad “8”, tipo “VOLQUETA” y conductor_id “1“.
     * Un contrato con id ”4”, serie “123”, cliente_id “1“, municipio “VALLEDUPAR”, departamento “CESAR”, dirección “CLL38#18d-30”, día “05”, mes “10”, año “2020”.
     * Un contrato detalle con operación “DESCARGA”, volumen “8”, tipo “DEFINIDO“ y material_id “1“.
     * Un contrato vehículo con vehiculo_id “1”
     * Cuando
     * Va a generar un ticket con carga “12” , material_id “1“ y vehiculo_id “1“
     * Entonces
     * El sistema presentará el mensaje. “Atención!, No se puede generar un ticket un para el tipo de transacción descarga.”
     * @test
     */
    public function testGenerarTicketConTransaccionDescarga(): void
    {
        $serie = SerieMother::random();
        $material = MaterialMother::random();
        $vehiculo = VehiculoMother::random();
        $contrato = ContratoMother::contratoConUnSoloDetalle(
            new TerminoValueObject(8, 'DEFINIDO'),
            new TransaccionValueObject('DESCARGA'),
            $material
        );
        $contrato->addVehiculo($vehiculo);
        try {
            $contrato->addTicket(new TicketId('cf04083c-c3a9-4ced-8a29-06923212f1d5'),$vehiculo->getId(), $material->getId(), new TicketCarga(8),$serie);
        } catch (TipoTransaccionExeption $exception) {
            $this->assertEquals('Atención!, No se puede generar un ticket un para el tipo de transacción DESCARGA.', $exception->getMessage());
        }
    }

    /**
     * @Escenario:Genera ticket correctamente
     * HU 30. Como Usuario Quiero generar un ticket para llevar un control de las cargas que se van a realizar
     * Criterio de Aceptación:
     * 1.1. El ticket se genera solo si el vehículo está asociado a un contrato.
     * 1.2. El ticket se genera solo si existe volumen disponible en el contrato.
     * 1.3. debe haber máximo un ticket pendiente por vehículo
     * 1.4. solo se genera un ticket si la transacción es carga
     * @Dado
     * El usuario tiene un material con id “1“ nombre “RELLENO”.
     * un cliente con id ”1”, identificación “123456789-7”, nombre “CONSTRUCTORA MAYALES”, municipio “VALLEDUPAR“, departamento “CESAR“, dirección “CLL38#18d-30”, teléfono “3152556478” y tipo “JURIDICA”.
     * Un conductor con id “1“ identificación “123456”, nombre “FABIAN”, teléfono “3005228888”.
     * El usuario tiene un vehículo con id “1“ placa “ADF-123A”, capacidad “8”, tipo “VOLQUETA” y conductor_id “1“.
     * Un contrato con id ”4”, serie “123”, cliente_id “1“, municipio “VALLEDUPAR”, departamento “CESAR”, dirección “CLL38#18d-30”, día “05”, mes “10”, año “2020”.
     * Un contrato detalle con operación “CARGA”, volumen “8”, tipo “DEFINIDO“ y material_id “1“.
     * Un contrato vehículo con vehiculo_id “1”
     * @Cuando
     * Va a generar un ticket con carga “8” , material_id “1“ y vehiculo_id “1“
     * @Entonces
     * El sistema presentará el mensaje. “Se ha generado un ticket con serie “123”, placa “ADF-123A”, carga “8”, material “RELLENO” nombre del conductor “FABIAN” volumen pendiente “0“.
     * @test
     */
    public function testGenerarTicketCorrectamente(): void
    {
        $serie = SerieMother::random();
        $material = new Material(new MaterialId('5900145a-fb2d-4487-b77b-9f1eb6bc7a1d'), new MaterialNombre('RELLENO'));
        $cliente = new Cliente(new ClienteId('97f304c5-727c-4d95-84cc-7fefb47b55dc'), new ClienteIdentificacion('1065848333'), new ClienteNombre('CONSTRUCTURA MAYALES'), new ClienteTelefono('3152556478'), new ClienteUbicacion('VALLEDUPAR', 'CESAR', 'CLL38#18D-30'), new ClienteTipo('JURIDICA'),new ClienteCorreo('mayales@gmail.com'));
        $conductor = new Conductor(new ConductorId('2445ebff-f217-4c0e-8edb-b59e28ea30a6'), new ConductorIdentificacion('123456'), new ConductorNombre('FABIAN'), new CondutorTelefono('3005228888'));
        $vehiculo = new Vehiculo(new VehiculoId('00c32fb3-2ba9-414e-91e3-e48f0a64be92'), new VehiculoPlaca('ADF-123A'), new VehiculoCapacidad(8), new VehiculoTipo('VOLQUETA'), $conductor->getId());
        $vehiculo->addConductor($conductor);
        $contrato = new Contrato(new ContratoId('d8608f70-5b7b-4cc4-bfb9-006378c9600a'), new Serie(SerieIdMother::random(),new SeriePrefijo('CONT'),new SerieActual(123),new SerieTipo('CONTRATO')), new ContratoUbicacion('VALLEDUPAR', 'CESAR', 'CLL38#18D-30'), new ContratoFecha(5, 10, 2020), $cliente->id());
        $contrato->addDetalle(new TerminoValueObject(8, 'DEFINIDO'), new TransaccionValueObject('CARGA'), $material);
        $contrato->addVehiculo($vehiculo);
        try {
            $contrato->addTicket(new TicketId('cf04083c-c3a9-4ced-8a29-06923212f1d5'),$vehiculo->getId(), $material->getId(), new TicketCarga(8),$serie);
        } catch (TipoTransaccionExeption $exception) {
            $this->assertEquals('Se ha generado un ticket con serie:TIC-123 placa:ADF-123A carga:8 material:RELLENO nombre del conductor:FABIAN volumen pendiente:0.', $exception->getMessage());
        }
    }

}
