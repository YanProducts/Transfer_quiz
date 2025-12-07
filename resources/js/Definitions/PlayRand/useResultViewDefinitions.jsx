import React from "react";
import { updateTableContents } from "@/Actions/PlayRand/updateTableContents";

export default function useResultsViewDefinitions(isAfter,isFirst){

const answeredFromStorage=localStorage.getItem("TransferQuizRandomAlreadyAnswered") ? JSON.parse(localStorage.getItem("TransferQuizRandomAlreadyAnswered")) : [];

    // 画面サイズによって表示変更
const [thContents,setThContents]=React.useState({
    num:"回答数",
    player:"選手名",
    team:"チーム名"
 });
 const [thWidth,setThWidth]=React.useState({
    1:"w-1/6",
    2:"w-2/3",
    3:"w-1/6",
});


  // 非表示のtrが存在する長さかどうか
  const [trOverFlowFlug, setTrOverFlowFlug]=React.useState(false);

  // 全て表示するか部分的に表示するか
  const [viewPartOrAll,setViewPartOrAll]=React.useState(false);

  // 正解のテーブルリスト
  const [answeredLists,setAnsweredLists]=React.useState([""]);

  // 全てを表示を押したとき
  const onClickViewAllTrs=()=>{
      setViewPartOrAll(true);
  }

  // １部を非表示を押したとき
  const onClickHiddenTrs=()=>{
      setViewPartOrAll(false);
  }


    // 最初と正解リストと表示の方法が変わったときに、テーブルの表示を変える
    React.useEffect(()=>{
      if(!isFirst && !isAfter){
          return;
      }
    //   コンポーネントの初期構築と回答直後以外の時は、回答テーブルの更新
      updateTableContents(answeredFromStorage,setAnsweredLists,setTrOverFlowFlug);
      const when_resize=()=>{
        updateTableContents(answeredFromStorage,setAnsweredLists,setTrOverFlowFlug);
      }
      window.addEventListener("resize",when_resize);
      return ()=>{window.removeEventListener("resize",when_resize)}
  },[isFirst,isAfter,viewPartOrAll]);


  return [thContents,setThContents,thWidth,setThWidth,trOverFlowFlug,viewPartOrAll,answeredLists,onClickViewAllTrs,onClickHiddenTrs];

}
