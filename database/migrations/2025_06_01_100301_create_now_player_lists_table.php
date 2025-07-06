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
        // 現在の選手名間
        Schema::create('now_player_lists', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("full");
            $table->string("part");
            $table->string("team");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('now_player_lists');
    }
};
