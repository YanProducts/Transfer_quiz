import React from "react";

// バリデーションエラー表示のCSS
export default function SetErrorDisplayCSS(errors,setErrorDisplay){
  React.useEffect(()=>{

    // 個別のエラーがなければ、そもそもerrors?.aaaで分岐して開かない形にしている
    // 開いたものに関しては、一律で3秒消え

    // エラーがなければ戻る
    if(!errors || Object.keys(errors).length===0){
      return;
      }
      
    // エラーがある時
      setErrorDisplay("block");
      const displayChangeFunc=setTimeout(()=>{setErrorDisplay("hidden")},3000);

    return ()=>{
      setErrorDisplay("hidden");
      clearTimeout(displayChangeFunc)
    }
  },[errors])
}
