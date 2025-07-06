import React from "react"
// selectのセット メモ化したメモを呼び出す
import ChoiceSelectComponentsOnDate from "@/CustomComponents/Config/ChoiceSelectComponentsOnDate";
import DataUpdateDateSetterDefinitions from "@/Definitions/DataUpdateDateSetterDefinitions";

export default function DataUpdateDateSetter({changeTheme}){

    const [daySets,post,data,setData,errors,setError,processing,monthLastDay,setMonthLastDay,onYearChange,onMonthChange,onDayChange,selectOptionHiddenStr,errorDisplay,onDataChangeClick]=DataUpdateDateSetterDefinitions(changeTheme);

    return(
        <div>
            <p>　</p>
            <div className="base_frame border-4 border-black rounded-md pt-5 pb-5 text-center mb-5  min-w-[510px] font-bold">
                <p className="mb-5 text-lg">選手データは<br className="inline sm:hidden"/>いつの年月日のデータ？</p>
                <div className="flex justify-center min-w-[500px]">
                    <ChoiceSelectComponentsOnDate selectOptionHiddenStr={selectOptionHiddenStr} dateUnit="年" changeFunc={onYearChange} choiceOptionValue={data.year} length={3} plusAlpha={daySets.getFullYear()-1}/>
                    <ChoiceSelectComponentsOnDate selectOptionHiddenStr={selectOptionHiddenStr} dateUnit="月" changeFunc={onMonthChange} choiceOptionValue={data.month} length={12} plusAlpha={1}/>
                    <ChoiceSelectComponentsOnDate selectOptionHiddenStr={selectOptionHiddenStr} dateUnit="日" changeFunc={onDayChange} choiceOptionValue={data.day}  length={monthLastDay} plusAlpha={1}/>
                </div>
                    {errors? 
                    <div className="mt-4">
                    {(Object.values(errors)).flat().map((message,index)=>
                        <div key={index} className={`${errorDisplay} base_frame base_error font-bold mt-2`}>{message}</div>
                    )}
                    </div>
                    : null}
            </div>
            <div className="base_frame min-w-[400px]">
               <button className={`base_btn font-bold ${processing ? "pointer-events-none opacity-30" : "pointer-events-auto opacity-100"}`} onClick={onDataChangeClick}>決定！</button>
             </div>
        </div>
    )
}
