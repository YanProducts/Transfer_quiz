// input周りの変化

import ComposingDefinitisons from "@/Definitions/PlayTeam/useComposingDefinitions";
import React from "react";
export function useOnInputChange(team,setInputSets,inputRefs,inputSets,nowAnalyzing){

  // 定義
  const [isComposing,tempInputValue,focusIndex,setFocusIndex,changePoint,setChangePoint,skipCompositionNext,ignoreInputFocus]=ComposingDefinitisons();


  // 日本語入力開始
  const onInputCompositionStart = () => {
    isComposing.current = true;
  };

  // 日本語入力終了
  const onInputCompositionEnd = (total_n, e) => {

    // 自動変換確定対策に、次の入力はstateの変更をスキップ
    skipCompositionNext.current=true;

    setInputSets((prevState) => ({
        ...prevState,
        [total_n]: {
          "team":team,
          "player":tempInputValue.current[total_n]
        }
          // 確定された値で更新
      }));
    
    setChangePoint(inputRefs.current[total_n].selectionStart || "")
    setFocusIndex(total_n);

    isComposing.current = false;
  };

  // 各inputが変更された時
  const onInputChange = (total_n,value) => {

    // 半角全角に関わらずどちらにせよ「一時保存」変更はする(blurする際の処理とも同期)
    tempInputValue.current[total_n]=value;

    if (isComposing.current) {
    //日本語入力中のrefを変換
      return; // 日本語変換中は何もしない
    }

    // 変換が終了していればskipをfalseにした上でこの回はスキップ(全角の時は変換にいく。半角入力時)
    if(skipCompositionNext){
        skipCompositionNext.current=false;
        return;
    }

    setChangePoint(inputRefs.current[total_n].selectionStart || "")
    setInputSets((prevState) => ({
      ...prevState,
      [total_n]:{
        "team":team,
        "player":value
      }
    }));

    setFocusIndex(total_n);
  };

//   離れる際に値の確定
  const onInputBlur=(total_n)=>{

    // 再度同じ位置のフォーカスを避ける
    ignoreInputFocus.current=true;

    // Tabなどの自然フォーカス移動を邪魔しないよう、少し遅らせてstate更新(tabの方を先に更新)
    setTimeout(() => {
        setInputSets((prevState) => ({
        ...prevState,
        [total_n]:{
          "team":team,
          "player":tempInputValue.current[total_n]
        }}));
    }, 0);
  }

  const onInputFocus=(total_n)=>{
    setFocusIndex(total_n);
  }

  // inputが変更した後、変更したinputに引き続きfocusする
    React.useEffect(()=>{

      // 離れる際に同じ位置を再度focusするのを避ける
        if(ignoreInputFocus.current){
            ignoreInputFocus.current=false;
            return;
        }

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