<?php

// 登録などの操作における処理(選手)
namespace App\DataSettings;

use App\Models\NowPlayerList;
use App\Models\Team;
use App\DataSettings\Parts\TeamDataCheck;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class Teams{

    // ファイルにあるチーム名とteam_cate_sets.txtのチェック
    public static function team_data_check(){

        // ファイルから
        $team_name_from_teamname_file=array_map(fn($file)=>substr(basename($file),0,-4)
        ,glob(storage_path("app/files/public/team_name/*")));

        // team_cate_setsから
        $team_name_from_teamCateTxt=array_map(fn($data)=>mb_substr($data,0,mb_strpos($data,",")),file(storage_path("app/files/public/team_cate_sets/team_cate.txt")));

        // ファイル名が重複しないか？
        TeamDataCheck::team_name_isDuplicated($team_name_from_teamCateTxt);

        // 配列が同じか(違う要素を返す)
        TeamDataCheck::is_same_data($team_name_from_teamCateTxt,$team_name_from_teamname_file);

        // チームとカテの数は正しいか？
        TeamDataCheck::team_and_cate_number_check($team_name_from_teamCateTxt);
    }

    // チームデータのSQL登録
    public static function team_data_change(){
        // すでにトランザクションの内部にいる
        // truncateはロールバックできない
        DB::table("teams")->delete();
        $team_data_sets=file(storage_path("app/files/public/team_cate_sets/team_cate.txt"));
        foreach($team_data_sets as $team_data){
            $team_instance=new Team();
            $team_data_array=explode(",",$team_data);
            $team_instance->eng_name=$team_data_array[0];
            $team_instance->jpn_name=$team_data_array[1];
            $team_instance->cate=$team_data_array[2];
            $team_instance->red=$team_data_array[3];
            $team_instance->green=$team_data_array[4];
            $team_instance->blue=$team_data_array[5];
            $team_instance->save();
        }
    }


    // 新しく昇格したチームの取得(teamsテーブルになく、ファイルがあるもの)
    public static function getTeamChanges($which){

    // ファイルからのチーム名
    $player_files=glob(storage_path("app/files/public/team_name")."/*.txt");
    $team_names_from_file=array_map(fn($p)=>substr(basename($p),0,-4),$player_files);

    //SQLにあるチーム名(１：登録チームがすでにあれば登録チーム、まだなければ選手リストのチームから取得(更新前のみ可能))
    $team_names_from_sql=Team::pluck("eng_name");
    if($team_names_from_sql->isEmpty()){
        $team_names_from_sql=NowPlayerList::groupBy("team")->pluck("team");
    }

    // 昇格チーム
    if($which==="new"){
        return array_diff($team_names_from_file,$team_names_from_sql->toArray());
    // 降格チーム
    }else if($which==="relegated"){
        return array_diff($team_names_from_sql->toArray(),$team_names_from_file);
    }else{
        throw new \Error("昇降格チーム取得時のエラーです");
    }

    }


    // ローカルの時のチーム名チェック(本番登録の時は別途チェックしてる)。まだTeamテーブルを作成していない段階では確認法がないため省略
    public static function team_name_check_in_local($team,$folder){
    if($folder==="local" && Team::exists() && !Team::where("eng_name","=",$team)->exists()){
        throw new \Error("以下のチームはSQLに存在していません\n".$team);
    }
    }

}
