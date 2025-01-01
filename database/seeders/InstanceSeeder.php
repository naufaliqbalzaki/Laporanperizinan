<?php

namespace Database\Seeders;

use App\Models\Instance;
use App\Models\InstanceAddress;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class InstanceSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $faker = Faker::create();
    $rand_parent = [];

    $instances = [
      "Dinas Pendidikan",
      "Dinas Kesehatan",
      "Dinas Perhubungan",
      "Dinas Sosial",
      "Dinas Pekerjaan Umum",
      "Dinas Perikanan",
      "Dinas Kehutanan",
      "Dinas Pertanian",
      "Dinas Perindustrian",
      "Dinas Perdagangan",
    ];

    foreach (range(1, 10) as $i) {

      $instance = Instance::factory()->create(
        [
          'parent_id' => count($rand_parent) >  5 ? $rand_parent[array_rand($rand_parent)] : null,
          'name' =>  $instances[$i - 1],
          'is_active' => $faker->boolean,
          'kepsek' => $faker->name,
          'website' => $faker->url,
          'email' => $faker->email,
          'image' => $faker->imageUrl,
          'address' => $faker->address,
          'district' => $faker->city,
          'city' => $faker->city,
          'province' => $faker->state,
          'postal_code' => $faker->postcode,
        ]
      );
    }
  }
}
