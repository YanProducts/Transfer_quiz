<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\GameClearRequest;
use Inertia\Inertia;
use App\Enums\QuizEnum;
use Illuminate\Support\Facades\Log;

//ゲームをクリアした時のコントローラー
class GameClearController extends Controller
{

    // クリア→クリア画面の表示
    public function game_clear(GameClearRequest $request){
        // requestでgameIdが違えばErrorページで
        if(!session()->exists("game_id") || $request->gameId!==session()->get("game_id")){
            return Inertia::render("Error",[
                "message"=>"ルートがおかしいです"
            ]);
        }

        return Inertia::render("Game/Clear",[
            "cate"=>$request->cate,
            "nameType"=>$request->name,
            "quizType"=>QuizEnum::jpnDescriptions()[$request->quiz],
        ]);
    }


}
