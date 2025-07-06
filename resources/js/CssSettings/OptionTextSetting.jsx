import { useMemo } from "react";

// 指定された場合のoptionの文字列の一部をhiddenにする
// 文字列が返る
export default function OptionTextSetting({string1,string2,string3="",basePoint1,basePoint2=""}){



  // SSRでwindowが取得できない時
  if (typeof window === "undefined"){
    if(string3){
      return string2;
    }else{
      return string1;
    }
  }

  const width=window.innerWidth;
    // 横幅basePoint1より長い時
    if(width>basePoint1){
      return string1;
    }
    // basePoint2とstring3が指定され、横幅がbasePoint2より長い時
    if(string3 && basePoint2){
      if(width>basePoint2){
        return string2;
      }else{
        return string3;
      }
    }else{
      return string2;
    }

}