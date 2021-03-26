<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Cantera\Transito\Vehiculo\Infraestructura\Persistencia\Eloquent\VehiculoModel;
use \Tests\Unit\Transito\Shared\Domain\RandomElementPicker;
use Faker\Generator as Faker;

$factory->define(VehiculoModel::class, function (Faker $faker) {
    return [
        'placa' => $faker->word,
        'capacidad' => $faker->numberBetween(1,10),
        'tipo' => RandomElementPicker::from(['VOLQUETA','VEHICULO PARTICULAR','OTRO']),
        ''
    ];
});
