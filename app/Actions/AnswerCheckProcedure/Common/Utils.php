<?php

namespace App\Actions\AnswerCheckProcedure\Common;

use App\Actions\Sessions\GameSessionHandlers;
use App\Utils\Session;
use Illuminate\Support\Facades\Log;

// 回答確認の共通処理(期間部分)
class Utils{

    // ゲームIDと回答tokenのチェック(&新しいユニークトークンの作成=ここでやらないと二重投稿が引っかからない
    public static function id_token_check($game_id,$unique_token){

        // 新たにゲームが開始していたらエラーページへ
        if($game_id!==session()->get("game_id")){
            throw new \Error("gameId");
        }


        // 二重投稿(エラーは投げるがJs側で遷移はしない)
        if($unique_token!==session()->get("unique_token")){
            Log::info("duplicated");
            throw new \Error("uniqueToken");
        }        

        //新しいゲームトークンの作成
        Session::create_sessions(["unique_token"=>bin2hex(random_bytes(32))]);
    }

    // フルネームのチェンジ
    public static function name_change($inputVal){
        //スペースをカンマに変える
        $inputVal=mb_ereg_replace(" ",",",$inputVal);
        //全角スペースをカンマに変える
        $inputVal=mb_ereg_replace("　",",",$inputVal);
        //「・」をカンマに変える
        $inputVal=mb_ereg_replace("・",",",$inputVal);
        // 返す（これでpartと同じかを考える）
        return $inputVal;
    }

}
