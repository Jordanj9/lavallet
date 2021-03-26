<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Cantera\Transito\Cliente\Infraestructura\Persistencia\Eloquent\ClienteModel;
use  \Tests\Unit\Transito\Cliente\Dominio\ClienteIdentificacionMother;
use Faker\Generator as Faker;


$factory->define(ClienteModel::class, function (Faker $faker) {
    $faker->addProvider(new \Faker\Provider\es_ES\Address($faker));
    return [
        'id' => $faker->unique()->uuid,
        'identificacion' => ClienteIdentificacionMother::random(),
        'nombre' => $faker->name,
        'telefono' => $faker->e164PhoneNumber,
        'municipio' => $faker->word,
        'departamento' => $faker->streetName,
        'direccion' => $faker->streetAddress,
        'tipo' => $faker->randomElement(['NATURAL', 'JURIDICA']),
        'correo' => $faker->email
    ];
});
