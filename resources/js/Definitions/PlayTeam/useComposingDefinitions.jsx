import React from "react";
export default function ComposingDefinitisons(){
    // 変換系統
    // 日本語入力変化中
    const isComposing=React.useRef(false)
    // 日本語入力変換中の保持
    const tempInputValue=React.useRef({});
    // 何番目のinputをfocusさせるか
    const [focusIndex,setFocusIndex]=React.useState("");
    // 変化させたカーソルの位置
    const [changePoint,setChangePoint]=React.useState("");
    // 自動変換確定対策に、次の入力はstateの変更をスキップ
    const skipCompositionNext=React.useRef(false);
    // (上記に伴う副作用)
    const ignoreInputFocus=React.useRef(false);

    return[
      isComposing,tempInputValue,focusIndex,setFocusIndex,changePoint,setChangePoint,skipCompositionNext,ignoreInputFocus
    ]
}