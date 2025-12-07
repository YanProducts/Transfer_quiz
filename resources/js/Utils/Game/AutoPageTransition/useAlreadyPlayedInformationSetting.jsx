import React from "react";

// 最初に「リロードや遷移で戻るよ」とアナウンス
export default function useAlreadyPlayedInformationSetting(){
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

    },[])

}
