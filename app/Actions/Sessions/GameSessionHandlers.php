<?php

namespace App\Actions\Sessions;
use App\Utils\Session;

// ゲームの際のsessionの登録や削除
class GameSessionHandlers{
    // 登録
    static public function game_session_setting($data){
        // ゲームの状態のほか、一時保存IDもここで登録
        Session::create_sessions([
            "gameId"=>bin2hex(random_bytes(32)),
            "cate"=>$data->cate,
            "name"=>$data->name,
            "quiz"=>$data->quiz,
        ]);
    }
}
