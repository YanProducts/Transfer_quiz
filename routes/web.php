<?php

use App\Http\Controllers\BeforeGameController;
use App\Http\Controllers\ConfigCheckController;
use App\Http\Controllers\ConfigUpdateController;
use App\Http\Controllers\PlayingGameController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;


//web.phpにあるだけで、webミドルウェアが適用される(CSRFTokenも適用)

Route::prefix("/transfer_quiz")->group(function(){

    // トップページへ
    Route::get('/topPage', [BeforeGameController::class,"show_top_page"])
    ->name("top_page_route");

    // ゲーム開始
    Route::post("/quiz_pattern_decide",[PlayingGameController::class,"quiz_pattern_decide"])
    ->name("quiz_pattern_decide_route");

    // お知らせ
    Route::get("/sign",function(){
        return Inertia::render("Sign",[
            "message"=>session("signMessage")
        ]);
    })->name("sign_route");

    // エラーページへ
    Route::get("/error",function(){
        return Inertia::render("Error",[
            "message"=>session("errorMessage")
        ]);
    })->name("error_page_route");

    // config系統
    // 選手データに例外がないかのチェック(publicかlocalかは選択)
    Route::get("/players_data_check_{folder}",[ConfigCheckController::class,"players_data_check"])
    ->where("folder","local|public")
    ->name("players_data_check_route");

    // 登録前の確認ページの表示
    Route::get("/players_data_change_preparation",[ConfigCheckController::class,"view_data_change_prepare_page"])
    ->name("player_data_change_preparation_route");

    // 選手登録のformからの投稿
    Route::post('/players_data_change',[ConfigUpdateController::class,"players_data_change"])
    ->name("players_data_change_route");

    // 登録年月日のSQL挿入(選手登録から行う)
    Route::post("/data_update_date_setting",[ConfigUpdateController::class,"data_update_date_setting"])
    ->name("data_update_date_setting_route");


    //実験用
    // Route::get("/date_test",function(){
    //     return Inertia::render("OnlyConfig/DataUpdateDateSetter");
    // });


    // 選手登録のみの更新(storage/app/localを使用:transfer_listの生成しない)

    // 選手登録と新加入リストの更新(storage/app/publicを使用:transfer_listの生成する:同時に過去のSQLから過去の記録入力を行う)


 }
);
