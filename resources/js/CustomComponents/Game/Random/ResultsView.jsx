import React from "react";
import useRandomTableCssSetting from "../../../CssSettings/useRandomTableCssSetting.jsx";
import useResultsViewDefinitions from "@/Definitions/PlayRand/useResultViewDefinitions";

// 回答を全部合わせて答える場合
export default function ResultView({isAfter,isFirst}){

    // 定義セット
    const [thContents,setThContents,thWidth,setThWidth,trOverFlowFlug,viewPartOrAll,answeredLists,onClickViewAllTrs,onClickHiddenTrs]=useResultsViewDefinitions(isAfter,isFirst);

    // 実際のCssのセット
    useRandomTableCssSetting(setThContents,setThWidth);

    return(
        <div>

            <table className="base_table">
                <thead>
                <tr>
                    <th className={`${thWidth[1]} text-center border-2 border-black`}>{thContents.num}</th>
                    <th className={`${thWidth[2]} text-center border-2 border-black`}>{thContents.player}</th>
                    <th className={`${thWidth[3]} text-center border-2 border-black`}>{thContents.team}</th>
                </tr>
            </thead>
            <tbody>
                <tr className={`${trOverFlowFlug ? (viewPartOrAll ? "table-row" : "hidden"): "hidden"} bg-white text-blue-800 font-bold cursor-pointer`}><td className="text-center underline" colSpan="3" onClick={onClickHiddenTrs}>１部を非表示</td></tr>
                <tr className={`${trOverFlowFlug ? (viewPartOrAll ? "hidden" : "table-row"): "hidden"} bg-white text-blue-800 font-bold cursor-pointer`}><td className="text-center underline" colSpan="3" onClick={onClickViewAllTrs}>全てを表示</td></tr>
                {answeredLists}
            </tbody>
     </table>
    </div>
    )
}
