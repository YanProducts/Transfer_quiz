<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\SeasonChangeSetting;
use Illuminate\Support\Facades\DB;
use App\Enums\UpdateDataSeasonEnum;
use App\Http\Requests\RankingRequest;
use App\Models\NewComer;
use Illuminate\Support\Facades\Log;

class ShowRankingController extends Controller
{
    //ランキングページへ
    public function show(RankingRequest $request){
                
        // seasonの取得。なければ現在シーズン(日本語が返る)
        // 日本語を返す
        $season=$request->season ?? SeasonChangeSetting::select("season")->value("season");
        
        $base_query=["new_comers.team","new_comers.full","teams.red","teams.green","teams.blue"];
        
        // 全ての結果の取得
        $full_resluts=DB::table("new_comers")->join("teams","new_comers.team","=","teams.eng_name")->select([...$base_query,"new_comers.answer_full"])->where("new_comers.season","=",$season)->orderByDesc('answer_full')->get();
        $part_resluts=DB::table("new_comers")->join("teams","new_comers.team","=","teams.eng_name")->select([...$base_query,"new_comers.answer_part"])->where("new_comers.season","=",$season)->orderByDesc('answer_part')->get();

        return Inertia::render("Ranking/Ranking",[
            // シーズンは日本語を返す
            "season"=> UpdateDataSeasonEnum::jpnDescriptions()[$season],
            "engSeason"=>$season,
            "fullResults"=>$full_resluts,
            "partResults"=>$part_resluts,
            "viewAll"=>$request->viewAll ?? ""
        ]);
    }

    // 年代の変更
    public function change_season(){
        // 「英語のシーズン名=>日本語のシーズン名」という配列で返す

        // シーズン名を配列で取得
        $season_lists=NewComer::groupBy("season")->pluck("season")->toArray();

        // 上記の日本語を配列で取得
        $jpn_season_lists=array_map(fn($season)=>UpdateDataSeasonEnum::jpnDescriptions()[$season],$season_lists);

        // 年代取得(seasonListstは英語のキー=>日本語のvalueの配列で返す)
        return inertia::render(
            "Ranking/ResultSeasonLists",[
                "seasonLists"=>array_combine($season_lists,$jpn_season_lists)
        ]);
    }

    // 年代の決定

}
