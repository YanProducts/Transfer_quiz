// 正解を開ける処理
export function openProcessByteam(liNumber,teamFromProps,teamFromAnswered,requiredAnswer,answeredInStorage,beforeOpenedLiInput,finishTeam,oneTimeModifiedRightCount,nowAnsweredFinishTeamLists){

  let answerNumberByTeam=0;

  if(teamFromProps.eng_name===teamFromAnswered){

    for(let n=liNumber;n<liNumber+requiredAnswer;n++){

          // 今回新たに開かない要素
          // そのチームの正解数(answered[teamFromAnswered].length)の方が、forの順番よりも少なかったときは、そのままInputのままにする
          if(answeredInStorage[teamFromAnswered].length<n-liNumber+1){
              break;
          }

          //answeredは新たに開かれたものではなく既に開かれたものを兼ねているので、「これまでに開かれたもの」も含めて全て開く

          // 空いていない番号から順に、openenInputに入れていく(正解リストにあり＝初回は必ず行う)
          beforeOpenedLiInput={
              ...beforeOpenedLiInput,
              [n]:answeredInStorage[teamFromAnswered][answerNumberByTeam]
          }
          answerNumberByTeam++;


          // 最後のinput要素まできたとき(正解欄1つに対して3人の佐藤の時、正解数を２減らす処理)
          if(answerNumberByTeam>=requiredAnswer){

              // 既に最後まで来たチームをリストに格納して処理させない。そのチーム以外について処理を回す
              if(finishTeam.includes(teamFromAnswered)){
                  break;
              }

              //isRightStateが正解数だが、これを変化させたら別のEffectも動かしてしまうので、別に格納
             oneTimeModifiedRightCount=(oneTimeModifiedRightCount-(answeredInStorage[teamFromAnswered].length-answerNumberByTeam));

              // この回答で終了を迎えたチーム
              nowAnsweredFinishTeamLists.push(teamFromAnswered);
          }
      }
  }
  liNumber+=requiredAnswer;
  return [liNumber,beforeOpenedLiInput,oneTimeModifiedRightCount,nowAnsweredFinishTeamLists];
}