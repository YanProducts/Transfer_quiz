import React from "react";
import { Inertia } from "@inertiajs/inertia";

export default function alreadyPlayedInformationSetting(){
    React.useEffect(()=>{

    // ブラウザの遷移は戻るアラート
    const firstMessageSetting=()=>{
        const nowDateBase=new Date();
        const nowDate=nowDateBase.getFullYear()+ "_" +(nowDateBase.getMonth()+1)+ "_" + nowDateBase.getDate();
        if(!localStorage.getItem("TransferQuizBackButtonAlert") || localStorage.getItem("TransferQuizBackButtonAlert")!==nowDate){
            alert("ページが移動した時、\nまたはリロードした時に、\nゲームが終了します。\nご注意ください")
        }
        localStorage.setItem("TransferQuizBackButtonAlert",nowDate);
    }
    firstMessageSetting();

    // localstorageの格納
    const stroageSetting=()=>{
        localStorage.setItem("TransferQuizErrorOccured",true);
        localStorage.setItem("TransferQuizAlreadyPlayed",true);
    }

    // １：ウィンドウから離れるとき
    window.addEventListener("beforeunload",stroageSetting)
    // ２：履歴が変化したとき
    window.addEventListener("popstate",stroageSetting)


    // ３：Inertiaのリンクからゲームを離れる時(履歴が変化しない場合)
        const beforeMoveJudgeOnInertia=(e)=>{

            // 何らかのエラーが生じてリンクの情報が入って来なかった場合＝アラートを出さずに遷移
            if(!e.detail?.visit?.url){
                return;
            }

            if((String(e.detail.visit.url)).indexOf("/game.clear")===-1 && !localStorage.getItem("TransferQuizErrorOccured")){
                if(!window.confirm("ゲームは終了します。\nよろしいですか？")){
                    e.preventDefault();
                    return;
                }
            }
            localStorage.setItem("TransferQuizAlreadyPlayed",true);
        }

        // 登録と同時に解除用の関数を受け取る
        const remove=Inertia.on("before",beforeMoveJudgeOnInertia);

        // アンマウントされないので必要ないが念の為
        return (()=>{
            remove();
            window.removeEventListener("popstate",stroageSetting);
            window.removeEventListener("beforeunload",stroageSetting);
        })
    },[])

    //  reactの機能を使うなら関数呼び出しでもUIが操作されないだけでコンポーネントとして処理される
    return null;
}
