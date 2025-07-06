<?php

// 登録などの操作における処理(選手)
namespace App\DataSettings;

use App\Models\NowPlayerList;
use App\Models\NewComer;
use App\DataSettings\SpecialCaseName;
use App\Constants\Players as ConstantsPlayers;
use App\DataSettings\Parts\HandleEachPlayerParts;
use App\DataSettings\Parts\InOutParts;
use Illuminate\Support\Facades\Log;

class Players{

//  fileから選手をループして取得
// フォルダ名がfolder、処理名がwhat
  public static function loop_players_in_file($folder,$which){

    // 重い処理なのでメモリーを増やす
    ini_set('memory_limit', '1024M');

    // チームファイルへのリンク
    $player_files=glob(storage_path("app/files/".$folder."/team_name")."/*.txt");

    // ()（）がある
    $with_kakko_players=[];
    // partにカンマがない
    $no_comma_players=[];
    // 過去に例外になっていた選手
    $past_exception_players=[];
    // 新選手の格納(チェック/publicの場合のみ)
    $new_players_list=[];

    try{
        foreach($player_files as $player_file){

        // checkの時には例外選手を返す
        if($which==="check"){
            // ()（）がある // partにカンマがない // 過去に例外になっていた選手 //全リスト(後に新加入選手リストで使用)
            [$new_with_kakko_players,$new_no_comma_players,$new_past_exception_players,
            $new_players_list_base]=self::handle_each_player_data($player_file,file($player_file),$folder,$which);

            $with_kakko_players=[...$with_kakko_players,...$new_with_kakko_players];
            $no_comma_players=[...$no_comma_players,...$new_no_comma_players];
            $past_exception_players=[...$past_exception_players,...$new_past_exception_players];
            $new_players_list=[...$new_players_list,...$new_players_list_base];
        }else if($which==="update"){
            // checkではない時は新加入
            self::handle_each_player_data($player_file,file($player_file),$folder,$which);
        }else{
            throw new \Error("予期せぬ処理です");
        }
      }

      if($which==="check"){
      return [$with_kakko_players,$no_comma_players,$past_exception_players,$new_players_list];
      }
    }catch(\Throwable $e){
        // 呼び出し元にthrow
        throw new \Error($e->getMessage());
    }

}


    // ファイルからのチームごとの選手データ操作(トランザクション内部に既にいる)
    public static function handle_each_player_data($filename,$lists,$folder,$which){
      $new_players_list=[];
      try{
            // それぞれの定義を決定
            [$ptn_name,$with_kakko_players,$no_comma_players,$past_exception_players,$team,$n]=HandleEachPlayerParts::set_definitions($filename);

            // ローカルの時のチーム名チェック(本番登録の時は別途チェックしてる)。まだTeamテーブルを作成していない段階では確認法がないため省略
            Teams::team_name_check_in_local($team,$folder);
            

          foreach($lists as $list){

              // 選手データは３行に１つ
              if($n%3===0){

             // それぞれの選手リストからフルネームと名前の部分を取得
              [$fullname,$partname]=HandleEachPlayerParts::get_each_player_names($ptn_name,$list);

              // チェックではない場合はSQL更新
              if($which!=="check"){
                HandleEachPlayerParts::store_players($team,$partname,$fullname);
               // チェックの場合は名前を返す
               }else{
                [$with_kakko_players,$no_comma_players,$past_exception_players,$new_players_list]=HandleEachPlayerParts::return_names_on_check($team,$fullname,$partname,$folder,$with_kakko_players,$no_comma_players,$past_exception_players,$new_players_list);
                }
              }
              // 次の行へ
              $n++;
          }
          //checkの際は返す(このチームにおける例外選手が格納)
          if($which==="check"){
              return [$with_kakko_players,$no_comma_players,$past_exception_players,$new_players_list];
          }

      }catch(\Throwable $e){
        // 呼び出し元にthrow
        throw new \Error($e->getMessage());
      }
   }

  //inとoutの確認用
  public static function in_out_check($new_players_list){

    $in_lists=[];
    $out_lists=[];

    // 各定義の取得
    [$new_teams,$relegated_teams,$old_players_list,$lookups_from_old,$lookups_from_now]=InOutParts::getting_data_for_check($new_players_list);

    // 新加入選手の取得(昇格チーム以外)
    $in_lists=InOutParts::getting_in_lists_for_check($in_lists,$new_players_list,$new_teams,$lookups_from_old);

    // 新加入選手の取得(昇格チーム)
    $in_lists=InOutParts::getting_in_lists_in_new_teams($in_lists,"",$new_teams,$lookups_from_now,"check");

    // 特別ケースのチェック(同姓同名選手の追加など)
    $in_lists=InOutParts::getting_special_case_players($in_lists,$lookups_from_now,"","check");

    // 登録名変更は新加入リストから削除
    $in_lists=InOutParts::remove_name_chaneg_players_in_check($in_lists);

    // 退団選手
    $out_lists=InOutParts::getting_out_lists_for_check($old_players_list,$relegated_teams,$lookups_from_now,$out_lists);

    return [$in_lists,$out_lists];

  }


  //新加入選手のセット（すでにNowPlayerListに登録された後なのでcheckとは理屈が変わる）
  public static function new_comer_setting($old_lists,$season){

    // 各定義の取得
    [$new_teams,$now_array,$lookups]=InOutParts::getting_data_for_upload($old_lists);

    // SQL挿入
    InOutParts::upload_new_players($now_array,$lookups,$season,$new_teams);

    // 新加入選手の取得(昇格チーム)
    $in_lists=InOutParts::getting_in_lists_in_new_teams([],$season,$new_teams,$lookups,"upload");

    // 同姓同名が加わったときなど＝特殊リストにて記載
    InOutParts::getting_special_case_players($in_lists,$lookups,$season,"upload");
  }

}
