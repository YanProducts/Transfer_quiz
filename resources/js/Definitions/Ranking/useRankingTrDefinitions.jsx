import React from "react";
import { useForm } from "@inertiajs/react";

// tr要素の定義セット
export default function useRankingTrDefinitions(which,engSeason){

  // useFormに代入(Linkだとバリデーションが厄介なためuseFormを使用)
  const form=useForm({season:engSeason,viewAll:which});
  
  // バリデーションが生じるか
  const [isValidate,setIsValidate]=React.useState(false);
  
  // エラークラスの取得と作成(HTMLコレクションは変化するものの、順序によっては取得できない場合を考慮)
  const [errorTdClass, setErrorTdClass] = React.useState([]);

  return [form,isValidate,setIsValidate,errorTdClass,setErrorTdClass];
}