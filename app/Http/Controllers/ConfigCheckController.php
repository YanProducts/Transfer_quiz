<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\DataSettings\Players;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use App\Enums\UpdateDataSeasonEnum;
use App\Enums\UpdateDataChangeThemeEnum;


class ConfigCheckController extends Controller
{

    // 選手データの例外とインアウトのチェック
    public function players_data_check($folder){

        // 名前の例外チェック
        try{
            [$with_kakko_players,$no_comma_players,$past_exception_players,$new_players_list]=Players::loop_players_in_file($folder,"check");
            // 新加入選手と退団選手のリスト
            [$in_lists,$out_lists]=$folder==="public" ? Players::in_out_check($new_players_list) : ["",""];

        }catch(\Throwable $e){
            return Inertia::render("Error",[
                "message"=>config("app.env")==="local" ? $e->getMessage() : "設定上のエラーです"
            ]);
        }

        return Inertia::render("OnlyConfig/ShowPlayersInfo",[
            "with_kakko_players"=>$with_kakko_players,
            "no_comma_players"=>$no_comma_players,
            "past_exception_players"=>$past_exception_players,
            "folder"=>$folder,
            "in_lists"=>$folder==="public" ? $in_lists : null,
            "out_lists"=>$folder==="public" ? $out_lists : null,
        ]);
    }

    // 本番変更用のページの表示
    public function view_data_change_prepare_page(){

        return Inertia::render("OnlyConfig/PlayerDataChange",[
            "ChangeThemeOptions"=>UpdateDataChangeThemeEnum::jpnDescriptions(),
            "SeasonChangeOptions"=>UpdateDataSeasonEnum::jpnDescriptions(),
        ]);
    }



}
