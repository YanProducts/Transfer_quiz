<?php

// データSQL挿入、一連の流れ
namespace App\DataSettings;

use App\DataSettings\Players;
use App\Models\NowPlayerList;
use App\Models\SeasonChangeSetting;
use App\Models\Team;

use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DataSetFlow{

    //新年度の選手とチームの登録
    public static function update_new_comer($season){
        try{
            // チームデータを変更するかどうか
            $need_team_change=(str_contains($season,"end") || !Team::exists());
            // 旧テーブルの取得
            $old_player_lists=NowPlayerList::all();
            // team_cate_setsと選手ファイルのチーム名に差異がないか？(seasonにEndがついていた場合のみ行う)
            if($need_team_change){
                Teams::team_data_check();
            }
            

            DB::transaction(function()use($old_player_lists,$season,$need_team_change){
                // 旧テーブルの削除 //truncateはロールバックできない
                DB::table("now_player_lists")->delete();
                // ファイルからの取得して更新
                Players::loop_players_in_file("public","update");
                // newComerのセット
                Players::new_comer_setting($old_player_lists,$season);
                // チームの更新(昇降格の判定がnew_comer_settingで行われるので、その後に更新する)
                if($need_team_change){
                 Teams::team_data_change();
                }
            
                // 次のReactで滞った時の保険に、新シーズンのセット(ただしafetrが登録日時ではなく現在日時になる)
                DateSettings::set_new_season($season);
            });
          }catch(\Throwable $e){
            // コントローラーにエラーを返す
            throw new \Error($e->getMessage());
          }
    }

    //現在の選手の登録更新のみ
    public static function update_now_players(){
        try{
            DB::transaction(function(){
                // truncateはロールバックできないのでdeleteで行う
               DB::table("now_player_lists")->delete();
                // 新たな選手データの更新
                // 既存選手のみの更新だからlocalで行う
               Players::loop_players_in_file("local","update");
            });
        }catch(\Throwable $e){
            // コントローラーにエラーを返す
            throw new \Error($e->getMessage());
        }

    }

}
