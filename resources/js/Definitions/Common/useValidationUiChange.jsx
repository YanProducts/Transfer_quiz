import React from "react";

// バリデーションエラーの表示と、それが生じた最初の場所へのUI遷移
export default function useValidationUiChange({form,errorTdClass,setErrorTdClass,setIsValidate,isValidate,isMove}){
  React.useEffect(()=>{

    // エラーがあるときの表示
   if (Object.keys(form.errors).length > 0) {

    //  forms.errorsがある=必ずform.errorsのある条件下=classが最新取得
    setErrorTdClass(document.getElementsByClassName("errorTdClass"));

      // エラーCSS表示
      setIsValidate(true);

      // 3秒後にエラー表示をなくして、2回連続別の部位でのエラー操作に備えてエラーのDomを次回表示に備えて消す
      const timerId = setTimeout(() => {          
          // 見えなくする
          setIsValidate(false);
          // formのerror自体の削除
          form.clearErrors();
      }, 3000);
    
      return () => clearTimeout(timerId);
    }
  },[form.errors]);


  // エラーの場所まで移動
  React.useEffect(()=>{
     //  moveされるか否かで取得を変更
     if(!isMove){
      return;
     }

     // エラーが表示されたとき、エラー表示にy軸を移動
     if(!isValidate){
      return;
     }

 
     if(errorTdClass.length>0){
        // エラー表示のy座標を取得し、そこに移動
        window.scrollTo({
          top:errorTdClass[0].getBoundingClientRect().top-150,
          behavior: "smooth"
        })
     }     
  },[isValidate,errorTdClass]);
}