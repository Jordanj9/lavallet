<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddEstadoToValesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('vales', function (Blueprint $table) {
            $table->enum('estado', ['PENDIENTE', 'FINALIZADO'])->after('transaccion')->default('PENDIENTE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('vales', function (Blueprint $table) {
            $table->dropColumn('estado');
        });
    }
}
