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
        Schema::table('new_comers', function (Blueprint $table) {
            $table->renameColumn("new_season","season");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('new_comers', function (Blueprint $table) {
            $table->renameColumn("season","new_season");
        });
    }
};
