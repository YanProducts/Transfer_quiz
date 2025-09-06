import gameplay_fetch from "@/API/FetchAPI/GamePlayFetch";

// 回答ボタンを押した際の変化
// フックがないのでファイルとfunctionにuseをつけない

export default function onAnswerBtnClick(isAfter,nowAnalyzing,setNowAnalyzing,inputSets,nameType,cate,uniqueToken,gameId,get,setFetchReturn){
          // 回答後もしくは解析中の段階なら送信できない
          if(isAfter || nowAnalyzing){
            return;
        }

        // inputSetsが空ならば戻る
        if(Object.keys(inputSets).length==0){
            alert("回答が記入されていません");
            return;
        }
    
        setNowAnalyzing(true);

        const fetch_params={
            // inputSetsはtotal_nごとに「team:...player:...」で記載(全選手版とはtotal_nが規則的ではないので、仕組みを分けている)
            inputs:inputSets,
            name_type: nameType,
            quiz_type: "byTeam",
            // 複数だが形式を揃えるため、言葉の上では単数
            // team:JSON.stringify(comvertedTeams),            
            // 必要ない？
            team:"",
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