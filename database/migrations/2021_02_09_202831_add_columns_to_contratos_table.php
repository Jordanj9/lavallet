<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnsToContratosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contratos', function (Blueprint $table) {
            $table->string('serie_prefijo')->after('fecha')->nullable();
            $table->integer('serie_actual')->after('serie_prefijo')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('contratos', function (Blueprint $table) {
            $table->dropColumn('serie_prefijo');
            $table->dropColumn('serie_actual');
        });
    }
}
