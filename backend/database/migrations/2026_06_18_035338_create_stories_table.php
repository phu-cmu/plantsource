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
        Schema::create('stories', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['recipes', 'media']);
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('author');
            $table->text('excerpt');
            $table->longText('content')->nullable();        // Recipes: markdown body
            $table->string('youtube_url')->nullable();      // Media: YouTube embed link
            $table->string('image')->nullable();            // Cover image path
            $table->string('read_time')->nullable();        // e.g. "5 Min Read"
            $table->boolean('featured')->default(false);
            $table->enum('status', ['draft', 'published'])->default('draft');
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stories');
    }
};
