<?php

namespace App\Actions\AnswerCheckProcedure\Common;

use App\Utils\Session;
use Illuminate\Support\Facades\Log;

// 回答済リストの操作
class AlreadyAnswerdCheck{

    // 正解選手リストをsessionに格納
    public static function store_answered_lists_session($team,$correct_players_data){

        // 配列に変換
        $players_data=$correct_players_data->toArray();
        // sessionの現在の正解リストに追加
        self::add_answered_lists($team,$players_data);
        return $players_data;
    }

    // 既に回答された選手ではないか？
    public static function is_already_answered($player,$team){
        $answered=session()->get("answered_lists");

        return(isset($answered[$team]) && in_array($player,$answered[$team]));
    }

    // 回答リストに付け加え(playersは複数の可能性あり)
    public static function add_answered_lists($team,$players){

        // answeredのセッションがないとき
        if(gettype(session()->get("answered_lists"))!=="array"){
            throw new \Error("noAnsweredListsSessionError");
        }

        // 現在保存されている正解リスト
        $answered_lists_base=session()->get("answered_lists");

        // 正解リストのコピーに追加
        // そのチームのキーがあるかで方法は変更
        if(isset($answered_lists_base[$team])){
            $answered_lists_base[$team]=[...$answered_lists_base[$team],...$players];
        }else{
            $answered_lists_base[$team]=[...$players];
        }

            // 正解リストに追加
            Session::create_sessions([
                "answered_lists"=>$answered_lists_base
            ]);

    }
}
