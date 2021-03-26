<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTicketsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('serie');
            $table->string('placa');
            $table->integer('carga');
            $table->string('material');
            $table->string('conductor');
            $table->string('estado');
            $table->string('input');
            $table->string('output')->nullable();
            $table->foreignUuid('contrato_id');
            $table->foreign('contrato_id')->references('id')->on('contratos')->cascadeOnDelete();
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
        Schema::dropIfExists('tickets');
    }
}
