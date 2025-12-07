import { AfterAnswerComponent } from "@/CustomComponents/Game/Random/AfterAnswerComponent";
import { InputComponent } from "@/CustomComponents/Game/Random/InputComponent";
import Layout from "@/Layouts/Layout";
import ResultView from "@/CustomComponents/Game/Random/ResultsView";
import onAnswerBtnClick from "@/Actions/PlayRand/OnAnswerBtnClick";
import usePlayRandDefinitions from "@/Definitions/PlayRand/usePlayRandDefinitions";

export default function QuizPlayRandom({gameId,uniqueTokenBase,nameType,cate,teams,answerBoxCounts,season,from_date,to_date}){

    const {isAfter,isFirst,inputRef,answerTeamRef,uniqueToken,setFetchReturn,error,nowAnalyzing,setNowAnalyzing,setIsAfter,isCorrectState,setIsCorrectState,get}=usePlayRandDefinitions(uniqueTokenBase);

    // 回答がsubmitされたとき
    const handleAnswerBtnClick=(e)=>{
        e.preventDefault();

        onAnswerBtnClick(isAfter,nowAnalyzing,inputRef,answerTeamRef,setNowAnalyzing,nameType,cate,uniqueToken,gameId,setFetchReturn,get);
    }

    return (
      <Layout pageName="playRandom" title="ランダムに回答">

        <p>　</p>

          {/* タイトルなど */}
          <h1 className="base_h base_h1 base_backColor mb-1">Jリーグ移籍市場<span className="hidden sm:inline">：</span><br className="inline sm:hidden"/>整理クイズ！<br/>-{season}-</h1>   
          
            <p className="base_backColor base_frame text-center text-lg font-bold mb-6">カテゴリー:{cate}</p>

            <h3 className="base_h py-1 mb-0 text-lg">新加入選手の{nameType}を記入してください</h3>

            <p className='base_backColor base_frame mt-0 text-sm mb-4 pb-1 text-center font-bold'>{`Jデータサイト ${from_date}~${to_date}変化分`}</p>


            {/* 正否表示 */}
            {/* クリア時のページ遷移含む */}
            <AfterAnswerComponent
                isAfter={isAfter}
                setIsAfter={setIsAfter}
                setNowAnalyzing={setNowAnalyzing}
                isCorrectState={isCorrectState}
                setIsCorrectState={setIsCorrectState}
                // これまでの正解数
                answeredCounts={ JSON.parse(localStorage.getItem("TransferQuizRandomAlreadyAnswered") || "[]").length}
                // 必要な正解数
                answerBoxCounts={answerBoxCounts}
                // 名前形式(クリア時に表示)
                nameType={nameType}
                // カテゴリー(クリア時に表示)
                cate={cate}
                // クリア用にゲームIdも送る
                gameId={gameId}
            />

            {/* input周りのcomponent */}
            <InputComponent
                teams={teams}
                onAnswerBtnClick={handleAnswerBtnClick}
                inputRef={inputRef}
                answerTeamRef={answerTeamRef}
                nowAnalyzing={nowAnalyzing}
                isAfter={isAfter}
            />

            {/* reactで書き直す！！！ */}
            {error.validationError &&(<p className='base_error animate-whenerror'>{error.validationError}</p>)}

            <ResultView isAfter={isAfter} isFirst={isFirst}/>
            <div>　</div>


        </Layout>
    );
}
