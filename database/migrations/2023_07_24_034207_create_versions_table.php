<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVersionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('versi', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("id_tugas");
            $table->integer("no_versi");
            $table->string("judul");
            $table->string("deskripsi");
            $table->string("file_content");
            $table->bigInteger("id_pengisi")->nullable();
            $table->string("status")->default("On Progress");
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
        Schema::dropIfExists('versions');
    }
}
