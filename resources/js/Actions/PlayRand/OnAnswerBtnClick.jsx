import gameplay_fetch from "@/API/FetchAPI/GamePlayFetch";

export default function onAnswerBtnClick(isAfter,nowAnalyzing,inputRef,answerTeamRef,setNowAnalyzing,nameType,cate,uniqueToken,gameId,setFetchReturn,get){

         // 回答後もしくは解析中の段階なら送信できない
         if(isAfter || nowAnalyzing){
            return;
        }

        // 入力なしなら戻る
        if(inputRef.current.value===""){
            alert("選手が入力されていません");
            return;
        }

        if(answerTeamRef.current.value==="no_choice"){
            alert("チームが入力されていません");
            return;
        }

        setNowAnalyzing(true);

        const fetch_params={
            inputs: inputRef.current.value,
            name_type: nameType,
            quiz_type: "random",
            team:answerTeamRef.current.value,
            cate: cate,
            uniqueToken:uniqueToken,
            gameId:gameId,
            get:get
        };

        // 投稿
        gameplay_fetch(fetch_params).then((result)=>{

            // 投稿で返ってきた変数の格納
            setFetchReturn(result);
        })
}
