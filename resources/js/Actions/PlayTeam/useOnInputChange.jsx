// input周りの変化
import React from "react";
import ComposingDefinitisons from "@/Definitions/PlayTeam/useComposingDefinitions";
import onCompositionEndFunc from "./InputChangeActions/onCompositionEndFunc";
import onInputChangeFunc from "./InputChangeActions/onInputChangeFunc";
import onInputBlurFunc from "./InputChangeActions/onInputBlurFunc";

export function useOnInputChange(team,setInputSets,inputRefs,nowAnalyzing){

  // 定義
  const [isComposing,tempInputValue,focusIndex,setFocusIndex,changePoint,setChangePoint,skipCompositionNext,ignoreInputFocus]=ComposingDefinitisons();

  // 日本語入力開始
  const onInputCompositionStart = () => {
    isComposing.current = true;
  };

  // 日本語入力終了
  const onInputCompositionEnd = (total_n) => {
    onCompositionEndFunc(total_n,skipCompositionNext,setInputSets,team,tempInputValue,setChangePoint,setFocusIndex,inputRefs,isComposing)
  };

  // 各inputが変更された時(日本語入力変換時はOnCompositionChangeが行うように設計、一部を除いて半角時の対応がメイン)
  const onInputChange = (total_n,value) => {
    onInputChangeFunc(total_n,value,tempInputValue,isComposing,skipCompositionNext,setInputSets,team,setChangePoint,inputRefs,setFocusIndex)
  };

// 離れる際に①フォーカスを今の位置から離す②値の確定(空値以外)
  const onInputBlur=(total_n)=>{
    onInputBlurFunc(ignoreInputFocus,tempInputValue,total_n,setInputSets,team) 
  }

  // カーソルの位置が変化した時
  const onInputFocus=(total_n)=>{
    setFocusIndex(total_n);
  }

  // inputSetsが変更した後、変更したinputに引き続きfocusする(focusの変更はBlur時に行う、Blur発生時にはreturn)
    React.useEffect(()=>{

      // 離れる際に同じ位置を再度focusするのを避ける(Blur発生時はreturn)
        if(ignoreInputFocus.current){
            ignoreInputFocus.current=false;
            return;
        }

        // 何もfocusされていないときはreturn
        if(!focusIndex){
          return;
        }

        // 現在focusしている要素を選択
        inputRefs.current[focusIndex]?.focus();

        // 現在focusしている最後の文字を選択
        inputRefs.current[focusIndex]?.setSelectionRange(changePoint,changePoint)

    },[focusIndex,changePoint])


    React.useEffect(()=>{
        if(nowAnalyzing){
            // 解析中はinput要素を操作できないようにする
            setFocusIndex("");
            // 解析中にtempInputValueを削除
            const temKeys=Object.keys(tempInputValue.current);
            temKeys.forEach((key)=>{
                tempInputValue.current[key]="";
            })
        }
    },[nowAnalyzing])


    return{onInputCompositionStart,onInputCompositionEnd,onInputChange,onInputBlur,onInputFocus};
}