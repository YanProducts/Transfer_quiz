import React from "react";
import { useForm } from "@inertiajs/react";

// 年代選択
export default function useSeasonChoiceDefinitions(){
  const {post,data,setData,errors,setError,processing}=useForm({
    "season":""
   })
  
  // リンクからGet遷移でののエラー
    // errorsによって変化
    const [errorDisplay,setErrorDisplay]=React.useState("hidden");

    // 年代設定の変化
    const onChoiceSelectChange=(e)=>{
      setData(prevState=>({...prevState,"season":e.target.value}))
    }

    // 決定ボタン
    const onDecideButtonClick=()=>{
      // 年代をセットしてランキングページへ
      post("/showRanking");
    }

    // エラーが生じた時
    React.useEffect(()=>{
      if(Object.keys(errors).length>0){
        if(errorDisplay==="hidden"){
          setErrorDisplay("block");
        }
        const timerId=setTimeout(()=>{setErrorDisplay("hidden")},3000);
        return ()=>clearTimeout(timerId);
      }
    },[errors,errorDisplay])


    return[errors,errorDisplay,onChoiceSelectChange,onDecideButtonClick,processing];

  }