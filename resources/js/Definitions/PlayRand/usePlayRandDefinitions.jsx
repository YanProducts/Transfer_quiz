import React from "react";
// import InformationBeforeTransition from "../Game/Part/InfomationBeforeTransition";
import { useForm } from "@inertiajs/react";
import useAlreadyPlayedInformationSetting from "@/Utils/Game/AutoPageTransition/useAlreadyPlayedInformationSetting";
import useBackToTopPageWhenPlayGame from "@/Utils/Game/AutoPageTransition/useBackToTopPage";
import visitErrorPage from "@/Utils/Error/ToErrorRoute";

// ランダム版の定義セット
export default function usePlayRandDefinitions(uniqueTokenBase){

    // 条件に合った際はトップページへ遷移(リロード、戻るで到達、エラー)
    useBackToTopPageWhenPlayGame();
    // リロードの際のページ遷移の案内と準備
    useAlreadyPlayedInformationSetting();

    // fetch後のオブジェクト格納
    const [fetchReturn,setFetchReturn]=React.useState({});

    // 最初のアクセスか否か
    const [isFirst,setIsFirst]=React.useState(true);

    // エラー有無
    const [error,setError]=React.useState({});

    // ボタン操作の可否
    const [nowAnalyzing,setNowAnalyzing]=React.useState(false);

    // 回答後か否か
    const [isAfter,setIsAfter]=React.useState(false);

    // ２重投稿防止トークン
    const [uniqueToken,setUniqueToken]=React.useState(uniqueTokenBase);

    // 正解か不正解か未回答か回答済か(jsonと区別するためにStateを変数名で使用)
    const [isCorrectState,setIsCorrectState]=React.useState("yet");

    // inputとselectの要素取得
    // fetch時点で最新のものを取得するため、valueもここから取得する
    const inputRef=React.useRef(null);
    const answerTeamRef=React.useRef(null);

    // 遷移対策
    const {get}=useForm();

    // 最初のアクセスのみ、既に回答されたlocalStorageを空にする
    React.useEffect(()=>{
        if(!isFirst){
            return;
        }
        localStorage.removeItem("TransferQuizRandomAlreadyAnswered");
        setIsFirst(false);
    },[isFirst])


    // 次に、fetchDoneによって変化が生じたfetchReturnの値によって変化させる分
    React.useEffect(()=>{

        // fetchReturn取得前は何もしない
        if(Object.keys(fetchReturn).length===0){
            return;
        }

        // UI初期化(既に送信済みなのでinputは空にできる)
        inputRef.current.value="";
        // 入力はできる状態にしておく。送信はisAfterがtrueなら不可
        inputRef.current.focus();

        if(fetchReturn?.new_token){
            // 新たなクイズtokenの設定
            // 一時的な場合や二重投稿してしまった時のことも考慮し、新たなゲームトークンは返す(別のゲームが始まった場合を除く)
            setUniqueToken(fetchReturn.new_token);
        }

        if(fetchReturn.success){
            // 正否の入力
            setIsCorrectState(fetchReturn.is_correct);
        }else{


            console.log(fetchReturn)


            // 失敗の場合
            // 新しいゲームスタートしている場合はすでに遷移
            // 二重投稿の場合は何もしない
            if(fetchReturn?.errorMessage && (fetchReturn.errorMessage
                ==="duplicated" || fetchReturn.errorMessage==="newGameStarted")){
                return;
            }

            // それ以外のエラーの場合
             visitErrorPage({"message":fetchReturn?.errorMessage || ""});            
        }
    },[fetchReturn])


    // その後、isCorrectStateに変化が生じたら、回答リストに挿入
    React.useEffect(()=>{
            // 正解の場合：選手リストに追加
            if(isCorrectState==="correct"){
                const alreadyAnswered=JSON.parse(localStorage.getItem("TransferQuizRandomAlreadyAnswered") || null);
                let insertAnswered=fetchReturn.playerLists.map((eachPlayer,index)=>({
                        "number":alreadyAnswered ? Object.keys(alreadyAnswered).length + index +1 : 1,
                        "player":eachPlayer.player,
                        "team":eachPlayer.team,
                        "red":eachPlayer.red,
                        "green":eachPlayer.green,
                        "blue":eachPlayer.blue,
                }));

                // 配列化(オブジェクトだとキーで書き換わるため)
                const newAlreadyAnswerd=alreadyAnswered ? [...Object.values(alreadyAnswered),...insertAnswered] : [...insertAnswered];

                // ストレージに挿入
                localStorage.setItem("TransferQuizRandomAlreadyAnswered",JSON.stringify(newAlreadyAnswerd));
            }

            // 回答後画面へのフラグ(isAfter)反映
            if(isCorrectState!=="yet"){
                setIsAfter(true);
            }
     
    },[isCorrectState])


    return{isAfter,isFirst,inputRef,answerTeamRef,uniqueToken,setFetchReturn,error,nowAnalyzing,setNowAnalyzing,setIsAfter,isCorrectState,setIsCorrectState,get};
}
