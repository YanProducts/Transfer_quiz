<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\DataSettings\Players;
use App\Http\Requests\PlayerDataChangeRequest;
use App\Http\Requests\DateDataChangeRequest;
use App\Models\DataChangeDate;
use App\DataSettings\DataSetFlow;
use App\Models\SeasonChangeSetting;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ConfigUpdateController extends Controller
{
    // データ変更の本番処理
    public function players_data_change(PlayerDataChangeRequest $request){
        try{
            // トランザクションは各々の内部で行なっている
            $request->changeTheme==="onlyPlayer" ?  DataSetFlow::update_now_players() :  DataSetFlow::update_new_comer($request->updateSeason);
        }catch(\Throwable $e){
            Log::info($e->getMessage());
            return Inertia::render("Error",[
            "message"=>config("app.env")==="local" ? $e->getMessage() : "設定上のエラーです"
        ]);
       }
        // 日付セットへ
        return Inertia::render("OnlyConfig/DataUpdateDateSetter",[
            "changeTheme"=>$request->changeTheme
        ]);
    }

    // 登録日時の日付のSQL挿入
    public function data_update_date_setting(DateDataChangeRequest $request){
       try{
         DB::transaction(function()use($request){
             // すでに登録されているかで分ける。
             $data_change_date=new DataChangeDate()::find(1) ?? new DataChangeDate();
  
             $new_date=new \Datetime(sprintf("%04d-%02d-%02d 0:0:0",$request->year,$request->month,$request->day));
             
             // 以前の登録データ最新日時(参照)
             $old_date=$data_change_date->now_player_data_date ?? $new_date;
  
             // 登録日時変更はpublicとlocalどちらであろうとも行う
             $data_change_date->now_player_data_date=$new_date;
             $data_change_date->save();
  
              // transfer_dataの場合のみ行う(いつからいつまでの間の移籍データか)
              if($request->changeTheme==="transfer_data"){
                  $season_change=new SeasonChangeSetting()::find(1) ?? new SeasonChangeSetting();
                  $season_change->before=$old_date;
                  $season_change->before=$new_date;
                  $season_change->save();
              }
         });
       }catch(\Throwable $e){
            Log::info($e->getMessage());
            return Inertia::render("Error",[
            "message"=>config("app.env")==="local" ? $e->getMessage() : "設定上のエラーです"]);
       }
       return redirect()->route("sign_route")->with("signMessage","設定が完了しました。\nSQLを確認してください");
    }


}
