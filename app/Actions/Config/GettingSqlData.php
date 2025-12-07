<?php

namespace App\Actions\Config;

use App\Enums\CateEnum;
use App\Models\NewComer;
use App\Models\Team;

// config操作におけるSQLデータの取得
class GettingSqlData{
  // new_comders一覧表示におけるSQLデータの取得
  static public function get_sql_for_show_all(){
        // 新加入選手
        $new_comers=NewComer::select("full","team")->get()->toArray();

        // チーム
        $teams=Team::select("eng_name","jpn_name","cate","red","green","blue")->get()->toArray();

        // カテゴリー一覧
        $cates=array_filter(array_keys(CateEnum::jpnDescriptions()),fn($key)=>$key!=="all");

        return[$new_comers,$teams,$cates];

  }

}