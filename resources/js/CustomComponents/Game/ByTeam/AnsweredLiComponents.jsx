import LiOrInput from "./LiOrInput";
import { useOnInputChange } from "@/Actions/PlayTeam/useOnInputChange";

// その解答欄が空いているかどうかを判定する
export const AnsweredLiComponents=({total_n,team,blackOrWhite,boxes,openedInput,liHeight,nowAnalyzing,isAfter,inputRefs,inputSets,setInputSets})=>{

  // Input周りの入力時の動き
  const {onInputCompositionStart,onInputCompositionEnd,onInputChange,onInputBlur,onInputFocus}=useOnInputChange(team,setInputSets,inputRefs,inputSets,nowAnalyzing);

  const LiComponents=[]

  // チームごとの枠の数を取得
  for(let n=0;n<Number(boxes);n++){ 
    
    LiComponents.push(
      <div key={total_n}>
          {LiOrInput(total_n,blackOrWhite,openedInput,liHeight,nowAnalyzing,isAfter,inputRefs,inputSets,onInputChange,onInputCompositionStart,onInputCompositionEnd,onInputBlur,onInputFocus)}
      </div>
    )
  total_n++;
  }
  return LiComponents;
}