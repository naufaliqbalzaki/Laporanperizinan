<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Instance>
 */
class InstanceFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'parent_id' => null,
      'name' => fake()->company(),
      'is_active' => fake()->boolean(),
      'kepsek' => fake()->name(),
      'website' => fake()->url(),
      'email' => fake()->email(),
      'image' => fake()->imageUrl(),
      'address' => fake()->address(),
      'district' => fake()->city(),
      'city' => fake()->city(),
      'province' => fake()->state(),
      'postal_code' => fake()->postcode(),
    ];
  }
}
