<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjeksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projeks', function (Blueprint $table) {
            $table->id();
            $table->string("nama");
            $table->string("deskripsi");
            $table->date("tanggal_mulai");
            $table->date("tanggal_selesai");
            $table->bigInteger("penanggung_jawab")->nullable();
            $table->enum("status", ["Berjalan","Tertunda", "Selesai"]);
            $table->enum("prioritas", ["Tinggi","Rendah","Sedang"]);
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
        Schema::dropIfExists('projeks');
    }
}
