<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContratosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contratos', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('departamento');
            $table->string('municipio');
            $table->string('direccion');
            $table->date('fecha');
            $table->foreignUuid('serie_id');
            $table->foreign('serie_id')->references('id')->on('series')->cascadeOnDelete();
            $table->foreignUuid('cliente_id');
            $table->foreign('cliente_id')->references('id')->on('clientes')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contratos');
    }
}
