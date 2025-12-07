// import { useCalculateDifferenceAndMovePage } from "../../Pages/Utils/useAccessTimeSetting";

import { Inertia } from "@inertiajs/inertia";


// RandomもByTeamも共通(変数の言葉のみ揃えた)
// 回答ボタンを押した後に回答チェック
export default async function gameplay_fetch(props){
    //fetchのヘッダー
    const headers=new Headers({
        'Content-Type': 'application/json',
         // 自動送信されているが、念のため行う(laravelとの変更で適合しないので非推奨)
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content || "missingToken"
    });


    // 投稿
    try{

       const response=await fetch(
           `${import.meta.env.VITE_APP_URL}/game/answerCheck`,
            {
                method:"POST",
                headers:headers,
                body:JSON.stringify({
                    answer:props.inputs,
                    quizType:props.quiz_type,
                    nameType:props.name_type==="名前の一部" ? "part" : (props.name_type==="登録名" ? "full":""),
                    // teamごとの場合は複数ではある
                    team:props.team,
                    cate:props.cate,
                    answered:props?.answered || localStorage.getItem("TransferQuizByTeamAlreadyAnswered"),
                    unique_token:props.uniqueToken,
                    gameId:props.gameId
                })
          });

        if(!response.ok){

            if(response.status===422){
                // バリデーションエラー
                throw new Error(JSON.stringify({"validationError":"予期せぬエラーが発生しました"}));
             }else{
                throw new Error(JSON.stringify({"undefinedError":"予期せぬエラーが発生しました"}));
             }
       }


        const returnJson=await response.json();

          // 新たにゲームが始まったとき
            if(returnJson?.customError==="gameId"){
                
                    alert("別のゲームが始められた可能性が高いので、ゲームを終了します");

                    // get遷移はInertia構築のタイミング次第でブレる
                    window.location.href="/topPage";                    
                    
                    // エラーを投げておかないと先に進んでエラーになるため投げる。実際は描写の前に移動
                    throw new Error("newGameStarted");
                     

            // 二重投稿防止
            }else if(returnJson?.customError==="uniqueToken"){
                // 何もしないが先に進まないために投げる
               throw new Error("duplicated");
            }else if(returnJson?.customError){
                // それ以外でエラーあり
               throw new Error(returnJson?.customError);
           }

        return {
            ...returnJson,
            "success":true,
        }
    }catch(e){
        return {
            "success":false,
            "errorMessage":e.message
        };
    }
}


