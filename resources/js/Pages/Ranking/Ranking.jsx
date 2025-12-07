import React from "react";
import Layout from "@/Layouts/Layout";
import { RankTableComponents } from "@/CustomComponents/Ranking/RankTableComponents";

// 回答された選手ランキング
export default function Ranking({season,engSeason,fullResults,partResults,viewAll}){

  return(
    <Layout pageName="Ranking" title="回答された選手ランキング" rankWhich={viewAll}>

    {/* 空白 */}
      <p>　</p>

      <h1 className='base_h base_h1 py-2 mb-0 text-2xl'>{season}<br className="inline sm:hidden" /> 回答された選手ランキング</h1>

      {viewAll!=="answer_part" ? 
      <RankTableComponents jpn="フルネームで回答" which="answer_full" results={fullResults} engSeason={engSeason} viewAll={viewAll}/> :null }

      {viewAll!=="answer_full" ? 
      <RankTableComponents jpn="名前の一部で回答" which="answer_part" results={partResults} engSeason={engSeason} viewAll={viewAll}/> : null}

    </Layout>
  );
}