<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Enums\CateEnum;
use App\Enums\NameEnum;
use App\Enums\QuizEnum;
use App\Utils\Session;

use Illuminate\Support\Facades\Log;


class BeforeGameController extends Controller
{
    //ゲームのトップページへ
    public function show_top_page(){

        // session削除(該当分のみ。全削除したらcsrftokenのセッションも破棄してしまう)
        Session::delete_sessions(["gameId","cate","name","quiz"]);

        // トップページへ
        return Inertia::render('TopPage',[
            "quizSets"=>QuizEnum::jpnDescriptions(),
            "nameSets"=>NameEnum::jpnDescriptions(),
            "cateSets"=>CateEnum::jpnDescriptions()
        ]);
    }
}
