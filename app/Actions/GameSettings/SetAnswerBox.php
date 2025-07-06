<?php

 namespace App\Actions\GameSettings;
 use App\Models\NewComer;
 use App\Models\Team;

// 回答の枠がいくつ必要かを返す
 class SetAnswerBox{
    // ランダムの場合
    static public function byRandom($cate){

    }

    // チームごとの場合
    static public function byTeam($cate){
        $team=$cate!=="all" ? TEAM::where("cate","=",$cate) : TEAM::all();
    }

 }
