<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Actions\Config\GettingSqlData;
use App\Actions\Config\SortDataForView;
use Illuminate\Support\Facades\Log;

// new_comerの現在選手表示と個別登録
class ConfigIndividualUpdateController extends Controller
{
    //現在選手の全表示
    public function show_all_new_comers(){
        
        // SQLデータの取得
        [$new_comers,$teams,$cates]=GettingSqlData::get_sql_for_show_all();

        // データの並び替え
        $flex_converted_players_teams_cates_sets=SortDataForView::sort_data_for_show_all($new_comers,$teams,$cates);

        Log::info($flex_converted_players_teams_cates_sets);

        return Inertia::render("OnlyConfig/ShowAllNewComers",[
            "AllPlayersDataSets"=>$flex_converted_players_teams_cates_sets
        ]);
    }

    // 1人ずつnew_comersを追加
    public function add_new_comers_individually(){

    }

    // new_comerが現在の選手リストに存在するか
    public function check_new_comers_in_players_lists(){

    }
}
