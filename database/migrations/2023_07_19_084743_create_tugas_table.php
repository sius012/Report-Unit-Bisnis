<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTugasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tugas', function (Blueprint $table) {
            $table->id();
            $table->string("nama");
            $table->string("deskripsi");
            $table->enum("jenis", ["Task","Sub Task","content"])->default("Task");
            $table->string("file_path")->nullable();
            $table->date("dari");
            $table->date("sampai");
            $table->enum("status", ["Belum dimulai", "Berjalan", "Selesai", "Ditunda"])->default("Belum dimulai");
            $table->bigInteger("id_parent")->nullable();
            $table->bigInteger("id_projek")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tugas');
    }
}
