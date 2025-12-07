// 結果を表示したテーブルの更新
export function updateTableContents(answeredFromStorage,setAnsweredLists,setTrOverFlowFlug){

      // それぞれのtr要素を表示するかどうか(useEffect内でループのため、状態変数からは外す)
      let viewEachTr="";
      // trOverFlowに後に格納するローカル変数
      let trOverFlowFlugInLocal=false;

      // storageの回答リストに回答がない時
      if(answeredFromStorage.length===0){
              setAnsweredLists(
                  <tr>
                      <td colSpan="3" className="w-1/1 text-center bg-white">まだ回答はありません</td>
                  </tr>
              )
      }else{
          // 表示する正解リストに格納
          // 初期状態はtrを全て表示
              setAnsweredLists(
              // storageから得た回答リストから一発挿入
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