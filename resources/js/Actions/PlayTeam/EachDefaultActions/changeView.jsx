export default function changeView(isAfter,setNowAnalyzing,setInputSets,finishTeam,teams,setIsAfter,setIsRightState,moveResult,setMoveResult,setRightCountForUI,post){
    // クイズ回答後の場合は3秒後にクイズ回答前の状態にする
         if(isAfter){
   
           // isAfterがtrueになると、正解表示が出るため、解析中表示はなくなる
           setNowAnalyzing(false);
 
           // input要素はこの段階で空にして、3秒間の後に入力もできるようにする
           setInputSets({});
 
           // 回答前のUIへ戻す
           const timer=setTimeout(()=>{
               // クリアしたかどうか？
               let isClear=false;

               console.log(finishTeam);
               console.log(teams.length);
 
              //   正解チームの数が合計のチーム数を超えた時
               if(finishTeam.length>=teams.length){
                 isClear=true;
               }
 
               if(isClear){
                   // storageにクリアのフラグを挿入
                   localStorage.setItem("TransferQuizCleared",true);
                   setIsAfter(false);
                   setIsRightState("yet");
                   setRightCountForUI("");
                   if(!moveResult){
                       setMoveResult(true);
                       post(route(`game_clear_route`));
                   }
                   return null;
               } else {
                   setIsAfter(false);
                   setIsRightState("yet");
                   setRightCountForUI("");
               }
           },3000)
        // 関数を返す
           return timer;
       }else{
        // 何も処理しない関数を返す
        return ()=>{};
       }
}   