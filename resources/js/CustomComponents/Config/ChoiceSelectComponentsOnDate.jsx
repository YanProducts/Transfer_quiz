import React from "react"
// 日付のセットの時のselect/optionの設定
function ChoiceSelectComponentsOnDate({selectOptionHiddenStr,dateUnit,changeFunc,choiceOptionValue,length,plusAlpha}){
    return(
        <div className="w-[30%] min-w-[100px] max-w-[500px] mx-1 border-black border-2 rounded-md py-3">
                <p className="mb-3">{dateUnit}</p>
                <select className="w-4/5 min-w-[100px]" onChange={changeFunc} value={choiceOptionValue}>
                <option key={0} hidden value={"no_choice"}>{selectOptionHiddenStr}</option>
                {Array.from({length:length},(_,i)=>
                    <option key={i+1} value={plusAlpha+i}>{plusAlpha+i}</option>
                )}
                </select>
        </div>
    )
}

export default React.memo(ChoiceSelectComponentsOnDate)
