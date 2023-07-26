<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Kelas;
class KelasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Kelas::create(["kelas"=>"X Animasi","keterangan"=>"Ini kelas 1"]);
        Kelas::create(["kelas"=>"XI Animasi","keterangan"=>"Ini kelas 2"]);
        Kelas::create(["kelas"=>"XII Animasi","keterangan"=>"Ini kelas 3"]);
    }
}
