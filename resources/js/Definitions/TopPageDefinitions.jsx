import React from 'react';
import {useForm} from '@inertiajs/react';
import SetErrorDisplayCSS from '@/CssSettings/SetErrorDisplayCSS';

export default function TopPageDefinitions(){
    // フォームのセット
    const {post,data,setData,errors,setError,processing}=useForm({
      "cate":"",
      "quiz":"",
      "name":"",
    })

    // errorsによって変化
    const [errorDisplay,setErrorDisplay]=React.useState("hidden");

    // エラーのCSSのセット
    SetErrorDisplayCSS(errors,setErrorDisplay);

    // クイズ方式の決定ボタン
    const onDecideBtnClick=(e)=>{
      e.preventDefault();

      // クイズ方式決定ページへ
      if(!processing){
          post(`quiz_pattern_decide`)
      }
    }

    return[post,data,setData,errors,setError,processing,errorDisplay,onDecideBtnClick];
}
