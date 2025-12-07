<?php

namespace App\Actions\Config;

// config操作における取り出したデータの並び替え
class SortDataForView{
  // new_comerの全員のデータを見せるとき
  static public function sort_data_for_show_all($new_comers,$teams,$cates){

        // チームの配列に選手名リストを付加
        $team_player_sets=array_map(fn($team)=>[...$team,"players"=>array_column(array_filter($new_comers,fn($new_comer)=>$new_comer["team"]===$team["eng_name"]),"full")],$teams);
            
        // チームと選手の配列を「チーム→チームデータ」に変更
        $team_player_sets=array_combine(array_column($team_player_sets,"eng_name"),array_map(fn($team)=>(array_filter($team,fn($key)=>$key!="eng_name", ARRAY_FILTER_USE_KEY)),$team_player_sets));

                        
        // チームをカテゴリ=>チームの配列に並べる
        $players_teams_cates_sets=array_combine($cates,array_map(fn($cate)=>array_filter($team_player_sets,fn($team)=>$team["cate"]===$cate),$cates));

        // チームをカテゴリー内部で5チームずつ分ける(flex表示用)
        $flex_converted_players_teams_cates_sets=[];
        foreach($players_teams_cates_sets as $cate=>$each_cate_sets){
            $each_inner=[];
            $inner_index=-1;
            $total_index=0;
            foreach($each_cate_sets as $team=>$each_team_sets){
                if($total_index % 5===0){
                    $inner_index+=1;
                }
                $each_inner[$inner_index][$team]=$each_team_sets;
                $total_index+=1;
            }
            $flex_converted_players_teams_cates_sets[$cate]=$each_inner;
          }
          return $flex_converted_players_teams_cates_sets;
  }

}