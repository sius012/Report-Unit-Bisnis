<?php

namespace Database\Seeders;

use Database\Factories\SiswaMakerFactory;
use App\Models\Siswa;
use Illuminate\Database\Seeder;
use Database\Seeders\KelasSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call(KelasSeeder::class);
        Siswa::factory(50)->create();
    }
}
