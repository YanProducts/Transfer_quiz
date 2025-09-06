<?php

namespace App\Actions\AnswerCheckProcedure\Common;
use App\Actions\AnswerCheckProcedure\Common\Utils;
use App\Models\NewComer;


// 正誤確認
class JudgeAnswer{

        // 具体的な正解判定
        public static function JudgeAnswer_procedure($base_player,$team,$name_type){
            // まずは両方行う
            // フルネームで該当するチームに存在する選手(playerはカンマ付きの回答済みリストに入れるplayer、in_sqlはsqlはのちに更新するもの(複数の可能性)、最後のはデータのfull(複数の可能性あり))
            [$player,$correct_players_data_in_sql]=JudgeAnswer::full_base_check($base_player,$team);
    
            if($name_type==="part"){
            // 部分一致で正解するか(ただしcorrect_players_dataの配列にあるものは外す=すでに挿入済のため）
                $correct_players_data_in_sql=JudgeAnswer::part_base_check($player,$team,$correct_players_data_in_sql);
    
            }
            
            //  同じチームに山　昇太と山昇　太がいる時の「回答済リスト」の「回答済」をどう判定するか？(まだ中身は作成していない！)
            self::similar_name_store_judge($team,$player,$base_player);

            return [$correct_players_data_in_sql,$player];

        }


    // 両者に共通するフルネームでのチェック
    public static function full_base_check($base_player,$team){
        // スペースや全角はカンマに変換
        $player=Utils::name_change($base_player);
    
        // そのチームにいる選手全員
        $players_in_team=NewComer::where("team","=",$team);
    
        // fullそのもので正しいか？(最初から苗字名前の区切りなし)、もしくはpartの合計と等しいかで換算
        $correct_players_data_in_sql=$players_in_team
        ->where(function($query)use($player){
            $query->where("full","=",$player)->orWhere("part","=",$player);
        })->get();
        
        // 正解したデータを返す
        return [$player,$correct_players_data_in_sql];     
    }

    // 部分一致の正誤部分のみ
    public static function part_base_check($player,$team,$correct_players_data_in_sql){
        $correct_players_data=$correct_players_data_in_sql->pluck("full");
        // そのチームの全員(フルで正解扱いのフルと同じか変換すればpartと同じになるメンバーは除く)
        $players_in_team=NewComer::where("team","=",$team)->whereNotIn("full",$correct_players_data)->where("part","!=",$player)->get();


        foreach($players_in_team as $player_from_sql){
            foreach(explode(",",$player_from_sql->part) as $part){
                if($part===$player){
                    $correct_players_data_in_sql=$correct_players_data_in_sql->push($player_from_sql);
                }
            }
        }

        return $correct_players_data_in_sql;
    }

    //  同じチームに山　昇太と山昇　太がいる時の「回答済リスト」の「回答済」をどう判定するか？
    public static function similar_name_store_judge(){

    }

}
