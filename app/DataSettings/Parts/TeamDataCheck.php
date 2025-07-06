<?php

namespace App\DataSettings\Parts;
use App\Enums\CateEnum;

// チームのデータに誤りがないかチェックする機能
class TeamDataCheck{
  
  // ファイルのチーム名に重複がないか
  public static function team_name_isDuplicated($team_name_from_teamCateTxt){
        $text_line_counts=array_count_values($team_name_from_teamCateTxt);
        $duplicates=array_keys(array_filter($text_line_counts,fn($t)=>$t>1));
        if(!empty($duplicates)){
            throw new \Error("以下のチームがteamcate.txtで重複しています\n".implode("・",$duplicates));
        }
  }

  // 配列は同じか？
  public static function is_same_data($team_name_from_teamCateTxt,$team_name_from_teamname_file){
    $only_teamname_file=array_diff($team_name_from_teamname_file,$team_name_from_teamCateTxt);
    if(!empty($only_teamname_file)){
        throw new \Error("以下のチームがファイルのみに存在しています\n".implode("・",$only_teamname_file));
    }
    $only_teamcate_txt=array_diff($team_name_from_teamCateTxt,$team_name_from_teamname_file);
    if(!empty($only_teamcate_txt)){
        throw new \Error("以下のチームカテのtxtのみに存在しています\n".implode("・",$only_teamcate_txt));
    }
   }
 
   // チームとカテの数は正しいか？
  public static function team_and_cate_number_check($team_name_from_teamCateTxt){
        // チーム数が60か(配列のずれはないので１つで良い)
        if(count($team_name_from_teamCateTxt)!==60){
          throw new \Error("チーム数が60ではありません");
      }

      // 各カテが20ずつか
      $cate_enum=CateEnum::getDescriptions();
      $cate_count_array=array_count_values(array_map(fn($line)=>explode(",",$line)[2],file(storage_path("app/files/public/team_cate_sets/team_cate.txt"))));
      foreach($cate_enum as $cate){
          if(!empty($cate_count_array[$cate]) && $cate_count_array[$cate]!==20){
              throw new \Error("各カテのチーム数が20ずつではありません");
          }
      }
    }




}