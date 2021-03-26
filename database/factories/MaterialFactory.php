<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Cantera\Transito\Material\Infraestructura\Persistencia\Eloquent\MaterialModel;
use Faker\Generator as Faker;


$factory->define(MaterialModel::class, function (Faker $faker) {
    return [
        'id' => $faker->unique()->uuid,
        'nombre' => $faker->name 
    ];
});
