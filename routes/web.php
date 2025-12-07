<?php

use App\Http\Controllers\AnswerCheckController;
use App\Http\Controllers\BeforeGameController;
use App\Http\Controllers\ConfigCheckController;
use App\Http\Controllers\ConfigIndividualUpdateController;
use App\Http\Controllers\ConfigUpdateController;
use App\Http\Controllers\PlayingGameController;
use App\Http\Controllers\GameClearController;
use App\Http\Controllers\ShowRankingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;


//web.phpにあるだけで、webミドルウェアが適用される(CSRFTokenも適用)

Route::middleware(['web'])->group(function(){

    // トップページへ(戻ってから進んだ時対策にnochace設定)
    Route::get('/topPage', [BeforeGameController::class,"show_top_page"])
    ->middleware("nocache")
    ->name("top_page_route");

    // トップページへ(post)
    Route::get('/redirectTopPage', function(){
        return redirect()->route("top_page_route");
    })
    ->middleware("nocache")
    ->name("top_page_redirect_route");

    // ゲームからトップページに戻るのを防ぐ用の、sessionを削除するルーティング
    Route::post("/gameSessionsDelete",[BeforeGameController::class,"delete_sessions_to_forbit_back_game"])
    ->name("game_session_delete_route");


    // ゲーム開始の投稿
    Route::post("/quiz_pattern_decide",[PlayingGameController::class,"quiz_pattern_decide"])
    ->middleware("nocache")
    ->name("quiz_pattern_decide_route");

    // ゲームページへ(ランダム)
    Route::get("/game_random",[PlayingGameController::class,"start_random_game"])
    ->middleware("nocache")
    ->name("game_random_route");

    // ゲームページへ(チームごと)
    Route::get("/game_by_team",[PlayingGameController::class,"start_by_team_game"])
    ->middleware("nocache")
    ->name("game_by_team_route");

    // 回答チェック
    Route::post("/game/answerCheck",[AnswerCheckController::class,"answer_check"])
    ->name("answer_check_route");

    // ゲームクリア
    Route::post("/game.clear",[GameClearController::class,"game_clear"])
    ->middleware("nocache")
    ->name("game_clear_route");

    // ゲームクリアをリロードした時(トップに戻る)
    Route::get("/game.clear",function(){return redirect()->route("top_page_route");});

    // 結果ページ一覧へ(seasonはシーズン選択、トップなどから移動する場合は引数なし)
    Route::get("/showRanking",[ShowRankingController::class,"show"])
    ->name("show_rank_route");
    
    // 結果ページ一覧にpostする場合(30位以下取得などのバリデーションを加味)
    Route::post("/showRanking",[ShowRankingController::class,"show"])
    ->name("show_rank_route");
        
    // 結果ページの年代変更
    Route::get("/changeRankingSeason",[ShowRankingController::class,"change_season"])
    ->name("rank_change_route");
    

    // お知らせ
    Route::get("/sign",function(){
        return Inertia::render("Sign",[
            "message"=>session("signMessage")
        ]);
    })->name("sign_route");

    //エラーページ(フロントからencodeURIComponentで)
    Route::get("/error_from_front",function(){
                
        return Inertia::render("Error",[
            "message"=>request()->query("message") ?? "unexpected"
        ]);
    })->name("error_from_front_route");

    // エラーページへ(Laravelからフラッシュsessionで)
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

    // 現在のnew_comer登録選手選手
    Route::get("/show_all_new_comers",[ConfigIndividualUpdateController::class,"show_all_new_comers"])
    ->name("show_all_route");
    
    // 1人ずつnew_comerを追加
    Route::get("/add_new_comers_individually",[ConfigIndividualUpdateController::class,"add_new_comers_individually"])
    ->name("add_individually_route");
    
    // new_comerが現在の選手リストに存在するかのチェック
    Route::get("/check_new_comers_players_in_players_lists",[ConfigIndividualUpdateController::class,"check_new_comers_in_players_lists"])
    ->name("check_new_comers_route");

    //実験用
    // Route::get("/date_test",function(){
    //     return Inertia::render("OnlyConfig/DataUpdateDateSetter");
    // });

 }
);
