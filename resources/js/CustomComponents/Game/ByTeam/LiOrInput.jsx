// li要素を返すかinput要素を返すか決定
export default function LiOrInput(total_n,blackOrWhite,openedInput,liHeight,nowAnalyzing,isAfter,inputRefs,inputSets,onInputChange,onInputCompositionStart,onInputCompositionEnd,onInputBlur,onInputFocus){


  if(Object.keys(openedInput).includes(String(total_n))){

      // openしているとき
        return(
            <li key={total_n} className="my-2 text-center  border-y w-full" style={{height:liHeight,lineHeight:liHeight,color:`${blackOrWhite}`,borderColor:`${blackOrWhite}`,borderStyle:'dashed'}}>
            <span className="font-bold">{openedInput[total_n]}</span>
            </li>
        )
    }else{
      // openしていないとき
        return(
            // refのelは、そのDOMのこと
            <li key={total_n} className="my-2 text-center w-full"
            style={{height:liHeight}}>
            <input
            type="text"
            //解析中の間はdisabled
            disabled={nowAnalyzing ? nowAnalyzing : isAfter} key={total_n} className="p-0 visible w-11/12" style={{color:"black",height:liHeight,backgroundColor:(nowAnalyzing || isAfter) ? "#f5f5f5" : "white",
            border: (nowAnalyzing || isAfter) ? '3px dashed #d3d3d3' : '1px solid #ccc',boxSizing:"border-box"}}
            ref={(el) => (inputRefs.current[total_n] = el)}
            // 動的なvalueではなく、初期値を変更し、動的な値は素のHTMLに任せる
            defaultValue={inputSets[total_n] ? (inputSets[total_n]["player"] ? inputSets[total_n]["player"] :"" ) : ""}
            onChange={(e) => onInputChange(total_n, e.target.value)}
            //  日本語入力開始
            onCompositionStart={onInputCompositionStart}
            //  日本語入力終了
            onCompositionEnd={(e) => onInputCompositionEnd(total_n,e)}
            // 離れる際
            onBlur={(e)=>onInputBlur(total_n)}
            // 焦点が当たったらここにfocus
            onFocus={(e) => onInputFocus(total_n)
            }
             />
             </li>
        )
    }
}