import React from "react";
import { useMemo } from "react";
import { useForm } from "@inertiajs/react";
import OptionTextSetting from "@/CssSettings/OptionTextSetting";
import LastDayOnMonthSetting from "@/Utils/Config/LastDayONMonthSetting";
import SetErrorDisplayCSS from "@/CssSettings/SetErrorDisplayCSS";

export default function useDataUpdateDateSetterDefinitions(changeTheme){
 // 現在日時
   const daySets=new Date();

   // フォームのセット
   const {post,data,setData,errors,setError,processing}=useForm({
     "changeTheme":changeTheme,
     "year":"no_choice",
     "month":"no_choice",
     "day":"no_choice"
   })

 //月の最後の日
 const [monthLastDay,setMonthLastDay]=React.useState(31);

   // 年の変更
  const onYearChange=((e)=>{
   const newSelectedYear=e.target.value;
   setData(prevState=>({...prevState,"year":e.target.value}))
    // 月の最終日のセット
   LastDayOnMonthSetting(data.month,newSelectedYear,setMonthLastDay);
  });

   // 月の変更
  const onMonthChange=((e)=>{
   const newSelectedMonth=e.target.value;
   setData(prevState=>({...prevState,"month":newSelectedMonth}))
   // 月の最終日のセット
   LastDayOnMonthSetting(newSelectedMonth,data.year,setMonthLastDay);
  });

  // 日付の変更
  const onDayChange=(e)=>{
   setData(prevState=>({...prevState,"day":e.target.value}))
  }

  //  長さが変わった時にwidthをセット
   const [width,setWidth]=React.useState(window.innerWidth ?? "");
   React.useEffect(()=>{
     const settingWidthFunciton=()=>{
         setWidth(window.innerWidth);
     }
       window.addEventListener("resize",settingWidthFunciton)
       return(window.removeEventListener("resize",settingWidthFunciton))
   },[window.innerWidth])


 // widthが変化した時にUIの変化
   const selectOptionHiddenStr=useMemo(()=>{
     return OptionTextSetting({string1:"選択してください",string2:"選択肢",basePoint1:600});
   },[width])

 const [errorDisplay,setErrorDisplay]=React.useState("hidden");
 SetErrorDisplayCSS(errors,setErrorDisplay);

 //   決定ボタンが押されたとき
   const onDataChangeClick=(e)=>{
     e.preventDefault();

     if(Object.values(data).some((d)=>d==="no_choice")){
       alert("選択されていない項目があります")
       return;
     }

     if(!processing){
         post("data_update_date_setting")
     }
   }

   return[ daySets,post,data,setData,errors,setError,processing,monthLastDay,setMonthLastDay,onYearChange,onMonthChange,onDayChange,selectOptionHiddenStr,errorDisplay,onDataChangeClick];
}
