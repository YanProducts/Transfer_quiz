// 各inputが変更された時
// 日本語入力変換時はOnCompositionChangeが行うように設計、一部を除いて半角時の対応
export default function onInputChangeFunc(total_n,value,tempInputValue,isComposing,skipCompositionNext,setInputSets,team,setChangePoint,inputRefs,setFocusIndex){

// ①日本語入力変換時②日本語入力終了時③半角全角どれでも必要な処理
// 入力値の一時保存
    tempInputValue.current[total_n]=value;

// ①の時は以下をスキップ
    if (isComposing.current) {
      return; 
    }

// ②の時は状態は①ではないが、state系列の変更はonInputCompositionChangeで同様の処理を行うためスキップ
    if(skipCompositionNext){
        skipCompositionNext.current=false;
        return;
    }
    
  // 回答フォームと入力カーソルの変化
  inputsStateChange(setInputSets,total_n,team,tempInputValue,setChangePoint,inputRefs,setFocusIndex);

};

