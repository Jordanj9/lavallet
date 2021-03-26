<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetallesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('detalles', function (Blueprint $table) {
            $table->id();
            $table->integer('volumen');
            $table->enum('tipo', ['DEFINIDO', 'INDEFINIDO']);
            $table->enum('transaccion', ['CARGA', 'DESCARGA']);
            $table->foreignUuid('contrato_id');
            $table->foreign('contrato_id')->references('id')->on('contratos')->cascadeOnDelete();
            $table->foreignUuid('material_id');
            $table->foreign('material_id')->references('id')->on('materiales')->cascadeOnDelete();
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
        Schema::dropIfExists('detalles');
    }
}
