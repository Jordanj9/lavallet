<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum','dbtransaction'])->group(function () {

    Route::group(['middleware' => 'role:administrador'], function() {
        //se meten aqui todas las rutas del administrador
    });
    //USUARIOS
    Route::resource('usuarios','UserController');
//    Route::post('/usuario','UserController@')
    //MATERIAL
    Route::get('/material', 'Material\MaterialAllController');
    Route::post('/material', 'Material\MaterialPostController');
    Route::put('/material/{id}', 'Material\MaterialPutController');
    Route::delete('/material/{id}', 'Material\MaterialDeleteController');
    //CLIENTE
    Route::get('/cliente', 'Cliente\ClienteAllController');
    Route::post('/cliente', 'Cliente\ClientePostController');
    Route::put('/cliente/{id}', 'Cliente\ClientePutController');
    Route::delete('/cliente/{id}', 'Cliente\ClienteDeleteController');
    Route::get('/cliente/{keyword}', 'Cliente\ConsultarClientesGetController');
    //VEHICULO
    Route::get('/vehiculo', 'Vehiculo\VehiculoGetAllController');
    Route::post('/vehiculo', 'Vehiculo\VehiculoPostController');
    Route::put('/vehiculo/{id}', 'Vehiculo\VehiculoPutController');
    Route::delete('/vehiculo/{id}', 'Vehiculo\VehiculoDeleteController');
    Route::get('/vehiculo/validar/salida/{placa}', 'Vehiculo\ValidarSalidaGetController');
    //CONDUCTOR
    Route::get('/conductor', 'Conductor\ConductorAllController');
    Route::post('/conductor', 'Conductor\ConductorPostController');
    Route::put('/conductor/{id}', 'Conductor\ConductorPutController');
    Route::get('/conductor/{id}', 'Conductor\ConductorGetController');
    Route::delete('/conductor/{id}', 'Conductor\ConductorDeleteController');
    //DEPARTAMENTO
    Route::get('/departamento', 'Departamento\DepartamentoAllController');
    //SERIE
    Route::get('/serie/{tipo}', 'Serie\SerieGetController');
    //CONTRATO
    Route::get('/contrato', 'Contrato\ContratoAllController');
    Route::post('/contrato', 'Contrato\GenerarContratoPostController');
    Route::put('/contrato/{id}', 'Contrato\DetallesContratoPutController');
    Route::get('/contrato/{placa}', 'Contrato\ConsultarContratosVehiculoGetController');
    Route::get('/contrato/detalles/{contratoid}', 'Contrato\ConsultarDestallesByContratoGetContoller');
    Route::get('/contrato/get/dependencias/{id}', 'Contrato\ContratoByIdGetController');
    Route::get('/contrato/serie/get/{serie}','Contrato\ContratoBySerieGetController');
    //TICKET
    Route::post('/ticket', 'Ticket\GenerarTicketPostController');
    Route::put('/ticket/{id}', 'Ticket\FinalizarTicketPutController');
    //VALE
    Route::post('/vale', 'Vale\GenerarValePostController');
    Route::put('/vale/{id}', 'Vale\FinalizarValePutController');
    //REPORTES
    Route::get('/reporte/contrato/{id}/{fechainicio}/{fechafin}', 'Contrato\ReporteContratoByFechaGetController');
    Route::get('/reporte/material/{fechainicio}/{fechafin}', 'Vale\ReporteByMaterialGetController');
});
