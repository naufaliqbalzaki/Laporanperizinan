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
    Schema::table('instances', function (Blueprint $table) {
      $table->dropColumn('is_active');
      $table->dropColumn('website');
      $table->dropColumn('email');
      $table->dropColumn('image');
      $table->dropColumn('address');
      $table->dropColumn('district');
      $table->dropColumn('city');
      $table->dropColumn('province');
      $table->dropColumn('postal_code');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::table('instances', function (Blueprint $table) {
      $table->boolean('is_active')->default(true);
      $table->string('website')->nullable();
      $table->string('email')->nullable();
      $table->string('image')->nullable();
      $table->string('address');
      $table->string('district');
      $table->string('city');
      $table->string('province');
      $table->string('postal_code');
    });
  }
};
