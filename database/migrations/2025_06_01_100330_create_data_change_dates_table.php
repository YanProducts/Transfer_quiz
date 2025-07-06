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
        // 現在の選手名間がいつのものか
        // データは１つのみ（選手名間だけ更新ということを考慮して、season_changeとは分ける）
        Schema::create('data_change_dates', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->dateTime("now_player_data_date");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_change_dates');
    }
};
