<?php
// コードが冗長になりすぎるのを防ぐ
// ファイルにある選手個々のデータからの操作

namespace App\DataSettings\Parts;
use App\Models\NowPlayerList;
use App\DataSettings\SpecialCaseName;

class HandleEachPlayerParts{

    // 様々な定義
    public static function set_definitions($filename){
          // 正規表現(名前の位置)
          $ptn_name = "/(?:[ぁ-んァ-ヴー一-龯々㟢龠﨑（）　\(\)])+/u";

          // 例外の戻りの格納(チェックの場合のみ)
          // ()（）がある
          $with_kakko_players=[];
          // partにカンマがない
          $no_comma_players=[];
          // 過去に例外になっていた選手
          $past_exception_players=[];

        // txtファイルを開いて１行ずつ取り出す
          $slashpoint=mb_strpos($filename,"team_name");
          $teamandtxt=mb_substr($filename,$slashpoint+10);
          $team=mb_substr($teamandtxt,0,mb_strlen($teamandtxt)-4);

          // 何行目か
          $n=0;

          return[$ptn_name,$with_kakko_players,$no_comma_players,$past_exception_players,$team,$n];
    }

    // 選手リストからフルネームと名前の一部を取得
    public static function get_each_player_names($ptn_name,$list){

              // 初期化
              $fullname="";
              $restname="";
              $partname=[];

              // 正規表現
              preg_match_all($ptn_name,$list,$namebase);

              // スペースが初めからない時の初期設定
              $fullname=$namebase[0][0];
              $partname[]=$namebase[0][0];
              $restname=$namebase[0][0];
              $spacepoint=mb_strpos($namebase[0][0],"　");

              // スペースごとに区切って名前を文字列に格納
              while(!empty($spacepoint)){
                $partname[]=mb_substr($partname[count($partname)-1],$spacepoint+1);
                array_splice($partname,count($partname)-2,1,mb_substr($restname,0,$spacepoint));
                $restname=mb_substr($restname,$spacepoint+1);
                $fullname=implode("",$partname);
                $spacepoint=mb_strpos($restname,"　");
              }
        return[$fullname,$partname];
    }

    // 選手の保存(checkではない場合):すでにトランザクション内部にいる
    public static function store_players($team,$partname,$fullname){
        $player_data=new NowPlayerList();
        $player_data->team=$team;
        $player_data->part=implode(",",$partname);
        $player_data->full=$fullname;
        $player_data->save();
    }

    // 条件に合う名前を返す（checkの場合）
    public static function return_names_on_check($team,$fullname,$partname,$folder,$with_kakko_players,$no_comma_players,$past_exception_players,$new_players_list){
            // コントローラーの呼び出し
            // 名前に(や（が入る
            if(SpecialCaseName::get_with_kakko_players($fullname)){
                $with_kakko_players[]=$team."...".$fullname;
            }
            // partにカンマなし
            if(SpecialCaseName::get_no_comma_players(implode(",",$partname))){
                $no_comma_players[]=$team."...".$fullname;
            }
            // 過去の例外の名前
            if(SpecialCaseName::player_name_exceptions($fullname)){
                $past_exception_players[]=$team."...".$fullname;
            }
            if($folder==="public"){
            $new_players_list=[...$new_players_list,[
                "team"=>$team,
                "part"=>implode(",",$partname),
                "full"=>$fullname
            ]];
            }

        return [$with_kakko_players,$no_comma_players,$past_exception_players,$new_players_list];
    }

}
