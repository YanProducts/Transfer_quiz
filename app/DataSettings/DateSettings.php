<?php

namespace App\DataSettings;

use App\Models\DataChangeDate;
use App\Models\SeasonChangeSetting;

// 年度など日付系統のセッティング
class DateSettings{

    // 新しい年度の更新
    public static function set_new_season($new_season){
        // 「いつから」はlocalを更新した日時
        // 「いつまで」は暫定的に本日(すぐ次の処理で変更)
        // id=1が存在するかで新規作成か更新かを変更
        $season_in_sql=SeasonChangeSetting::find(1) ?? new SeasonChangeSetting();
        $season_in_sql->season=$new_season;
        $season_in_sql->before=DataChangeDate::value("now_player_data_date") ?? date("Y-m-d H:i:s",time());
        $season_in_sql->after=date("Y-m-d H:i:s",time());
        $season_in_sql->save();
    }
}
