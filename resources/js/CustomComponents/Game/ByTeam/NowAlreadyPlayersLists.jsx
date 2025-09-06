// 現在の回答において、すでに回答済みだった選手たち
// それぞれの回答済選手の要素
const AllNowAlreadyPlayers=({nowAlreadyPlayers})=>{

      return(
          Object.entries(nowAlreadyPlayers).map((n,index)=>{
              return(<li key={index} className="text-center font-bold">{`(${n[0]}...${n[1].join("、")})`}</li>)
          })
      )
  }


  // 回答した選手が回答済だった場合
  export default function NowAlreadyPlayersLists(nowAlreadyPlayers){
      // 回答済なしの場合は何も返さない
      if(nowAlreadyPlayers.length==0){
          return null;
      }
      return(
          <div className="bg-gray-200 border-black border-4 base_frame w-2/5 min-w-[300px]">
              <p className="my-1 text-center font-bold">以下の選手たちは既に回答済みです</p>
              <ul>
                  <AllNowAlreadyPlayers nowAlreadyPlayers={nowAlreadyPlayers}/>
              </ul>
          </div>
      )
  }