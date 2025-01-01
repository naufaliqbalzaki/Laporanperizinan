<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('instances', function (Blueprint $table) {
      $table->id();
      $table->foreignId('parent_id')->nullable()->constrained('instances')->cascadeOnDelete();
      $table->string('name');
      $table->boolean('is_active')->default(true);
      $table->string('website')->nullable();
      $table->string('email')->nullable();
      $table->string('image')->nullable();
      $table->string('address');
      $table->string('district');
      $table->string('city');
      $table->string('province');
      $table->string('postal_code');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('instance_addresses');
    Schema::dropIfExists('instances');
  }
};
