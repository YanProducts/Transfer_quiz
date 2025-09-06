<?php

namespace App\Actions\Sessions;
use App\Utils\Session;

// ゲームの際のsessionの登録や削除
class GameSessionHandlers{
    // 登録
    static public function game_session_setting($data){
        // ゲームの状態のほか、一時保存IDもここで登録
        Session::create_sessions([
            // ゲーム自体のID
            "game_id"=>bin2hex(random_bytes(32)),
            // 各回答ののID
            "unique_token"=>bin2hex(random_bytes(32)),
            "cate"=>$data->cate,
            "name"=>$data->name,
            "quiz"=>$data->quiz,
            // 回答された選手リスト(チーム=>選手の配列)
            "answered_lists"=>[]
        ]);
    }
}
