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
        // 新加入選手のみのテーブル
        Schema::create('new_comers', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("full");
            $table->string("part");
            $table->string("team");
            $table->string("new_season");
            $table->integer("answer_full");
            $table->integer("answer_part");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('new_comers');
    }
};
