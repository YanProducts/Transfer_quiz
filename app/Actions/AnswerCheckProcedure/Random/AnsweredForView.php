<?php
// 正解者リストを表示用に変換
namespace App\Actions\AnswerCheckProcedure\Random;
use App\Models\Team;

class AnsweredForView{
      // 表示用の正解者リストの取得
    public static function get_answered_lists_for_view($team,$players_data){
      // 表示用の正解リスト
      // 色の取得
      $color_data=Team::select("red","green","blue")->where("eng_name","=",$team)->first();
      // 日本語のチーム
      $team_in_jpn=Team::where("eng_name","=",$team)->value("jpn_name");
      // 表示用の配列
      $players_data=array_map(function($each_data)use($team_in_jpn,$color_data){
          return[
              "player"=>$each_data,
              "team"=>$team_in_jpn,
              "red"=>$color_data->red,
              "green"=>$color_data->green,
              "blue"=>$color_data->blue,
          ];
      },$players_data);

      // 表示用のデータを返す
      return $players_data;
    }

}