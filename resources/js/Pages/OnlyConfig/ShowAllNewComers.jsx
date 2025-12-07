import React from "react";
import { useShowAllCssSetting } from "@/Actions/OnlyConfig/useShowAllCssSetting";
import ShowAllDataComponents from "@/CustomComponents/Config/ShowAllDataComponents";

// 新加入選手のリスト(違っていた場合に個別登録に繋げる)
export default function ShowAllNewComers({AllPlayersDataSets}){
  
  React.useEffect(()=>{
    // CSSのセット(チームの背景の色)
    useShowAllCssSetting();
  },[]);

  return(
    <div className="bg-emerald-200">
        <p>　</p>
        <h2 className="base_h1 base_h min-w-[1200px]">現在の新加入選手一覧</h2>
        <div className="base_frame min-w-[1200px] text-center">
          <ShowAllDataComponents AllPlayersDataSets={AllPlayersDataSets}/>
        </div>
        <p>　</p>
        </div>
  )
  
}