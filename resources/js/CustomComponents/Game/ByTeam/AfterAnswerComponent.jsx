import React from "react";
import NowAlreadyPlayersLists from "./NowAlreadyPlayersLists";

export const AfterAnswerComponent=({isAfter,isRightState,rightCountForUI,nowAlreadyPlayers,inputSets,inputRefs})=>{

//   回答後、inputSetsが空になった時に、inputRefも空にする
  React.useEffect(()=>{
    // 回答後でなければreturn
    if(!isAfter){
        return;
    }
    // inputSetsの長さがあればreturn
    if(Object.keys(inputSets).length>0){
        return;
    }
    (Object.values(inputRefs.current)).forEach((eachRef)=>{
        // 既に開いている番号はinputじゃないのでvalueはない
        if(eachRef?.value){
            eachRef.value="";
        }
    })

  },[inputSets])


  // 回答前なら何もしない
  // rightCountがprepareから数値に変わっていない状態なら何もしない
  if(!isAfter || rightCountForUI==="prepare"){
      return null;
  }


  // 回答後(buttonのpointerEventはInput側で操作)
  if(isNaN(Number(isRightState)) && isRightState!=="already" ){
          return  <div className='already_div'>エラー</div>
  }else{
      if(isRightState==0){
       return(
          <>
           <div className='wrong_div'>X</div>
              {NowAlreadyPlayersLists(nowAlreadyPlayers)}
          </>
       )
      }else{
      return(
          <>
              <div className="correct_div w-36">{rightCountForUI}人正解！</div>
              {NowAlreadyPlayersLists(nowAlreadyPlayers)}
          </>
      )
  }
  }

}
