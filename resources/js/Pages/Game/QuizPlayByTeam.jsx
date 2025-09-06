import Layout from "@/Layouts/Layout"
import usePlayTeamDefinitions from "@/Definitions/PlayTeam/usePlayTeamDefinitions";
import { AfterAnswerComponent } from "@/CustomComponents/Game/ByTeam/AfterAnswerComponent";
import AllTeamsTable from "@/CustomComponents/Game/ByTeam/AllTeamsTable";
import useDefaultActions from "@/Actions/PlayTeam/useDefaultActions";
import onAnswerBtnClick from "@/Actions/PlayTeam/OnAnswerBtnClick";

export default function QuizPlayByTeam({gameId,uniqueTokenBase,nameType,cate,teams,teamsAndBoxes,season,from_date,to_date}){

  // 定義(フックと定数)
  const {isFirst,setIsFirst,isAfter,uniqueToken,setUniqueToken,fetchReturn,setFetchReturn,error,setError,nowAnalyzing,setNowAnalyzing,setIsAfter,isRightState,setIsRightState,rightCountForUI,setRightCountForUI,inputSets,setInputSets,finishTeam,setFinishTeam,nowAlreadyPlayers,setNowAlreadyPlayers,openedInput,setOpenedInput,inputRefs,moveResult,setMoveResult,get,post}=usePlayTeamDefinitions(uniqueTokenBase,teamsAndBoxes,nameType,cate,gameId);

  // Effect系列
  useDefaultActions(isFirst,setIsFirst,fetchReturn,setUniqueToken,setIsRightState,setNowAlreadyPlayers,setError,isRightState,isAfter,setIsAfter,setRightCountForUI,rightCountForUI,finishTeam,setFinishTeam,teams,teamsAndBoxes,setOpenedInput,setNowAnalyzing,setInputSets,moveResult,setMoveResult,error,post);

  // 回答がsubmitされたとき
  const handleAnswerBtnClick=()=>{onAnswerBtnClick(isAfter,nowAnalyzing,setNowAnalyzing,inputSets,nameType,cate,uniqueToken,gameId,get,setFetchReturn)}


  return(
    <Layout pageName="playRandom" title="チームごとに回答">
      {/* タイトル〜回答ボタン部分 */}
           <h1 className="base_h base_h1 base_backColor mb-1">Jリーグ移籍市場：整理クイズ！<br/>-{season}-</h1>   
            <p className="base_backColor base_frame text-center text-lg font-bold mb-6">カテゴリー:{cate}</p>
          <div>
            <h3 className="base_h py-1 mb-0 text-lg">チームごとの新加入選手の{name}を記入してください</h3>
            <p className='base_backColor base_frame mt-0 text-sm mb-4 pb-1 text-center font-bold'>{`Jデータサイト ${from_date}~${to_date}変化分`}</p>
          </div>
                    {/* 正否表示 */}
            {/* クリア時のページ遷移含む */}
            <AfterAnswerComponent
                isAfter={isAfter}
                isRightState={isRightState}
                rightCountForUI={rightCountForUI}
                nowAlreadyPlayers={nowAlreadyPlayers}
                inputSets={inputSets}
                inputRefs={inputRefs}
            />
          <div className='text-center base_frame mb-3'>
            <button
            className={`base_btn inline-block ml-1 font-bold ${(nowAnalyzing || isAfter) ? 'opacity-70 pointer-events-none hidden' : 'opacity-100 pointer-events-auto block'}`}  onClick={handleAnswerBtnClick}>回答してみる</button>
            <div className={`base_btn pointer-events-none inline-block ml-1 font-bold ${nowAnalyzing ? 'block' : 'hidden'}`}>解析中</div>
       </div>

    {/* 回答部分の表示(この部分のみ使用する定義は内部で記載) */}
        <div className="base_frame max-w-[95vw] base_backColor overflow-visible py-2">
            <AllTeamsTable
            // LiOrInptuで必要(必然的に内部渡し必須)
              openedInput={openedInput}
              nowAnalyzing={nowAnalyzing}
              isAfter={isAfter}
              inputRefs={inputRefs} 
              inputSets={inputSets}
              setInputSets={setInputSets}
              teams={teams}
              teamsAndBoxes={teamsAndBoxes}
            />
        </div>

      </Layout>
    )
}
