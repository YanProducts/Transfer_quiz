<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\CateEnum;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('team_achives', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("eng_name");
            $table->string("jpn_name");
            $table->enum("cate",CateEnum::getDescriptions());
            $table->integer("red");
            $table->integer("blue");
            $table->integer("green");
            $table->string("season");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('team_achives');
    }
};
