<?php

// 選手データの例外のチェック
namespace App\DataSettings;
use App\Models\NowPlayerList;
use App\Constants\Players as ConstantsPlayers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;


class SpecialCaseName{

    // これまでに存在した選手名の例外を訂正(txtファイル登録で)
    public static function player_name_exceptions($player){

      // 訂正前のpartを訂正後のpartへ
      $exception_players_list=[
          "ファンウェルメスケルケン際"=>"ファン　ウェルメスケルケン　際",
          "舞行龍ジェームズ"=>"舞行龍　ジェームズ",
          "キアッドティフォーンウドム"=>"キアッドティフォーン・ウドム",
          "ジャルンサックウォンコーン"=>"ジャルンサック　ウォンコーン",
          "ウボングリチャードマンデー"=>"ウボング　リチャード　マンデー"
      ];

          if(array_key_exists($player,$exception_players_list)){
              return true;
          }
  }

    // fullに（や(がついた選手の取得(txtファイル登録で)
    public static function get_with_kakko_players($player){
      $regex="/[(\(|（)]+/u";
          if(preg_match($regex,$player)){
              return true;
          }
  }

  // partにカンマがない選手の取得 (txtファイル登録で)
  public static function get_no_comma_players($player){
      $regex="/,/u";
          if(!preg_match($regex,$player)){
              return true;
          }
  }

  // 登録名を変更した選手
  public function name_change_players(){

      // ここに登録名を変えた選手を入れる(beforeには姓名の間のスペースなし、afterにはpartの登録に必要なため空白を入れる)
      $change_player_lists=
          [
              // "tokyo_v"=>["before"=>"マテマテ","after"=>"マテウス"],
              // "kashima"=>["before"=>"安西,幸","after"=>"安西　幸輝"]
          ];

  if(empty($change_player_lists)){
      return true;
  }

    try{
      DB::transaction(function()use($change_player_lists){
          // SQLの変更
          foreach($change_player_lists as $team=>$player){

              // 登録データ
              $modify_player=NowPlayerList::where([
                  ["team","=",$team],
                  ["full","=",$player["before"]]
              ])->first();
              if(empty($modify_player)){
                  throw new \Exception("元データに該当する選手がいません");
              }
              // 変更
              $modify_player->full=str_replace("　","",$player["after"]);
              $modify_player->part=str_replace("　",",",$player["after"]);
              // 登録
              $modify_player->save();
           }
          });
      }catch(\Throwable $e){
          Log::info($e->getMessage());
          return false;
      }
      return true;
  }

  // 同じチームで同じ名前の選手がいた場合で１人がやめた場合、その１人を削除リストに追加する
  public function one_delete_of_overTwo_nameInTeam($out_lists){
      $one_delete_lists=[
          // ["team"=>"kashima","player"=>"安西　幸輝"]
      ];
      $out_lists=[...$out_lists,...$one_delete_lists];
      return $out_lists;
  }

}
