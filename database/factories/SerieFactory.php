<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Cantera\Transito\Serie\Infraestructura\Persistencia\Eloquent\SerieModel;
use Faker\Generator as Faker;

$factory->define(SerieModel::class, function (Faker $faker) {
    $faker->addProvider(new \Faker\Provider\es_ES\Address($faker));
    $tipo = ['CONTRATO','VALET','TICKET'];
    return [
        'id' => $faker->unique()->uuid,
        'prefijo' => $faker->slug,
        'actual' => $faker->numberBetween(),
        'tipo' => $tipo[array_rand($tipo,1)]
    ];
});
