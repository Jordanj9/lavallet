<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatedTableClientes extends Migration
{

    public function up()
    {
        Schema::create('clientes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('identificacion')->unique();
            $table->string('nombre',60);
            $table->string('telefono',60);
            $table->string('municipio',60);
            $table->string('departamento',60);
            $table->string('direccion',60);
            $table->string('tipo',60);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('clientes');
    }
}
