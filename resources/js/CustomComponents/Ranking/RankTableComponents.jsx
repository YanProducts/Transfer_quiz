import { RankEachTrComponents } from "./TableComponents/RankEachTrComponents"

// ランキングのテーブル要素
export const RankTableComponents=({jpn,engSeason,which,results, viewAll})=>{
  return(
    <table className="base_table">
    <thead>          
      <tr className="base_tableInner bg-orange-100"><th colSpan="3">{jpn}</th></tr>
      <tr className="base_tableInner"><th className="base_tableInner">順位</th><th className="base_tableInner">名前</th><th className="base_tableInner">回答数</th></tr>
    </thead>
    <tbody>
       <RankEachTrComponents which={which} results={results} engSeason={engSeason} viewAll={viewAll}/>
    </tbody>
  </table>
  )
}