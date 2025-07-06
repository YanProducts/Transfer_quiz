<?php

namespace App\Http\Controllers;

use App\Actions\Sessions\GameSessionHandlers;
use Illuminate\Http\Request;
use App\Http\Requests\QuizPatternRequest;
use Inertia\Inertia;
use App\Enums\CateEnum;
use App\Models\Team;
use App\Actions\GameSettings\SetAnswerBox;
use Illuminate\Support\Facades\Log;

class PlayingGameController extends Controller
{
    //ゲームパターン決定
    public function quiz_pattern_decide(QuizPatternRequest $request){

        // ゲームの際のSessionの登録など
        GameSessionHandlers::game_session_setting($request);

        // 複数回出てくるのでセット
        $cate=$request->cate;

        // ランダムの時
        if($request->quiz==="random"){

            return Inertia::render("Game/QuizPlayRandom",[
                "gameId"=>session()->get("game_id"),
                "name"=>$request->name,
                "cateInJpn"=>CateEnum::jpnDescriptions()[$cate],
                "answerBoxCounts"=>SetAnswerBox::byRandom($cate) //枠の数
            ]);
        }else{
            return Inertia::render("Game/QuizPlayByTeam",[
                "gameId"=>session()->get("game_id"),
                "name"=>$request->name,
                "cateInJpn"=>CateEnum::jpnDescriptions()[$cate],
                "teamsAndBoxes"=>SetAnswerBox::byTeam($cate) //チームごとの枠の数
            ]);
        }


    }
}
