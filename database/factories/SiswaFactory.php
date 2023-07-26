<?php

namespace Database\Factories;

use App\Models\Siswa;
use Illuminate\Database\Eloquent\Factories\Factory;
use Str;

class SiswaFactory extends Factory
{
    protected $model = Siswa::class;
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nis'=>$this->faker->unique()->numberBetween(1000,9999),
            'nama'=>$this->faker->name,
            'jenis_kelamin'=>$this->faker->randomElement(["L","P"]),
            'kelas'=>$this->faker->randomElement(["X","XII","XII"]),
            'no_absen'=> $this->faker->numberBetween(1, 50)
        ];
    }
}
