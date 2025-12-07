import Layout from "@/Layouts/Layout";
import React from "react";
import useSeasonChoiceDefinitions from "@/Definitions/Ranking/useSeasonChoiseDefinitions";
import SelectOptionComponents from "@/CustomComponents/Common/SelectOptionComponents";

// 過去の結果リストの年代
export default function ResultSeasonLists({seasonLists}){

  // 定義セット
  const [errors,errorDisplay,onChoiceSelectChange,onDecideButtonClick,processing]=useSeasonChoiceDefinitions();
  

  return(
    <Layout  pageName="RankSeasonLists" title="過去の回答された選手">
          {/* 空白 */}
          <p>　</p>

          <h1 className='base_h base_h1 py-2 mb-0 text-2xl'>過去の<br className="sm:hidden"/>回答された選手ランキング</h1>

          <div className="mt-10">
            <SelectOptionComponents
            what="season"
            obj={seasonLists} 
            onChoiceSelectChange={onChoiceSelectChange}
            errors={errors}
            errorDisplay={errorDisplay}
            className=""
            />
          </div>

          <div className="base_frame my-5">
            <button className={`base_btn ${processing ? "pointer-events-none opacity-70" :"pointer-events-auto opacity-100"} `} onClick={onDecideButtonClick} >             
              決定</button>
          </div>
    </Layout>
  )
}