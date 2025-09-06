    // inputのcomponents(quiz_typeの値で変化)

    import React from "react";
    import { InputStyleByInnerWidth,OptionDefaultViewChange } from "../CustomStyle/InputStyle";

    //   分割代入
   export const InputComponent=({teams,onAnswerBtnClick,inputRef,answerTeamRef,nowAnalyzing,isAfter})=>{


    // 要素を返す
        const [optionDefaultView,setOptionDefaultView]=React.useState("チームの選択");

        return(
            <>
            <OptionDefaultViewChange setOptionDefaultView={setOptionDefaultView}/>
            <form className="base_input_div flex justify-center form_font_change" onSubmit={onAnswerBtnClick} >
            <input id="inputFiled" className='h-10 ml-auto mr-2 w-1/3' ref={inputRef}/>
            <select id="selectfield" ref={answerTeamRef} className='mr-2 w-1/3 h-10'>
                <option hidden value="no_choice">{optionDefaultView}</option>

                {Object.entries(teams).map(([eng_name,jpn_name],index)=>
                   (<option key={index} value={eng_name}>{jpn_name}</option>))}

            </select>
            <button className={`base_btn inline-block ml-1 text-left font-bold ${(isAfter || nowAnalyzing) ? 'opacity-70 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}>回答！</button>
            <InputStyleByInnerWidth />
            </form>
            </>
        )
};
