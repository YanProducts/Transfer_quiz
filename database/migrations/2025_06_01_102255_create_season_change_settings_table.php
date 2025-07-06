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
        // 新しいシーズンクイズがいつからいつにかけての変化か(データは１つ)
        Schema::create('season_change_settings', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->dateTime("before");
            $table->dateTime("after");
            $table->string("season");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('season_change_settings');
    }
};
