<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatedTableVehiculos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vehiculos', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('placa', 60)->unique();
            $table->integer('capacidad');
            $table->string('tipo');
            $table->uuid('conductor_id');
            $table->foreign('conductor_id')->references('id')->on('conductores')->cascadeOnDelete();
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
        //
    }
}
