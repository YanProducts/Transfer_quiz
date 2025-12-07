// 全体のnew_comerの選手データの実際部分
export default function ShowAllDataComponents({AllPlayersDataSets}){
  return(
    <>
    {Object.keys(AllPlayersDataSets).map(cate=>
    <div key={`${cate}div`} className="block mb-10">
      <h3 key={`${cate}h3`} className="font-bold text-xl mb-5 base_backColor">{cate}</h3>               
      {Object.keys(AllPlayersDataSets[cate]).map((flexSet)=>
      <div key={flexSet} className="flex justify-center mb-5">
      {
      Object.keys(AllPlayersDataSets[cate][flexSet]).map(team=>
      <div key={`${team}div`} className="text-center mx-2 base_border w-1/6  font-bold needSettingBackGroundColor" data-red={AllPlayersDataSets[cate][flexSet][team].red} data-green={AllPlayersDataSets[cate][flexSet][team].green} data-blue={AllPlayersDataSets[cate][flexSet][team].blue} >
        {/* チーム */}
        <h3 key={`${team}h3`} className="text-lg font-bold border-b-2 needSettingBorderColor">{AllPlayersDataSets[cate][flexSet][team].jpn_name}（{AllPlayersDataSets[cate][flexSet][team].players.length}人）</h3>
          {AllPlayersDataSets[cate][flexSet][team].players.map(player=>
          // 選手
          <div key={`${player}${team}`}>{player}</div>
          )}
        </div>
        )}
       </div>
      )}
      </div>
    )}
  </>
  )
}