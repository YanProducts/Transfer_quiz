// 正解の時に正解数を取得する
export default function settingRightCount(fetchReturn,setRightCountForUI){
          // 正解の時

          const afterFetchLists=fetchReturn.returnedLists;

          let nowAnsweredObject=JSON.parse(localStorage.getItem("TransferQuizByTeamAlreadyAnswered") || "{}") ?? {};
  
          // 正解者の格納        
          Object.keys(afterFetchLists).forEach((team)=>{
              let list=afterFetchLists[team];
  
              // チームごとに回答済リストに格納
              // storageに入れる
              if(Object.keys(nowAnsweredObject).includes(team)){
                  // storageに入れる
                  nowAnsweredObject={
                      ...nowAnsweredObject,
                      [team]:[...nowAnsweredObject[team],...list]
                  };
              
              }else{
                  nowAnsweredObject={
                      ...nowAnsweredObject,
                      [team]:[...list]
                  };
              }
          })
          localStorage.setItem("TransferQuizByTeamAlreadyAnswered",JSON.stringify(nowAnsweredObject));
          setRightCountForUI("prepare");
}