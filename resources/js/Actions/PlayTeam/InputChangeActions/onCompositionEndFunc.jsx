import inputsStateChange from "./Common/inputsStateChange";

// 日本語終了に伴う処理
export default function onCompositionEndFunc(total_n,skipCompositionNext,setInputSets,team,tempInputValue,setChangePoint,setFocusIndex,inputRefs,isComposing){

      // 日本語入力終了→幾つかのState変更という処理を行うため、(半角等の際の)変換終了→State変更の処理を止める
      skipCompositionNext.current=true;

      // 回答フォームと入力カーソルの変化
      inputsStateChange(setInputSets,total_n,team,tempInputValue,setChangePoint,inputRefs,setFocusIndex);
  
      // 日本語変換も終了(先にskipComotisionNextを行わないとisComposingのみで半角発火の恐れあり)
      isComposing.current = false;

      // isComposingとskipCompostitionNextはrefなのでreturnしなくても値が変更される
}



