import React from "react";
import Checkbox from "@/Components/Checkbox";
import TextInput from "@/Components/TextInput";
import usePlayerDataChangeDefinitions from "@/Definitions/usePlayerDataChangeDefinitions";
import ChoiceSelectComponents from "@/CustomComponents/Config/ChoiceSelectComponents";
import CheckListsComponents from "@/CustomComponents/Config/CheckListsComponents";

export default function PlayerDataChange({ChangeThemeOptions,SeasonChangeOptions}){

  // 定義セット
    const [checkAllTaskes,setCheckAllTaskes,passnumber,data,setData,errors,setError,processing,onDataChangeClick,errorDisplay,setErrorDisplay]=usePlayerDataChangeDefinitions(ChangeThemeOptions,SeasonChangeOptions);

 return(
<>
   <p>　</p>
  <div className="base_frame">
    <h1 className="base_h base_h1 w-4/5 min-w-[400px]">シーズン変更確認</h1>
  </div>

  <form className="base_frame text-lg font-bold">

       <ChoiceSelectComponents what="changeTheme" obj={ChangeThemeOptions} phrase="①何を登録する？" setData={setData} errors={errors} errorDisplay={errorDisplay} />

       <CheckListsComponents data={data} what={"playersFileOK"} phrase={"②選手のリストは以下におきましたか？"} checkAllTaskes={checkAllTaskes} setCheckAllTaskes={setCheckAllTaskes}  />

       <CheckListsComponents data={data} what={"irregularNameOK"} phrase={"③例外の名前チェックを行いましたか？"} checkAllTaskes={checkAllTaskes} setCheckAllTaskes={setCheckAllTaskes}  />

       {/* InOutも更新する場合のみ=過去履歴に挿入 */}
       {data?.changeTheme==="transferData" ?
       <>
          <CheckListsComponents data={data} what={"teamFileOK"} phrase={"④カテ&チームデータの更新、降格チームのArchive登録の準備は完了？"} checkAllTaskes={checkAllTaskes} setCheckAllTaskes={setCheckAllTaskes}  />
          
          <CheckListsComponents data={data} what={"specialCaseOK"} phrase={"⑤昇格チームの新加入選手、同姓同名など特殊ケースは準備完了？"} checkAllTaskes={checkAllTaskes} setCheckAllTaskes={setCheckAllTaskes}  />

          <ChoiceSelectComponents what="updateSeason" obj={SeasonChangeOptions} phrase="⑥いつのデータを登録？" setData={setData} errors={errors} errorDisplay={errorDisplay} plusClassName={data.changeTheme==="onlyPlayer" ? "hidden" : "block"}/>
       </>:null}

      <div className="base_frame border-2 border-black rounded-md pt-5 pb-7 text-center mb-5 min-w-[400px]">
          <p className="mb-3">{passnumber}パスワードを入力してください</p>
          <TextInput type="password" value={data.passWord} className="mt-1 base_frame border-2" onChange={(e)=>{setData(prevState=>({...prevState,"passWord":e.target.value}))}}/>
      {/* パスワードエラー */}
        { errors?.passWord ? <div className={`base_error mt-3 base_frame ${errorDisplay}`}><p>{errors?.passWord}</p></div> : null}
      </div>


      {/* 共通エラー */}
        { errors?.common ? <div className={`base_error mt-3 base_frame ${errorDisplay}`}><p>{errors?.common}</p></div> : null}

      <div className="base_frame min-w-[400px]">
        <button className={`base_btn font-bold ${processing ? "pointer-events-none opacity-30" : "pointer-events-auto opacity-100"}`} onClick={onDataChangeClick}>決定！</button>
      </div>

    </form>
    <p>　</p>

</>
 )

}
