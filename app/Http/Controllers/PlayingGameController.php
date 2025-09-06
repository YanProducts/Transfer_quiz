<?php

namespace App\Http\Controllers;

use App\Actions\Sessions\GameSessionHandlers;
use App\Http\Requests\QuizPatternRequest;
use Inertia\Inertia;
use App\Enums\CateEnum;
use App\Enums\NameEnum;
use App\Models\Team;
use App\Actions\GameSettings\SetAnswerBox;
use App\Enums\UpdateDataSeasonEnum;
use App\Models\SeasonChangeSetting;
use Illuminate\Support\Facades\Log;

class PlayingGameController extends Controller
{
    //ゲームパターン決定
    public function quiz_pattern_decide(QuizPatternRequest $request){

        // ゲームの際のSessionの登録など(Idに紐づいてcateやnameやquizもsessionで登録する)
        GameSessionHandlers::game_session_setting($request);

        // getでページ遷移
        // ランダムの時
        if($request->quiz==="random"){
            return redirect()->route("game_random_route");
        }else{
        //チームごとの時
            return redirect()->route("game_by_team_route");
        }
    }

    // ランダムゲーム開始
    public function start_random_game(){
        // 複数回出てくるのでセット
        $cate=session()->get("cate");

        return Inertia::render("Game/QuizPlayRandom",[
                "gameId"=>session()->get("game_id"),
                "uniqueTokenBase"=>session()->get("unique_token"),
                "nameType"=>NameEnum::jpnDescriptions()[session()->get("name")],//日本語の名前形式
                "cate"=>CateEnum::jpnDescriptions()[$cate],//日本語のカテ
                "teams"=>$cate==="all" ? Team::all()->pluck("jpn_name","eng_name") : Team::where("cate","=",$cate)->pluck("jpn_name","eng_name"),//チーム名の英語=>日本語の配列(選択肢に必要)
                "answerBoxCounts"=>SetAnswerBox::byRandom($cate), //枠の数
                "season"=>UpdateDataSeasonEnum::jpnDescriptions()[SeasonChangeSetting::value("season")], //日本語のシーズン
                "from_date"=>new \Datetime(SeasonChangeSetting::value("before"))->format("n/j"), //いつからのデータか
                "to_date"=>new \Datetime(SeasonChangeSetting::value("after"))->format("n/j") //いつまでのデータか
        ]);
    }

    // チームごとゲーム開始
    public function start_by_team_game(){
        // 複数回出てくるのでセット
        $cate=session()->get("cate");
        return Inertia::render("Game/QuizPlayByTeam",[
            "gameId"=>session()->get("game_id"),
            "uniqueTokenBase"=>session()->get("unique_token"),
            "nameType"=>NameEnum::jpnDescriptions()[session()->get("name")],//日本語の名前形式
            "cate"=>CateEnum::jpnDescriptions()[$cate],//日本語のカテ
            "teams"=>$cate==="all" ? Team::all() : Team::where("cate","=",$cate)->get(),//チームのデータ(色なども含む)
            "teamsAndBoxes"=>SetAnswerBox::byTeam($cate), //チームごとの枠の数
            "season"=>UpdateDataSeasonEnum::jpnDescriptions()[SeasonChangeSetting::value("season")], //日本語のシーズン
            "from_date"=>new \Datetime(SeasonChangeSetting::value("before"))->format("n/j"), //いつからのデータか
            "to_date"=>new \Datetime(SeasonChangeSetting::value("after"))->format("n/j") //いつまでのデータか
        ]);
    }
}
