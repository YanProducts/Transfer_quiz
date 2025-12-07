import React from 'react';
import {useForm} from '@inertiajs/react';
import SetErrorDisplayCSS from '@/CssSettings/SetErrorDisplayCSS';
import {usePage} from '@inertiajs/react';

export default function useTopPageDefinitions(){

    // 回答された選手のストレージの削除
    localStorage.removeItem("TransferQuizRandomAlreadyAnswered");
    localStorage.removeItem("TransferQuizByTeamAlreadyAnswered");
    // フォームのセット
    const {post,data,setData,errors,setError,processing}=useForm({
      "cate":"",
      "quiz":"",
      "name":"",
    })

    // リンクからGet遷移でののエラー
    const { errors: pageErrors } = usePage().props 

    // errorsによって変化
    const [errorDisplay,setErrorDisplay]=React.useState("hidden");

    // エラーのCSSのセット
    SetErrorDisplayCSS(errors,setErrorDisplay);

    // クイズ方式の決定ボタン
    const onDecideBtnClick=(e)=>{
      e.preventDefault();

      // クイズ方式決定ページへ
      if(!processing){
        // 既にプレー始めてるフラグのストレージを削除
          localStorage.removeItem("TransferQuizAlreadyPlayed");
          post(`quiz_pattern_decide`)
      }
    }

    return[setData,pageErrors,errors,setError,processing,errorDisplay,onDecideBtnClick];
}
