import React from "react";
import { OnRondomResultColumns, StyleRondom } from "../CustomStyle/OnRondomResultView";
import useResultsViewDefinitions from "@/Definitions/PlayRand/useResultViewDefinitions";

// 回答を全部合わせて答える場合
export default function ResultView({isAfter,isFirst}){

    const [thContents,setThContents,trOverFlowFlug,viewPartOrAll,answeredLists,onClickViewAllTrs,onClickHiddenTrs]=useResultsViewDefinitions(isAfter,isFirst);

    return(
        <div>
            <OnRondomResultColumns setThContents={setThContents} />
            <table className="base_table">
                <thead>
                <tr>
                    <th className="w-1/6 text-center border-2 border-black custom_th_1">{thContents.num}</th>
                    <th className="w-2/3 text-center border-2 border-black custom_th_2">{thContents.player}</th>
                    <th className="w-1/6 text-center border-2 border-black custom_th_3">{thContents.team}</th>
                </tr>
            </thead>
            <tbody>
                <tr className={`${trOverFlowFlug ? (viewPartOrAll ? "table-row" : "hidden"): "hidden"} bg-white text-blue-800 font-bold cursor-pointer`}><td className="text-center underline" colSpan="3" onClick={onClickHiddenTrs}>１部を非表示</td></tr>
                <tr className={`${trOverFlowFlug ? (viewPartOrAll ? "hidden" : "table-row"): "hidden"} bg-white text-blue-800 font-bold cursor-pointer`}><td className="text-center underline" colSpan="3" onClick={onClickViewAllTrs}>全てを表示</td></tr>
                {answeredLists}
            </tbody>
        {/* 「要素が規定より小さい場合」なので例外的にstyle属性 */}
        <StyleRondom/>
     </table>
    </div>
    )
}
