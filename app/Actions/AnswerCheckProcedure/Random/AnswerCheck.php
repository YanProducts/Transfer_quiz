<?php

namespace App\Actions\AnswerCheckProcedure\Random;
use App\Actions\AnswerCheckProcedure\Common\Utils;
use App\Actions\AnswerCheckProcedure\Common\JudgeAnswer;
use App\Actions\AnswerCheckProcedure\Common\AlreadyAnswerdCheck;
use App\Actions\AnswerCheckProcedure\Common\StoreAnsweredToSql;
use Illuminate\Support\Facades\Log;

// ランダムの場合の回答確認
class AnswerCheck{
    public static function answer_check($request){

        // 新たにゲームが開始していないか？、二重投稿ではないか？(&新しいユニークトークンの作成=ここでやらないと二重投稿が引っかからない)
        Utils::id_token_check($request->gameId,$request->unique_token);

        [$base_player,$team,$name_type]=[$request->answer,$request->team,$request->nameType];
    
        try{

            // 正解判定
            [$correct_players_data_in_sql,$player]=JudgeAnswer::JudgeAnswer_procedure($base_player,$team,$name_type);
            $correct_players_data=$correct_players_data_in_sql->pluck("full");

    
            // 正解か否かで返すデータを変える
            if($correct_players_data->isNotEmpty()){
    
                // 既に回答済なら回答済みを返す(注意!「山,田」で正解後、「山田」で回答したら回答済になる！)
                if(AlreadyAnswerdCheck::is_already_answered(mb_ereg_replace(",","",$player),$team)){
                    return [
                        "new_token"=>session()->get("unique_token"),
                        "is_correct"=>"already"
                    ];
                }
                // 正解選手リストをsessionに格納
                $players_data=AlreadyAnswerdCheck::store_answered_lists_session($team,$correct_players_data);         
                
                // 正解者の数をSQLに格納
                StoreAnsweredToSql::store_correct_counts($correct_players_data_in_sql);
    
                // 表示用正解者の取得
                $players_data=AnsweredForView::get_answered_lists_for_view($team,$players_data);
                
                // 正解済でなければ正解
                // データを返す
                return[
                    "new_token"=>session()->get("unique_token"),
                    "is_correct"=>"correct",
                    "playerLists"=>$players_data
                ];
            }else{
                return[
                    "new_token"=>session()->get("unique_token"),
                    "is_correct"=>"wrong"
                ];
            }
        }catch(\Throwable $e){
            Log::info($e->getMessage());
            return[
                "new_token"=>session()->get("unique_token"),
                "is_correct"=>"error"
            ];
        }
    }

}
