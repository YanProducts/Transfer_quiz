import React from "react";
import useAlreadyPlayedInformationSetting from "@/Utils/Game/AutoPageTransition/useAlreadyPlayedInformationSetting";
import useBackToTopPageWhenPlayGame from "@/Utils/Game/AutoPageTransition/useBackToTopPage";
import settingRightState from "./EachDefaultActions/settingRightState";
import { settingIsAfterWhenNotCorrect } from "./EachDefaultActions/settingIsAfterWhenNotCorrect";
import settingRightCount from "./EachDefaultActions/settingRightCount";
import settingUiWhenCorrect from "./EachDefaultActions/settingUiWhenCorrect";
import changeView from "./EachDefaultActions/changeView";
import visitErrorPage from "@/Utils/Error/ToErrorRoute";

// playteamの初期状態でのEffectなどのAction集
export default function useDefaultActions(isFirst,setIsFirst,fetchReturn,setUniqueToken,setIsRightState,setNowAlreadyPlayers,setError,isRightState,isAfter,setIsAfter,setRightCountForUI,rightCountForUI,finishTeam,setFinishTeam,teams,teamsAndBox,setOpenedInput,setNowAnalyzing,setInputSets,moveResult,setMoveResult,error,post){

// 条件に合った際はトップページへ遷移
useBackToTopPageWhenPlayGame();
// リロードの際のページ遷移の案内と準備
useAlreadyPlayedInformationSetting();

// 最初だけ、回答済み選手のlocalStorageを空にする
 React.useEffect(()=>{
    if(isFirst){
        // 回答された選手のストレージの削除
        localStorage.removeItem("TransferQuizByTeamAlreadyAnswered");
        setIsFirst(false)
    }
 },[])



  // fetch後①：fetchDoneによって変化が生じたfetchReturnの値によって正解したかの値をセット
  React.useEffect(()=>{

    // 各項目をsetする & falseが返ってきたら終了
    if(!settingRightState(fetchReturn,setUniqueToken,setIsRightState,setNowAlreadyPlayers,setError)){
        return;
    }
  },[fetchReturn])


// fetch後②：isRightStateが変更した後で、正解者をリストに捕捉する
React.useEffect(()=>{

        // 取得前・エラー・不正解・の時(左記の場合は先に進まない)
        if(!settingIsAfterWhenNotCorrect(isRightState,setIsAfter)){return}

        // 正解の時に正解リストの格納と表示分の変更
       settingRightCount(fetchReturn,setRightCountForUI)
       
},[isRightState])


// fetch後③-1：rightCountForUiが変化が生じたら、UIの変更(正解の時のみ反応)
React.useEffect(()=>{
    // Ui変更→isAfter設定
    settingUiWhenCorrect(isRightState,teams,rightCountForUI,teamsAndBox,finishTeam,setFinishTeam,setRightCountForUI,setOpenedInput,setIsAfter)
},[rightCountForUI])

// fetch後3-②(isAfterが変化すれば常に反応。不正解時は2-前半、正解時は3-1の最後に反応する)
React.useEffect(function(){
  // 実際にviewの変更(この内部でクリアの時の遷移も行う)。最後にtimerを返して、クリア関数に繋げる
  const timer=changeView(isAfter,setNowAnalyzing,setInputSets,finishTeam,teams,setIsAfter,setIsRightState,moveResult,setMoveResult,setRightCountForUI,post);
    // useEffect内部での処理を終了後に、useEffectが発生する前の状態に戻す(次回のuseEffect実行時に備える)
  return()=>{
        clearTimeout(timer);
        setMoveResult(false);
   }
},[isAfter])

// fetchReturnでエラーが生じた場合
React.useEffect(()=>{
  visitErrorPage(error)
},[error])

}