import React from "react";
export default function useResultsViewDefinitions(isAfter,isFirst){

const answeredFromStorage=localStorage.getItem("TransferQuizRandomAlreadyAnswered") ? JSON.parse(localStorage.getItem("TransferQuizRandomAlreadyAnswered")) : [];

    // 画面サイズによって表示変更
const [thContents,setThContents]=React.useState({
    num:"回答数",
    player:"選手名",
    team:"チーム名"
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


  // 正解が更新されるたびに、回答済テーブルの中身やクラスを変える
  const update_table_contents=()=>{

      // それぞれのtr要素を表示するかどうか(useEffect内でループのため、状態変数からは外す)
      let viewEachTr="";
      // trOverFlowに後に格納するローカル変数
      let trOverFlowFlugInLocal=false;

      if(answeredFromStorage.length===0){
              setAnsweredLists(
                  <tr>
                      <td colSpan="3" className="w-1/1 text-center bg-white">まだ回答はありません</td>
                  </tr>
              )
      }else{
          // 初期状態はtrを全て表示
              setAnsweredLists(
                  answeredFromStorage.map((m)=>{
                      // デフォルトは全て表示
                      viewEachTr="table-row";
                      if(
                          // 特定の場合、trの非表示
                         ((window.innerHeight>900 && answeredFromStorage.length-m.number>=30) ||
                          (window.innerHeight>700 && answeredFromStorage.length-m.number>=20) ||
                          (window.innerHeight>600 && answeredFromStorage.length-m.number>=15) ||
                          (window.innerHeight>400 && answeredFromStorage.length-m.number>=10) ||
                          (window.innerHeight<=400 && answeredFromStorage.length-m.number>=5))
                      ){
                      // 非表示の列自体が存在するかどうか
                      trOverFlowFlugInLocal=true;
                      //   実際に非表示にするかどうか
                        if(!viewPartOrAll){
                           viewEachTr="hidden";
                        }
                      }

                      const fontColor=0.299*m.red + 0.587 *m.green + 0.114*m.blue > 128 ? "black" : "white";

                      return(
                          <tr key={m.number} className={` ${viewEachTr} border-black font-bold`}
                          style={{ backgroundColor:`rgb(${m.red},${m.green},${m.blue})`,
                          color:fontColor
                          }}
                          >
                              <td className="w-1/6 text-center border-2 border-black custom_td_1">{m.number}</td>
                              <td className="w-2/3 text-center border-2 border-black custom_td_2">{m.player}</td>
                              <td className="w-1/6 text-center border-2 border-black custom_td_3">{m.team}</td>
                          </tr>
                      )
                  })
              )
              setTrOverFlowFlug(trOverFlowFlugInLocal)
          }
      }


    // 最初と正解リストと表示の方法が変わったときに、テーブルの表示を変える
    React.useEffect(()=>{
      if(!isFirst && !isAfter){
          return;
      }
      update_table_contents();
      const when_resize=()=>{
          update_table_contents();
      }
      window.addEventListener("resize",when_resize);
      return ()=>{window.removeEventListener("resize",when_resize)}
  },[isFirst,isAfter,viewPartOrAll]);


  return [thContents,setThContents,trOverFlowFlug,viewPartOrAll,answeredLists,onClickViewAllTrs,onClickHiddenTrs];

}
