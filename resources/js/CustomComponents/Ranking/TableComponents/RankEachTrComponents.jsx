import React from "react";
import { Link } from "@inertiajs/react";
import {useForm} from "@inertiajs/react";
import useValidationUiChange from "@/Definitions/Common/useValidationUiChange";
import useRankingTrDefinitions  from "@/Definitions/Ranking/useRankingTrDefinitions";

export const RankEachTrComponents=({which,results,engSeason,viewAll})=>{ 

  // 順位計算のフラグ(順に順位、前の順位の正解数、30位の人と同じ回答数の人の数、30人以上の人数がいるかどうか)
  let rank="";let beforeValue="";let sameRank=0; let isTotalOver30=false;

  // 定義セット
  const [form,isValidate,setIsValidate,errorTdClass,setErrorTdClass]= useRankingTrDefinitions(which,engSeason);

  
  // 30位以下の取得が押されたときの変化
  const onViewUnder30RankClick=()=>
  { 
    form.post("/showRanking")
  };
  
  // エラー変化
  useValidationUiChange({form,errorTdClass,setErrorTdClass,setIsValidate,isValidate,isMove:true})

  return(
    <>
    {results.map((result,totalNumber)=>{
      // 順位が前と同じかどうか
      if(result[which]!==beforeValue){
        rank=totalNumber+1;
        beforeValue=result[which];
      }    
      // もし全員表示じゃない時は以下
      if(!viewAll){
        // 30人以上は何も返さない(nullはreactの配列には入るが描画されない)
        if(totalNumber>30){
          //  30人以上いるかのフラグを反転
           if(!isTotalOver30){isTotalOver30=true;}
          // beforeValueは30位時点でのvalueに統一される(更新されない)
            if(result[which]===beforeValue){
              sameRank+=1;
            }
          return null;
        }
      }
      return(
        <tr key={`${totalNumber}-${which}`} className="base_tableInner">
          <td className="base_tableInner">{rank}</td>
          <td className="base_tableInner">{result.full}</td>
          <td className="base_tableInner">{result[which]}</td>
      </tr>
      )
    })}
    {sameRank!==0 ? <tr className="base_tableInner bg-green-200"><td colSpan="3">30位ほか{sameRank}人</td></tr> : null}
    {isTotalOver30 ? <tr className="base_tableInner bg-sky-200"><td colSpan="3">30位以下は
      <span className="cursor-pointer" onClick={onViewUnder30RankClick}>こちら</span>
      </td></tr> : null}
      {Object.keys(form.errors).length >0 ? (import.meta.env.VITE_APP_ENV==="local" ? Object.values(form.errors).map((error,i)=><tr key={`error" ${i}`} className={`${isValidate ? "table-row" : "hidden"} bg-pink-50 text-red-600 font-bold text-center errorTdClass`}><td  colSpan="3">{error}</td></tr>) : <tr className="bg-pink-50 text-red-600 font-bold"><td colSpan="3">予期せぬエラーです</td></tr>) :null}
    </>

  )};
