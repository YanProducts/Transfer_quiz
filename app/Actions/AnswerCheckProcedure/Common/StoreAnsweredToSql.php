<?php

namespace App\Actions\AnswerCheckProcedure\Common;
use Illuminate\Support\Facades\DB;

class StoreAnsweredToSql{

// 正解の数をSQLに格納
public static function store_correct_counts($correct_players_data_in_sql,$name_type){
    // SQLの正解数を追加
    DB::transaction(function()use(&$correct_players_data_in_sql,$name_type){
        foreach($correct_players_data_in_sql as $correct_player){
            if($name_type==="full"){
                $correct_player->answer_full+=1;
            }else if($name_type==="part"){
                $correct_player->answer_part+=1;                
            }

            $correct_player->save();
        }
    });
 }
}