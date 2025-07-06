import React from "react";
import { useForm } from "@inertiajs/react";
import SetErrorDisplayCSS from "@/CssSettings/SetErrorDisplayCSS";

export default function PlayerDataChangeDefinitions(ChangeThemeOptions,SeasonChangeOptions){


  // エラー表示
  const [errorDisplay,setErrorDisplay]=React.useState("hidden")

    // タスクが終了しているかの確認(投稿せずブラウザで返す)
    const [checkAllTaskes,setCheckAllTaskes]=React.useState({
      "playersFileOK":false,
      "irregularNameOK":false,
      "teamFileOK":false,
      "specialCaseOK":false
  })

  //   パスワードの連番
  const [passnumber,setPassnumber]=React.useState("④");

  // フォームのセット
  const {post,data,setData,errors,setError,processing}=useForm({
    "changeTheme":"no_choice",// 手元登録データのみかinoutデータか
    "updateSeason":"no_choice", //どのシーズンを更新するか(inputがtransferDataの時のみ)
    "passWord":""
  })

  // エラーのCSSのセット
  SetErrorDisplayCSS(errors,setErrorDisplay);

  // 登録する内容が変更次第、シーズンをnot_usedにしてUIを表示しない
  React.useEffect(()=>{
      if(data.changeTheme==="onlyPlayer"){
          setPassnumber("④")
          setData(prevState=>({...prevState,"updateSeason":"no_choice"}))
        }else if(data.changeTheme==="transferData"){
            setPassnumber("⑦")
      }
  },[data.changeTheme])




 React.useEffect(()=>{
     setData(prev=>({
         ...prev,
         "changeTheme":"aaa"
     }));
 },[])







  // 決定ボタン
  const onDataChangeClick=(e)=>{
      e.preventDefault();

      // 全ての確認タスクを終えているか
      if((data.changeTheme!=="transferData" && !checkAllTaskes.playersFileOK && !checkAllTaskes.irregularNameOK) ||
        (data.changeTheme==="transferData" && Object.values(checkAllTaskes).some(v=>!v))){
          alert("全てのタスクを確認し、チェックしてください")
          return;
      }


      // dataがセットされたか？
      if(data.changeTheme==="no_choice" || (data.changeTheme==="transferData" && data.updateSeason==="no_choice")){
          alert("選択できていない項目があります")
          return;
      }

      const confirmSentence="変更処理…" +   ChangeThemeOptions[data.changeTheme] + (data.changeTheme==="transferData" ? "\n変更シーズン…" + SeasonChangeOptions[data.updateSeason] : "") + "\n上記でよろしいですか？";

      if(!confirm(confirmSentence)){
          return;
      }

    if(!processing){
      post(`players_data_change`);
    }
  }

  return [checkAllTaskes,setCheckAllTaskes,passnumber,data,setData,errors,setError,processing,onDataChangeClick,errorDisplay,setErrorDisplay];
}
