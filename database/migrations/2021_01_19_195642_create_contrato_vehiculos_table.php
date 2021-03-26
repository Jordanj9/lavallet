<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContratoVehiculosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contrato_vehiculos', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('contrato_id');
            $table->foreign('contrato_id')->references('id')->on('contratos')->cascadeOnDelete();
            $table->foreignUuid('vehiculo_id');
            $table->foreign('vehiculo_id')->references('id')->on('vehiculos')->cascadeOnDelete();
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
        Schema::dropIfExists('contrato_vehiculos');
    }
}
