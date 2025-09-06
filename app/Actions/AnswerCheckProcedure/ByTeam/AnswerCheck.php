<?php

namespace App\Actions\AnswerCheckProcedure\ByTeam;
use App\Actions\AnswerCheckProcedure\Common\Utils;
use App\Actions\AnswerCheckProcedure\Common\JudgeAnswer;
use App\Actions\AnswerCheckProcedure\Common\AlreadyAnswerdCheck;
use App\Actions\AnswerCheckProcedure\Common\StoreAnsweredToSql;
use Illuminate\Support\Facades\Log;

// ランダムの場合の回答確認
class AnswerCheck {
    public static function answer_check($request) {

        // 新たにゲームが開始していないか？、二重投稿ではないか？(&新しいユニークトークンの作成=ここでやらないと二重投稿が引っかからない)
        Utils::id_token_check($request->gameId,$request->unique_token);

        // 初期のanswered。後に正解者を格納していき「今回だけで同じ2人回答位した」に対応
        // $answered=$request->answered;

        // 正解選手が既に回答済だった場合
        $now_already_lists=[];

        // 正解としてリストに返す選手
        $correct_lists=[];

        try{
            // 1人ずつ正解判定
            foreach($request->answer as $answer_lists_with_team){

                    $team=$answer_lists_with_team["team"];
                    $answer=$answer_lists_with_team["player"];

                    // 正解判定
                    [$correct_players_data_in_sql,$player]=JudgeAnswer::JudgeAnswer_procedure($answer,$team,$request->nameType);
            
                    $correct_players_data=$correct_players_data_in_sql->pluck("full");

                    // 正解か否かで返すデータを変える
                if($correct_players_data->isNotEmpty()){
                    
                    // 正解選手をfullで取得したものを１つずつ見ていき、回答済かをチェック(同じ苗字で2人開く場合のほか、フルネームが2人いるにも対応)
                    foreach($correct_players_data->toArray() as $player_fullname){

                     // 既に回答済なら回答済みを返す(注意!「山,田」で正解後、「山田」で回答したら回答済になる！)
                    //    if(AlreadyAnswerdCheck::is_already_answered(mb_ereg_replace(",","",$player),$team)){
                       if(AlreadyAnswerdCheck::is_already_answered($player_fullname,$team)){

                            //回答済みなら「今回の回答リスト」に挿入
                            if(array_key_exists($team,$now_already_lists)){
                                array_push($now_already_lists[$team],$player_fullname);
                            }else{
                                $now_already_lists[$team]=[$player_fullname];
                            }
                        }
                    }

                    if(array_key_exists($team,$now_already_lists)){
                        continue;
                    }

                        // 回答済みではない場合
                        // 正解選手リストをsessionに格納
                       $players_data=AlreadyAnswerdCheck::store_answered_lists_session($team,$correct_players_data);   
                       
                                   
                       // 正解者の数をSQLに格納
                        StoreAnsweredToSql::store_correct_counts($correct_players_data_in_sql);
                        

                       
                // 表示用正解者の取得
                        foreach($players_data as $player_data){
           
                            if(array_key_exists($team,$correct_lists)){
                                array_push($correct_lists[$team],$player_data);
                            }else{
                                $correct_lists[$team]=[$player_data];
                            }
                        }

                }


            }

            // チームごとの多次元配列の合計要素数を取得
            $correct_answers_count = array_sum(array_map('count', $correct_lists));


            // 正解数によって返答をわける
            if($correct_answers_count>0){

                // 正解済でなければ正解
                // データを返す
                return[
                    "new_token"=>session()->get("unique_token"),
                    "isRightState"=>"correct",
                    
                    // 正解数
                    "rightCounts"=>$correct_answers_count,
                    // 新たに正解した回答
                    "returnedLists"=>$correct_lists,

                    // すでに正解している答えの重複
                    "returnedNowAnswerAleradyLists"=>$now_already_lists
                
                ];
            }else{
                return[
                    "new_token"=>session()->get("unique_token"),
                    "rightCounts"=>0,
                    // すでに正解している答えの重複
                    "returnedNowAnswerAleradyLists"=>$now_already_lists
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
