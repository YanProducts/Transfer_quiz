import { openProcessByteam } from "@/CustomComponents/Game/ByTeam/openProcessByTeam";

// Ui変更→isAfter設定(準備ができていなければ戻る)
export default function settingUiWhenCorrect(isRightState,teams,rightCountForUI,teamsAndBox,finishTeam,setFinishTeam,setRightCountForUI,setOpenedInput,setIsAfter){
     // isRightState数値か&rightCountForUIがOKどうかをチェック
     if(isNaN(Number(isRightState)) || rightCountForUI!=="prepare"){
      // 数値でない&準備できてない場合 effectがここで終わるので、returnで終わってOK
      return;
   }

  let oneTimeModifiedRightCount=isRightState;

  // 回答されたリストを見て、チームごとに空いている番号を取得
  let beforeOpenedLiInput={};

  // この回答で終了を迎えたチーム
  let nowAnsweredFinishTeamLists=[];

  const nowLocalStorageData=JSON.parse(localStorage.getItem("TransferQuizByTeamAlreadyAnswered") || "{}") ?? {};

  Object.keys(nowLocalStorageData).forEach((teamFromAnswered)=>{
      // liをチェックするための何番目か
      let liNumber=0;

      // 開ける場所を決定
      teams.forEach((teamFromProps,index)=>{

          const requiredAnswer=teamsAndBox[teamFromProps.eng_name];

          [liNumber,beforeOpenedLiInput,oneTimeModifiedRightCount,nowAnsweredFinishTeamLists]=openProcessByteam(liNumber,teamFromProps,teamFromAnswered,
          requiredAnswer,nowLocalStorageData,beforeOpenedLiInput,finishTeam,oneTimeModifiedRightCount,nowAnsweredFinishTeamLists);
      })
      setFinishTeam([...finishTeam,...nowAnsweredFinishTeamLists]);
  })

  // 修正された正解数の格納
  setRightCountForUI(oneTimeModifiedRightCount)

  // 開ける
  setOpenedInput(beforeOpenedLiInput);

  // // 回答後画面へのフラグ(isAfter)反映
  setIsAfter(true);

}