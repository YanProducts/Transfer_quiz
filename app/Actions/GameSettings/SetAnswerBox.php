<?php

 namespace App\Actions\GameSettings;
 use App\Models\NewComer;
 use App\Models\SeasonChangeSetting;
 use App\Models\Team;
 use Illuminate\Support\Facades\Log;

// 回答の枠がいくつ必要かを返す
 class SetAnswerBox{
    // ランダムの場合
    static public function byRandom($cate){
    // 該当シーズンの新加入選手のコレクション
     $new_comer_in_season=NewComer::where("season",SeasonChangeSetting::value("season"));
    //    カテゴリーごとの
     if($cate!=="all"){
        $new_comer_in_season->whereIn("team", Team::where("cate","=",$cate)->pluck("eng_name"));
     }
      return($new_comer_in_season->count());
    }

    // チームごとの場合(チーム数→枠の数の配列で返す)
    static public function byTeam($cate){
        // 返す用の配列
        $returned_array=[];

        // 各カテのチームの取得
        $teams_base=($cate!=="all" ? Team::where("cate","=",$cate) : Team::all());

        // チームの英語名、日本語名、変換用(N+1防止)を取得
        $teams=$teams_base->pluck("jpn_name","eng_name");

        // そのシーズン&カテゴリーの選手の取得
        // 英語のチーム名=>選手数の配列で返す
        // N+1を避ける
        $returned_array=NewComer::where("season",SeasonChangeSetting::value("season"))->whereIn("team",array_keys($teams->toArray()))->selectRaw("team, COUNT(*) as teamCounts")->groupBy("team")->pluck("teamCounts","team")->toArray();

        
        // １人もいないチームは0を返す
        foreach(array_keys($teams->toArray()) as $team){
            if(!isset($returned_array[$team])){
                $returned_array[$team]=0;
            }
        }

        // 配列を返す
        return $returned_array;
    }

 }
