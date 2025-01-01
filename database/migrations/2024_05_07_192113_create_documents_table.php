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
    Schema::create('documents', function (Blueprint $table) {
      $table->id();
      $table->foreignId('user_id')->constrained()->cascadeOnDelete();
      $table->foreignId('instance_id')->constrained()->cascadeOnDelete();
      $table->enum('doc_type', ['central', 'east']);
      $table->string('number');
      $table->datetime('issue_date')->nullable();
      $table->datetime('verification_date')->nullable();
      $table->text('subject')->nullable();
      $table->string('from')->nullable();
      $table->string('file')->nullable();
      $table->string('phone')->nullable();
      $table->mediumText('next_action')->nullable();
      $table->mediumText('corrective_action')->nullable();
      $table->mediumText('description')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('documents');
  }
};
