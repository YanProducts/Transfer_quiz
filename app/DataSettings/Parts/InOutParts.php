<?php

// コードが冗長になりすぎるのを防ぐ
// 選手のinとoutをセットする部分の処理

namespace App\DataSettings\Parts;
use App\DataSettings\Teams;
use App\Models\NowPlayerList;
use App\Models\NewComer;
use App\Constants\Players;
use Illuminate\Support\Facades\Log;

class InOutParts{

    // 選手の新加入と退団のチェックのための定義のセット（昇格降格チーム/以前のリストと現在のリストを改変したリスト）
    public static function getting_data_for_check($new_players_list){
        // 昇格チームの取得
        $new_teams=Teams::getTeamChanges("new");
        $relegated_teams=Teams::getTeamChanges("relegated");
        // SQLに現在入っているリスト(旧リスト)：型エラーが出ていたので型宣言
        /** @var \Illuminate\Support\Collection $old_players_list */
        $old_players_list=NowPlayerList::all();
        // 旧リストのteam|fullをキーにした配列(新リストから検索などに使用)
        $lookups_from_old=$old_players_list->mapWithKeys(function($player)use($relegated_teams){
        //  降格チームの場合は記入しない
        if(in_array($player->team,$relegated_teams)){
            return [];
        }
        return [$player->team."|".$player->full=>true];
        });
        // 新リストのteam|fullをキーにした配列(旧リストから検索などに使用)
        $lookups_from_now=collect($new_players_list)->mapWithKeys(function($player){
        // 昇格選手のリストが正しいかの判定も行うので、昇格チームでも同様に取得
        return [$player["team"]."|".$player["full"]=>true];
        });

        return[$new_teams,$relegated_teams,$old_players_list,$lookups_from_old,$lookups_from_now];
    }

    // アップロードのための定義セット
    public static function getting_data_for_upload($old_lists){
        // 昇格チームの取得
        $new_teams=Teams::getTeamChanges("new");
        // 現在の選手登録(コレクションが配列になっている形で取得)
        $now_array=NowPlayerList::all()->all();
        //   旧選手リストを検索用に変換（高速化のために変換した連想配列を取得してキーで検索）
        $lookups=$old_lists->mapWithKeys(function($old){
            return([$old->team."|".$old->full=>true]);
        });
        return [$new_teams,$now_array,$lookups];

    }

    // 新加入選手のチェック(昇格チーム以外)
    public static function getting_in_lists_for_check($in_lists,$new_players_list,$new_teams,$lookups_from_old){
    foreach($new_players_list as $new_player){
        // 昇格チームなら継続(新加入選手を載せない)
        if(in_array($new_player["team"],$new_teams)){
          continue;
        }
        if(!isset($lookups_from_old[$new_player["team"]."|".$new_player["full"]])){
          // 新加入選手リスト
          array_push($in_lists,$new_player["team"]."...".$new_player["full"]);
        }
      }
      return $in_lists;
    }

    // 新加入選手のアップロード(昇格チーム以外)
    public static function upload_new_players($now_array,$lookups,$season,$new_teams){
      foreach($now_array as $now){
        // 昇格チームなら継続(新加入選手を載せない)
        if(in_array($now->team,$new_teams)){
          continue;
        }
        // 条件に合う選手がいない場合は新加入
        // 登録名変更の場合も登録しない
        $now_key=$now->team."|".$now->full;
        if(!isset($lookups[$now_key]) && !self::remove_name_chaneg_players_in_upload($now)){
            $new_comer=new NewComer();
            self::store_each_new_comer($new_comer,$now->full,$now->part,$now->team,$season);
        }
      }
    }



    // 昇格チームからの選手の追加(Constants/Players) checkもuploadも両方ここ
    public static function getting_in_lists_in_new_teams($in_lists,$season,$new_teams,$lookups_from_now,$which){
      foreach(Players::$new_players_in_new_teams as $player){
          // チームが昇格チームかのチェック
          if(!in_array($player["team"],$new_teams)){
              continue;
          }
          //選手が新しい選手リストにいるかのチェック          
          if(!isset($lookups_from_now[$player["team"]."|".mb_ereg_replace("　","",$player["player"])])){
              throw new \Error($player["team"]."...".$player["player"]."\nという選手がファイルに見当たりません");
          }

          // 新加入リストに追加
          if($which==="check"){
              array_push($in_lists,$player["team"]."...".mb_ereg_replace("　","",$player["player"]));
          }else if($which==="upload"){
            $new_comer=new NewComer();
            self::store_each_new_comer($new_comer,mb_ereg_replace("　","",$player["player"]),str_replace($player["player"],"　",","),$player["team"],$season);
          }else{
            throw new \Error("予期せぬ処理です");
          }
      }
      if($which==="check"){
          return $in_lists;
      }
    }

    // 特別ケースのチェック(同姓同名選手の追加など) checkもuploadも両方ここ
    public static function getting_special_case_players($in_lists,$lookups_from_now,$season,$which){
        foreach(Players::$special_case_players as $special_case){
            // ファイルに存在するか
            if(!isset($lookups_from_now[$special_case["team"]."|".mb_ereg_replace("　","",$special_case["player"])])){
              throw new \Error($special_case["team"]."...".$special_case["player"]."\nという選手がファイルに見当たりません");
          }
          // 新加入リストに追加
          if($which==="check"){
              array_push($in_lists,$special_case["team"]."...".mb_ereg_replace("　","",$special_case["player"]));
          }else if($which==="upload"){
            $new_comer=new NewComer();
            self::store_each_new_comer($new_comer,mb_ereg_replace("　","",$special_case["player"]),mb_ereg_replace("　",",",$special_case["player"]),$special_case["team"],$season);
          }else{
            throw new \Error("予期せぬ処理です");
          }
        }
        if($which==="check"){
            return $in_lists;
        }
    }

    // 登録名を変更しただけの選手を除く処理(check)
    public static function remove_name_chaneg_players_in_check($in_lists){
      $remove_players=array_map(fn($remove_player)=>$remove_player["team"]."...".$remove_player["player"],Players::$remove_players);

      $new_in_lists=array_values(array_diff($in_lists,$remove_players));
   
      return $new_in_lists;
     }

    // 登録名を変更しただけの選手を除く処理(upload)
    // $playerはteamとfullがセットされたコレクションの要素の１つ
    public static function remove_name_chaneg_players_in_upload($player){
      foreach(Players::$remove_players as $remove_player){
        if($remove_player["team"]===$player->team && $remove_player["player"]===$player->full){
          return true;
        }
      }
      return false;
    }


    // 退団選手のチェック
    public static function getting_out_lists_for_check($old_players_list,$relegated_teams,$lookups_from_now,$out_lists){
        // コレクションにはeachを使用
        $old_players_list->each(function($old_player)use($relegated_teams,$lookups_from_now,&$out_lists){

        // 降格チームの場合は記入しない
        if(in_array($old_player->team,$relegated_teams)){
            return;
        }

        if(!isset($lookups_from_now[$old_player->team."|".$old_player->full])){
            array_push($out_lists,$old_player->team."...".$old_player->full);
        }
      });
      return $out_lists;
    }

    // SQLに挿入
    public static function store_each_new_comer($new_comer,$full,$part,$team,$season){
      $new_comer->full=$full;
      $new_comer->part=$part;
      $new_comer->team=$team;
      $new_comer->new_season=$season;
      $new_comer->save();
    }


}
