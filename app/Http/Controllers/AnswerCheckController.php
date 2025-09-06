<?php

namespace App\Http\Controllers;

use App\Http\Requests\AnswerCheckRequest;
use App\Actions\AnswerCheckProcedure\Random\AnswerCheck as AnswerCheckRondom;
use App\Actions\AnswerCheckProcedure\ByTeam\AnswerCheck as AnswerCheckByTeam;
use Illuminate\Support\Facades\Log;

// 回答
class AnswerCheckController extends Controller
{
    //正誤のチェック(jsonで返す)
    public function answer_check(AnswerCheckRequest $request){
        try{             

            if($request->quizType==="random"){
                // jsonで返す
                return response()->json(AnswerCheckRondom::answer_check($request));
            }else{
                return response()->json(AnswerCheckByTeam::answer_check($request));
            }

        }catch(\Throwable $e){


            // 一時的なエラーの場合も考え、次に投稿できるようクイズトークンも返す
            switch($e->getMessage()){
                // 別のゲームが開始
                case "gameId":
                    return response()->json([
                        "customError"=>"gameId"
                    ]);
                break;
                // 二重投稿
                case "unique_token":
                    return response()->json([
                       "new_token"=>session()->get("unique_token"),
                        "customError"=>"uniqueToken"
                    ]);
                break;

                default:
                    return response()->json([
                        "new_token"=>session()->get("unique_token"),
                        "customError"=>"unExpected"
                    ]);
                break;
            }
        }
    }
}
