<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // 新加入選手のanswerの初期値を0にする
    public function up(): void
    {
        Schema::table('new_comers', function (Blueprint $table) {
            $table->integer("answer_full")->default(0)->change();
            $table->integer("answer_part")->default(0)->change();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('new_comers', function (Blueprint $table) {
            $table->integer("answer_full");
            $table->integer("answer_part");
        });
    }
};
